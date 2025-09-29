import type {APIRoute} from "astro";
import {listenToKnobData} from "../../lib/events.ts";

import {currentRunId} from "../../lib/state.ts";

export const GET: APIRoute = () => {
  const encoder = new TextEncoder()

  let clearListener = () => {}
  const customReadable = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode(`event: recording\ndata: ${currentRunId.peek() ? "Recording" : "Not Recording"}\n\n`))
      console.log("Client connected to knob data stream")
      clearListener = listenToKnobData((data) => {
        // controller.enqueue(encoder.encode(`event: motor-rotation\ndata: <div sse-swap="motor-rotation" hx-swap="outerHTML"></div><div>${(data.motorAngle ?? 0) % 2*Math.PI}</div>\n\n`))
      })
    },
    cancel() {
      console.log("Client disconnected from knob data stream")
      clearListener()
    }
  })

  return new Response(customReadable, {
    headers: {
      Connection: 'keep-alive',
      'Content-Encoding': 'none',
      'Cache-Control': 'no-cache, no-transform',
      'Content-Type': 'text/event-stream; charset=utf-8',
    },
  })
}