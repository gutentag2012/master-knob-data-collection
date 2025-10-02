import {effect, signal} from "@preact/signals-core";
import {SerialPort} from "serialport";
import {Cobs} from "./Cobs.ts";
import {commandWithCrc16Checksum, crc16} from "./Crc16.ts";
import {type MultiKnobData, parseMultiKnobMessage, toUInt16} from "./Parser.ts";
import {SenderProtocol} from "./SenderProtocol.ts";
import {MotorConfiguration, SenderFormat, TouchCount, TouchFormat} from "./Enums.ts";
import {db, sensorData} from "astro:db";
import {currentSessionRecordingTaskId, selectedPort} from "../lib/state.ts";

console.log("Listening for port changes...");
let initialized = false;

const setup = () => {
  if (initialized) return;
  initialized = true;
  let port: SerialPort | null = null;
  effect(() => {
    const portPath = selectedPort.value
    console.log("Selected port changed:", portPath);
    if (!portPath) {
      if (port && port.isOpen) {
        port.close();
        port = null;
        console.log("Closed port!");
      }
      return;
    }
    port = new SerialPort({
      path: portPath,
      baudRate: 115200, // adjust to your device
    });
    const writePacket = (data: Uint8Array) => {
      if(!port || !port.isOpen) {
        console.warn("Port not open, cannot write data");
        return;
      }
      const packet = commandWithCrc16Checksum(data)
      const encodedPacket = Cobs.encode(packet)
      port.write(encodedPacket)
    }

    console.log(`Opened port: ${portPath}`);

    // Setup button
    port.on("open", () => {
      if(!port) return;
      console.log("Port opened, configuring device...");
      // Turn on the device
      writePacket(SenderProtocol.getMotorConfigurationCommand(TouchCount.ALL, 50, MotorConfiguration.SNAPS_OPEN, 24))
      writePacket(SenderProtocol.getSenderFormatCommand(Object.values(SenderFormat), TouchFormat.RELATIVE_POSITION_PRESSURE_CHANNELS))
      writePacket(SenderProtocol.getOnOffCommand(true))
    })

    let rxBuffer: number[] = [];

    let lastData = null as MultiKnobData | null;
    port.on("data", async (data) => {
      for (const byte of data) {
        if (byte !== 0x00) {
          rxBuffer.push(byte);
          continue;
        }
        const decoded = Cobs.decode(Uint8Array.from(rxBuffer));
        rxBuffer = [];
        if (decoded.length < 2) {
          console.log("Invalid length. Dropping message.");
          continue;
        }

        const payload = decoded.slice(0, -2);
        const crcFromMsg = toUInt16(decoded, decoded.length - 2);
        const calcCrc = crc16(payload);
        if (crcFromMsg !== calcCrc) {
          console.log(
            `CRC mismatch! Calculated: 0x${calcCrc.toString(
              16
            )}, Received: 0x${crcFromMsg.toString(16)}. Dropping message.`
          );
          continue;
        }

        try {
          const parsedData = parseMultiKnobMessage(payload);

          // Update deltas
          if (lastData) {
            parsedData.buttonStateDelta = parsedData.buttonPressed === lastData.buttonPressed ? 0 : (parsedData.buttonPressed ? 1 : -1);
            if (parsedData.motorAngle !== null && lastData.motorAngle !== null) {
              parsedData.motorAngleDelta = parsedData.motorAngle - lastData.motorAngle;
            }
            if (parsedData.touchCount !== null && lastData.touchCount !== null) {
              parsedData.touchCountDelta = parsedData.touchCount - lastData.touchCount;
            }
          }
          lastData = {...parsedData};

          const id = crypto.randomUUID();
          const runId = currentSessionRecordingTaskId.peek();
          if (runId) {
            await db.insert(sensorData).values({
              id,
              session_task_id: runId,
              motor_angle: parsedData.motorAngle,
              motor_angle_delta: parsedData.motorAngleDelta,
              motor_snap_point: parsedData.motorSnapPoint,
              button_pressed: parsedData.buttonPressed,
              button_state_delta: parsedData.buttonStateDelta,
              touch_count: parsedData.touchCount,
              touch_count_delta: parsedData.touchCountDelta,
              touch_pressure: parsedData.touchPressure,
              touch_1_position: parsedData.touches[0]?.position ?? null,
              touch_1_relative_position: parsedData.touches[0]?.relativePosition ?? null,
              touch_1_pressure: parsedData.touches[0]?.pressure ?? null,
              touch_1_channel: parsedData.touches[0]?.channel ?? null,
              touch_2_position: parsedData.touches[1]?.position ?? null,
              touch_2_relative_position: parsedData.touches[1]?.relativePosition ?? null,
              touch_2_pressure: parsedData.touches[1]?.pressure ?? null,
              touch_2_channel: parsedData.touches[1]?.channel ?? null,
              touch_3_position: parsedData.touches[2]?.position ?? null,
              touch_3_relative_position: parsedData.touches[2]?.relativePosition ?? null,
              touch_3_pressure: parsedData.touches[2]?.pressure ?? null,
              touch_3_channel: parsedData.touches[2]?.channel ?? null,
              touch_4_position: parsedData.touches[3]?.position ?? null,
              touch_4_relative_position: parsedData.touches[3]?.relativePosition ?? null,
              touch_4_pressure: parsedData.touches[3]?.pressure ?? null,
              touch_4_channel: parsedData.touches[3]?.channel ?? null,
              touch_5_position: parsedData.touches[4]?.position ?? null,
              touch_5_relative_position: parsedData.touches[4]?.relativePosition ?? null,
              touch_5_pressure: parsedData.touches[4]?.pressure ?? null,
              touch_5_channel: parsedData.touches[4]?.channel ?? null,
              other_touches: parsedData.touches.length <= 5 ? null : JSON.stringify(parsedData.touches.slice(5)),
            }).catch(e => {
              const debugData = {
                runId,
                id,
                parsedData,
                lastData,
              }
              console.error("Failed to insert sensor data:", debugData, e);
            })
          }
        } catch (e: any) {
          console.error("Parsing error:", e.message);
        }
      }
      return () => {
        initialized = false;
        if (port) {
          port.close();
          port = null;
          console.log("Closed port");
        }
      }
    });
  })
}
setup()