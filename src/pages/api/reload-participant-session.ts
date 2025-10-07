import type {APIRoute} from "astro";
import {activeSessionId} from "../../lib/state.ts";

export const GET: APIRoute = async () => {
  const newUrl = "/participant/session/" + activeSessionId.peek()
  return new Response(null, {
    status: 200,
    headers: {
      'HX-Redirect': newUrl,
    }
  })
}
