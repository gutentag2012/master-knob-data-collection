import type {APIRoute} from "astro";
import {
  activeSessionId,
  connectedParticipant,
  selectedParentTask,
  selectedChildTask,
  markingsForCurrentTask, currentSessionRecordingTaskId, requiredRecordingsForCurrentTask
} from "../../../../lib/state.ts";
import {effect} from "@preact/signals-core";
import {getRecorderCountdown, getTutorialPage} from "../../../../lib/componentStrings.tsx";
import {and, db, eq, or, recordingTask} from "astro:db";

let graceTimeoutParticipant = null as string | null
let graceTimeout: ReturnType<typeof setTimeout> | null = null;

export const GET: APIRoute = ({request}) => {
  const id = request.url.split("/").pop()
  if(!id) return new Response("Missing participant ID", {status: 400})

  const effectsToCancel = new Set<() => void>()
  const encoder = new TextEncoder()

  console.log(`Participant ${id} connecting...`)
  const stream = new ReadableStream({
    start(controller) {
      console.log(`Participant ${id} connected`)
      connectedParticipant.value = id || null

      if(graceTimeout && graceTimeoutParticipant === id) {
        console.log(`Participant ${id} reconnected within grace period`)
        clearTimeout(graceTimeout)
      }

      effectsToCancel.add(effect(() => {
        const activeSession = activeSessionId.value
        if(!activeSession) return;
        controller.enqueue(encoder.encode(`event: session-started\ndata: <p hx-get="/api/reload-participant-session" hx-trigger="load" class="text-2xl font-semibold">Leite weiter...</p>\n\n`))
      }))
      effectsToCancel.add(effect(() => {
        const markers = markingsForCurrentTask.value
        const amountOfRecordings = requiredRecordingsForCurrentTask.value
        const activeChildTask = selectedChildTask.value
        if(!activeChildTask) return;
        controller.enqueue(encoder.encode(`event: recording-markers\ndata: ${getRecorderCountdown({markers, amountOfRecordings})}\n\n`))
      }))
      effectsToCancel.add(effect(() => {
        const activeTask = selectedParentTask.value
        const activeChildTask = selectedChildTask.value
        if(!activeTask) return;
        db.select().from(recordingTask).where(or(eq(recordingTask.id, activeTask), and(eq(recordingTask.id, activeChildTask as never), eq(recordingTask.parent_id, activeTask)))).then(tasks => {
          const parentTask = tasks.find(t => t.id === activeTask)
          const childTask = tasks.find(t => t.id === activeChildTask)
          controller.enqueue(encoder.encode(`event: task-selected\ndata: ${getTutorialPage({parentTask, childTask})}\n\n`))
        })
      }))
    },
    cancel() {
      console.log(`Participant ${id} disconnected`)

      // This is so that redirects don't trigger a disconnect followed by an immediate reconnect
      graceTimeoutParticipant = id || null
      graceTimeout = setTimeout(() => {
        console.log(`Participant ${id} disconnected for real`)
        connectedParticipant.value = null
        graceTimeoutParticipant = null
        graceTimeout = null
      }, 3000)

      effectsToCancel.forEach(cancel => cancel())
      effectsToCancel.clear()
    }
  })

  return new Response(stream, {
    headers: {
      Connection: 'keep-alive',
      'Content-Encoding': 'none',
      'Cache-Control': 'no-cache, no-transform',
      'Content-Type': 'text/event-stream; charset=utf-8',
    },
  })
}