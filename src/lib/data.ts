import {and, asc, db, eq, ne, recordingTask, session, sessionTask, sessionTaskMarker} from "astro:db";

export async function getRecordingTasksForSession(id?: string | null) {
  if(!id) return {session: null, experiments: []};
  const sessionData = await db.select().from(session).where(eq(session.id, id)).limit(1).get();
  const recordingTasks = await db.select().from(recordingTask).orderBy(asc(recordingTask.parent_id));

  const markings = await db
    .select()
    .from(sessionTaskMarker)
    .leftJoin(sessionTask, eq(sessionTask.id, sessionTaskMarker.session_task_id))
    .where(and(eq(sessionTask.session_id, id), eq(sessionTaskMarker.marker, "end")));

// Group all tasks by their parent task
  const parentTaskMap: Record<string, any[]> = {};
  for (const task of recordingTasks) {
    if (!task.parent_id) continue;
    if (!parentTaskMap[task.parent_id]) {
      parentTaskMap[task.parent_id] = [];
    }
    parentTaskMap[task.parent_id].push(task);
  }

  const experiments = recordingTasks
    .map((value, i) => ({value, sort: id.charCodeAt(i)}))
    .sort((a, b) => {
      // If the recordingTask title is "Szenarien", they should be ordered last
      if (a.value.title === "Szenarien") return 1;
      if (b.value.title === "Szenarien") return -1;
      return a.sort - b.sort
    })
    .map(({value}) => {
      const idsToCheck = value.parent_id ? [value.id] : (parentTaskMap[value.id]?.map(t => t.id) || [value.id]);
      const endMarkingsForThisTask = markings.filter(m => idsToCheck.includes(m.sessionTask?.recording_task_id || ""));
      return {
        ...value,
        progress: Math.min(1, endMarkingsForThisTask.length / value.required_repetitions),
      }
    });

  return {session: sessionData, experiments};
}