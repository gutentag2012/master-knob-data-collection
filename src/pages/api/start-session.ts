import type {APIRoute} from "astro";
import {createParticipant, startSession} from "../../lib/actions.ts";
import {activeSessionId, connectedParticipant} from "../../lib/state.ts";

export const POST: APIRoute = async () => {
  const sessionId = crypto.randomUUID()

  const participantId = connectedParticipant.value
  if(!participantId) {
    return new Response("No participant connected", { status: 400 })
  }

  await startSession(sessionId, participantId)
  activeSessionId.value = sessionId

  const newUrl = "/operator/session/" + sessionId
  return new Response(null, {
    status: 200,
    headers: {
      'HX-Redirect': newUrl,
    }
  })
}
