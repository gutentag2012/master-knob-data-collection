import {signal} from "@preact/signals-core";
import {db, eq, experimentRuns, experiments} from "astro:db";

export const currentExperimentId = signal<number|null>(null)
export const selectedGesture = signal<string|null>(null)
export const currentRunId = signal<number | null>(null)

export async function createExperiment() {
  const res = await db.insert(experiments).values({
    participantId: crypto.randomUUID(),
    remark: ""
  })
  currentExperimentId.value = res.lastInsertRowid ? Number(res.lastInsertRowid) : null
}

export async function endExperiment() {
  const id = currentExperimentId.value;
  if(!id) return;
  const endTime = new Date();
  await db.update(experiments).set({
    endTime
  }).where(eq(experiments.id, id))
  currentExperimentId.value = null
}

export async function updateRemark(remark: string) {
  const id = currentExperimentId.value;
  if(!id) return;
  await db.update(experiments).set({
    remark
  }).where(eq(experiments.id, id))
}

export async function createExperimentRun() {
  if(!currentExperimentId.value || !selectedGesture.value) return null;
  const res = await db.insert(experimentRuns).values({
    experimentId: currentExperimentId.value,
    gesture: selectedGesture.value,
  })
  currentRunId.value = res.lastInsertRowid ? String(res.lastInsertRowid) : null
}

export async function endExperimentRun() {
  const id = currentRunId.value;
  if(!id) return;
  const endTime = new Date();
  await db.update(experimentRuns).set({
    endTime
  }).where(eq(experimentRuns.id, Number(id)))
  currentRunId.value = null
}