import fs from "fs";
import path from "path";
import type {APIRoute} from "astro";
import {
  connectedParticipant,
  currentSessionRecordingTaskId,
  selectedChildTask,
  selectedParentTask
} from "../../lib/state.ts";
import {db, eq, recordingTask} from "astro:db";
import {stopRecordingTask} from "../../lib/actions.ts";

export const POST: APIRoute = async ({ request })  => {
  const recording = currentSessionRecordingTaskId.value
  if(!recording) {
    return new Response("No active recording task", { status: 400 });
  }

  await stopRecordingTask(recording, "FORCE-STOP");
  currentSessionRecordingTaskId.value = null;

  return new Response(JSON.stringify({ success: true, path: "/uploads/recording.webm" }), {
    status: 200,
  });
}
