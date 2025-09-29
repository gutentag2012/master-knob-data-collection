import type {APIRoute} from "astro";
import {createParticipant} from "../../lib/actions.ts";

export const POST: APIRoute = async ({request}) => {
  const body = await request.formData();

  const participantId = await createParticipant({
    age: body.get("age") ? Number(body.get("age")) : -1,
    gender: body.get("gender")?.toString() || "none",
    dominant_hand: (body.get("dominant_hand")?.toString() || "none") as "right",
    hand_span_cm: body.get("hand_span_cm") ? Number(body.get("hand_span_cm")) : -1,
    hand_width_cm: body.get("hand_width_cm") ? Number(body.get("hand_width_cm")) : -1,
    hand_length_cm: body.get("hand_length_cm") ? Number(body.get("hand_length_cm")) : -1,
    experience_with_touchscreens: (body.get("experience_with_touchscreens") ? Number(body.get("experience_with_touchscreens")) : 0) as 0,
    experience_with_knobs: (body.get("experience_with_knobs") ? Number(body.get("experience_with_knobs")) : 0) as 0,
    experience_with_gestures: (body.get("experience_with_gestures") ? Number(body.get("experience_with_gestures")) : 0) as 0,
    experience_with_other_input_devices: (body.get("experience_with_other_input_devices") ? Number(body.get("experience_with_other_input_devices")) : 0) as 0,
    regular_use_of_input_devices: (body.get("regular_use_of_input_devices") ? Number(body.get("regular_use_of_input_devices")) : 0) as 0,
  })

  const newUrl = "/participant/" + participantId
  return new Response(null, {
    status: 200,
    headers: {
      'HX-Redirect': newUrl,
    }
  })
}
