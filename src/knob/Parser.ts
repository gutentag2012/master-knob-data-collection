import { SenderFormat, TouchFormat } from "./Enums";

export type MultiKnobData = {
  motorAngle: number | null;
  motorAngleDelta: number | null;
  motorSnapPoint: number | null;
  buttonPressed: boolean | null;
  buttonStateDelta: number | null;
  touchCount: number | null;
  touchCountDelta: number | null;
  touchPressure: number | null;
  touches: Array<{
    position?: number;
    relativePosition?: number;
    pressure?: number;
    channel?: number;
  }>;
}

export function toFloat(buffer: Uint8Array, offset: number) {
  const dataView = new DataView(buffer.buffer, buffer.byteOffset);
  return dataView.getFloat32(offset, true); // true for little-endian
}

export function toInt(buffer: Uint8Array, offset: number) {
  const dataView = new DataView(buffer.buffer, buffer.byteOffset);
  return dataView.getInt32(offset, true); // true for little-endian
}

export function toUInt16(buffer: Uint8Array, offset: number) {
  const dataView = new DataView(buffer.buffer, buffer.byteOffset);
  return dataView.getUint16(offset, true);
}

export function parseMultiKnobMessage(payload: Uint8Array) {
  // Checksum validation is done in the main loop before this function is called.
  let offset = 0;

  let multiKnobData: MultiKnobData = {
    motorAngle: null,
    motorAngleDelta: null,
    motorSnapPoint: null,
    buttonPressed: null,
    buttonStateDelta: null,
    touchCount: null,
    touchCountDelta: null,
    touchPressure: null,
    touches: [],
  };

  while (offset < payload.length) {
    const formatByte = payload[offset++];

    switch (formatByte) {
      case SenderFormat.INFORMATION:
        // No data to parse for this format
        break;
      case SenderFormat.MOTOR_ANGLE:
        multiKnobData.motorAngle = toFloat(payload, offset);
        offset += 4;
        break;
      case SenderFormat.MOTOR_ANGLE_DELTA:
        multiKnobData.motorAngleDelta = toFloat(payload, offset);
        offset += 4;
        break;
      case SenderFormat.MOTOR_SNAP_POINT:
        multiKnobData.motorSnapPoint = toInt(payload, offset);
        offset += 4;
        break;
      case SenderFormat.BUTTON_STATE:
        multiKnobData.buttonPressed = payload[offset++] !== 0;
        break;
      case SenderFormat.BUTTON_STATE_DELTA:
        multiKnobData.buttonStateDelta = payload[offset++];
        break;
      case SenderFormat.TOUCH_COUNT:
        multiKnobData.touchCount = payload[offset++];
        break;
      case SenderFormat.TOUCH_COUNT_DELTA:
        multiKnobData.touchCountDelta = payload[offset++];
        break;
      case SenderFormat.TOUCH_PRESSURE:
        multiKnobData.touchPressure = toInt(payload, offset);
        offset += 4;
        break;
      case SenderFormat.TOUCH_COUNT_AND_TOUCHES:
        const touchCount = payload[offset++];
        multiKnobData.touchCount = touchCount;
        const touchFormat = payload[offset++];

        for (let i = 0; i < touchCount; i++) {
          let touch = {} as MultiKnobData["touches"][number];
          switch (touchFormat) {
            case TouchFormat.POSITION_PRESSURE_CHANNELS:
              touch.position = toFloat(payload, offset);
              offset += 4;
              touch.pressure = toInt(payload, offset);
              offset += 4;
              touch.channel = payload[offset++];
              break;
            case TouchFormat.POSITION_PRESSURE:
              touch.position = toFloat(payload, offset);
              offset += 4;
              touch.pressure = toInt(payload, offset);
              offset += 4;
              break;
            case TouchFormat.RELATIVE_POSITION_PRESSURE_CHANNELS:
              touch.relativePosition = toFloat(payload, offset);
              offset += 4;
              touch.pressure = toInt(payload, offset);
              offset += 4;
              touch.channel = payload[offset++];
              break;
            default:
              console.warn(
                `Unknown touch format: 0x${touchFormat.toString(16)}`
              );
              break;
          }
          multiKnobData.touches.push(touch);
        }

        if (multiKnobData.touchPressure === null) {
          multiKnobData.touchPressure = multiKnobData.touches.reduce(
            (sum, t) => sum + (t.pressure || 0),
            0
          );
        }
        break;
      default:
        throw new Error(
          `Unknown format byte encountered: 0x${formatByte.toString(16)}`
        );
    }
  }

  return multiKnobData;
}