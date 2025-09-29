import type {APIRoute} from "astro";
import {createParticipant, startSession} from "../../lib/actions.ts";
import {activeSessionId, connectedParticipant} from "../../lib/state.ts";

export const GET: APIRoute = async () => {
  const newUrl = "/participant/session/" + activeSessionId.peek()
  return new Response(null, {
    status: 200,
    headers: {
      'HX-Redirect': newUrl,
    }
  })
}
