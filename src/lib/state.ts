import {computed, effect, signal} from "@preact/signals-core";
import {db, eq, recordingTask, session, sessionTask, sessionTaskMarker} from "astro:db";
import {markRecordingTask} from "./actions.ts";

export const connectedParticipant = signal<string | null>(null)
export const selectedPort = signal<string | null>(null)

export const activeSessionId = signal<string | null>(null)

export const selectedParentTask = signal<number | null>(null)
export const selectedChildTask = signal<number | null>(null)

export const currentSessionRecordingTaskId = signal<string | null>(null)
export const markingsForCurrentTask = signal<string[]>([])
export const requiredRecordingsForCurrentTask = signal(0)

effect(() => {
  const parentTaskId = selectedParentTask.value
  const childTaskId = selectedChildTask.value
  const taskId = childTaskId ?? parentTaskId
  if(!taskId) {
    requiredRecordingsForCurrentTask.value = 0
    return
  }
  db.select().from(recordingTask).where(eq(recordingTask.id, taskId)).limit(1).get().then(task => {
    requiredRecordingsForCurrentTask.value = task?.required_repetitions ?? 0
  })
})

effect(() => {
  const parentTaskId = selectedParentTask.value
  const childTaskId = selectedChildTask.value
  const taskId = childTaskId ?? parentTaskId
  if(!taskId) {
    markingsForCurrentTask.value = []
    return
  }
  console.log("Fetching markers for task:", taskId)
  db.select().from(sessionTask).leftJoin(sessionTaskMarker, eq(sessionTaskMarker.session_task_id, sessionTask.id)).where(eq(sessionTask.session_id, activeSessionId.peek()!)).then(markers => {
    console.log("Found markers for task:", markers)
    markingsForCurrentTask.value = [...markers].map(m => m.sessionTaskMarker?.marker).filter(Boolean) as string[]
  })
})

export const canStartSession = computed(() => {
  const hasParticipant = !!connectedParticipant.value
  const hasPort = !!selectedPort.value
  return hasParticipant && hasPort
})