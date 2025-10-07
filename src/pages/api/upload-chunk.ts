import fs from "fs";
import path from "path";
import type {APIRoute} from "astro";
import {
  connectedParticipant,
  currentSessionRecordingTaskId,
  selectedChildTask,
  selectedParentTask
} from "../../lib/state.ts";
import {db, eq, recordingTask, session, sessionTask} from "astro:db";
import {stopRecordingTask} from "../../lib/actions.ts";

export const POST: APIRoute = async ({ request })  => {
  const formData = await request.formData();
  const file = formData.get("videoChunk") as File | null;

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const currentRecording = currentSessionRecordingTaskId.peek()
  let participantId = connectedParticipant.peek()
  const parentTask = selectedParentTask.peek()
  const childTask = selectedChildTask.peek()

  if(!participantId) {
    if(!currentRecording) {
      return new Response("No participant connected and no active recording task", { status: 400 });
    }
    const currentRecordingTask = await db.select().from(sessionTask).leftJoin(session, eq(sessionTask.session_id, session.id)).where(eq(sessionTask.id, currentRecording)).limit(1).get()
    participantId = currentRecordingTask?.session?.participant_id || null
  }

  if(!participantId) {
    return new Response("No participant connected", { status: 400 });
  }

  console.log("Received file:", file.name, file.size, "bytes");
  console.log("Current recording task ID:", currentRecording);
  console.log("Participant ID:", participantId);
  console.log("Parent Task ID:", parentTask);
  console.log("Child Task ID:", childTask);

  const taskToSearch = childTask ?? parentTask
  const task = await db.select().from(recordingTask).where(eq(recordingTask.id, taskToSearch!)).limit(1).get()

  const titleNamePart = task ? task.title.replace(/\s+/g, '_').toLowerCase() : 'unknown_task'

  const fileName = file.name.replace(/\s+/g, '_').toLowerCase()
  console.log("Saving file as:", fileName)

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = `./public/participants/${participantId}/${titleNamePart}/${fileName}`
  const savePath = path.resolve(filePath);

  try {
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    fs.writeFileSync(savePath, buffer);
  } catch (error) {
    console.error("Error saving file:", error);
  }

  if(!currentRecording) {
    return new Response("No active recording task", { status: 400 });
  }

  return new Response(JSON.stringify({ success: true, path: "/uploads/recording.webm" }), {
    status: 200,
  });
}
