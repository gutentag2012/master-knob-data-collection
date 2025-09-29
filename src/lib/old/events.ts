import EventEmitter from "node:events";
import type {MultiKnobData} from "../../knob/Parser.ts";

const emitter = new EventEmitter.EventEmitter()

export function listenToKnobData(callback: (data: MultiKnobData) => void) {
  emitter.on("knob-data", callback)
  return () => {
    emitter.off("knob-data", callback)
  }
}

export function emitKnobData(data: MultiKnobData) {
  emitter.emit("knob-data", data)
}