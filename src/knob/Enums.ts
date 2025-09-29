export const SenderCommand = {
  ON_OFF: 0x01,
  SENDER_FORMAT: 0x02,
  SET_TARGET: 0x03,
  MOTOR_CONFIGURATION: 0x04,
  MOTOR_ACTION: 0x05,
  REQUEST_DATA: 0x06,
};

export const OnOffCommand = {
  OFF: 0x00,
  ON: 0x01,
};

export const SenderFormat = {
  INFORMATION: 0x00,
  MOTOR_ANGLE: 0x01,
  MOTOR_ANGLE_DELTA: 0x02,
  MOTOR_SNAP_POINT: 0x03,
  BUTTON_STATE: 0x04,
  BUTTON_STATE_DELTA: 0x05,
  TOUCH_COUNT: 0x06,
  TOUCH_COUNT_DELTA: 0x07,
  TOUCH_PRESSURE: 0x08,
  TOUCH_COUNT_AND_TOUCHES: 0x09,
};

export const TouchFormat = {
  POSITION_PRESSURE_CHANNELS: 0x01,
  POSITION_PRESSURE: 0x02,
  RELATIVE_POSITION_PRESSURE_CHANNELS: 0x03,
};

export const MotorAction = {
  HAPTIC_FEEDBACK: 0x01,
  HIT_TARGET: 0x02,
};

export const MotorConfiguration = {
  HIT_TARGET: 0x01,
  SNAPS_OPEN: 0x02,
  SNAPS_WITH_BORDER: 0x03,
};

export const RequestData = {
  ON_OFF: 0x01,
  SEND_FORMAT: 0x02,
  TARGET: 0x03,
  MOTOR_CONFIGURATION: 0x04,
};

export const TouchCount = {
  ALL: 0x01,
  ZERO: 0x02,
  ONE: 0x03,
  TWO: 0x04,
  THREE: 0x05,
  FOUR: 0x06,
  FIVE: 0x07,
  GREATER_THAN_FIVE: 0x08,
};

export const ButtonStateDelta = {
  0: "NONE",
  1: "PRESSED",
  2: "RELEASED",
};
