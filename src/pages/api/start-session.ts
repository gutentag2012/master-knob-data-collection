import type {APIRoute} from "astro";
import {createParticipant, startSession} from "../../lib/actions.ts";
import {activeSessionId, connectedParticipant} from "../../lib/state.ts";

export const POST: APIRoute = async () => {
  const sessionId = crypto.randomUUID()

  await startSession(sessionId, connectedParticipant.value)
  activeSessionId.value = sessionId

  const newUrl = "/operator/session/" + sessionId
  return new Response(null, {
    status: 200,
    headers: {
      'HX-Redirect': newUrl,
    }
  })
}
