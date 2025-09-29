import {
  SenderCommand,
  OnOffCommand,
  SenderFormat,
  MotorConfiguration,
} from "./Enums";

function floatToBytes(num: number) {
  const buf = Buffer.alloc(4);
  buf.writeFloatLE(num, 0);
  return Uint8Array.from(buf);
}

function intToBytes(num: number) {
  const buf = Buffer.alloc(4);
  buf.writeInt32LE(num, 0);
  return Uint8Array.from(buf);
}

export class SenderProtocol {
  static addLengthAsPrefix(data: Uint8Array) {
    return Uint8Array.from([data.length, ...data]);
  }

  static getOnOffCommand(on: boolean) {
    return this.addLengthAsPrefix(
      Uint8Array.from([
        SenderCommand.ON_OFF,
        on ? OnOffCommand.ON : OnOffCommand.OFF,
      ])
    );
  }

  static getSenderFormatCommand(senderFormats: Array<typeof SenderFormat[keyof typeof SenderFormat]>, touchFormat = null as number | null) {
    let bytes = [SenderCommand.SENDER_FORMAT];
    senderFormats.forEach((fmt) => {
      if (
        fmt === SenderFormat.TOUCH_COUNT_AND_TOUCHES &&
        touchFormat !== null
      ) {
        bytes.push(fmt, touchFormat);
      } else {
        bytes.push(fmt);
      }
    });
    return this.addLengthAsPrefix(Uint8Array.from(bytes));
  }

  static getSetTargetCommand(target: number) {
    return this.addLengthAsPrefix(
      Uint8Array.from([SenderCommand.SET_TARGET, ...floatToBytes(target)])
    );
  }

  static getMotorConfigurationCommand(
    touchCount: number,
    strength: number,
    configuration: typeof MotorConfiguration[keyof typeof MotorConfiguration],
    snaps = 0,
    startBorder = 0,
    endBorder = 0
  ) {
    let data = [
      SenderCommand.MOTOR_CONFIGURATION,
      touchCount,
      strength,
      configuration,
    ];
    if (configuration === MotorConfiguration.SNAPS_OPEN) {
      data.push(...intToBytes(snaps));
    } else if (configuration === MotorConfiguration.SNAPS_WITH_BORDER) {
      data.push(...intToBytes(snaps));
      data.push(...floatToBytes(startBorder));
      data.push(...floatToBytes(endBorder));
    }
    return this.addLengthAsPrefix(Uint8Array.from(data));
  }

  static getMotorActionsCommand(action: number) {
    return this.addLengthAsPrefix(
      Uint8Array.from([SenderCommand.MOTOR_ACTION, action])
    );
  }

  static getRequestDataCommand(type: number, count = null) {
    let data = [SenderCommand.REQUEST_DATA, type];
    if (count !== null) {
      data.push(count);
    }
    return this.addLengthAsPrefix(Uint8Array.from(data));
  }
}
