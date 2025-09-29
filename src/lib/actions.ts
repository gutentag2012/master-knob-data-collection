import {db, eq, participant, session, sessionTask, sessionTaskMarker, sql} from "astro:db";

export type CreateParticipantPayload = {
  age: number
  gender: string
  dominant_hand: "left" | "right" | "ambidextrous"
  hand_span_cm: number
  hand_width_cm: number
  hand_length_cm: number
  experience_with_touchscreens: 0 | 1 | 2 | 3
  experience_with_knobs: 0 | 1 | 2 | 3
  experience_with_gestures: 0 | 1 | 2 | 3
  experience_with_other_input_devices: 0 | 1 | 2 | 3
  regular_use_of_input_devices: 0 | 1 | 2 | 3
  remarks?: string
}

const AnswersMap = {
  0: "none",
  1: "little",
  2: "some",
  3: "much"
} as const

export async function createParticipant(payload: CreateParticipantPayload) {
  const id = crypto.randomUUID()
  await db.insert(participant).values({
    ...payload,
    experience_with_touchscreens: AnswersMap[payload.experience_with_touchscreens],
    experience_with_knobs: AnswersMap[payload.experience_with_knobs],
    experience_with_gestures: AnswersMap[payload.experience_with_gestures],
    experience_with_other_input_devices: AnswersMap[payload.experience_with_other_input_devices],
    regular_use_of_input_devices: AnswersMap[payload.regular_use_of_input_devices],
    id,
  })
  return id
}

export async function startSession(sessionId: string, participantId: string | null) {
  if(!participantId) throw new Error("No participant connected")

  console.log("Starting session", sessionId, "for participant", participantId)

  await db.insert(session).values({
    id: sessionId,
    participant_id: participantId,
  })

  return sessionId
}

export async function startRecordingTask(sessionId: string, taskId: number) {
  const id = crypto.randomUUID()
  await db.insert(sessionTask).values({
    id,
    session_id: sessionId,
    recording_task_id: taskId,
  })
  return id
}

export async function stopRecordingTask(sessionTaskId: string, uploadPath: string) {
  await db.update(sessionTask).set({
    endTime: new Date(),
    recording_path: uploadPath,
  }).where(eq(sessionTask.id, sessionTaskId))
}

export async function markRecordingTask(sessionTaskId: string, marker: "pre-start" | "start" | "end" | "marking") {
  const id = crypto.randomUUID()
  if(marker === "end") {
    await db.update(sessionTask).set({
      repetitions_completed: sql`${sessionTask.repetitions_completed} + 1`,
    }).where(eq(sessionTask.id, sessionTaskId))
  }
  await db.insert(sessionTaskMarker).values({
    id,
    session_task_id: sessionTaskId,
    marker,
  })
  return id
}