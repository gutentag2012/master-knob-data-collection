import type {APIRoute} from "astro";
import {effect} from "@preact/signals-core";
import {canStartSession, connectedParticipant, selectedPort} from "../../../lib/state.ts";

export const GET: APIRoute = () => {
  const effectsToCancel = new Set<() => void>()
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      console.log("Operator connected")
      effectsToCancel.add(effect(() => {
        const connectedParticipantId = connectedParticipant.value
        controller.enqueue(encoder.encode(`event: participant\ndata: ${connectedParticipantId || "No participant connected"}\n\n`))
      }))
      effectsToCancel.add(effect(() => {
        const selectedKnobPort = selectedPort.value
        controller.enqueue(encoder.encode(`event: selected-knob-port\ndata: ${selectedKnobPort}\n\n`))
      }))
      effectsToCancel.add(effect(() => {
        const canStart = canStartSession.value
        controller.enqueue(encoder.encode(`event: can-start-session\ndata: ${canStart}\n\n`))
      }))
    },
    cancel() {
      console.log("Operator disconnected")
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