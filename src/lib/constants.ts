export const GESTURE_HIERARCHY = {
  SINGLE_TAP: {
    "4_FINGERS": "single-tap-4-fingers",
    "3_FINGERS_AIR": "single-tap-3-fingers-air",
  },
  DOUBLE_TAP: {
    "4_FINGERS": "double-tap-4-fingers",
    "3_FINGERS_AIR": "double-tap-3-fingers-air",
  },
  TWO_FINGER_TAP: {
    "4_FINGERS": "two-finger-tap-4-fingers",
    "3_FINGERS": "two-finger-tap-3-fingers",
  },
  TWO_FINGER_DOUBLE_TAP: {
    "4_FINGERS": "two-finger-double-tap-4-fingers",
    "3_FINGERS": "two-finger-double-tap-3-fingers",
  },
  TWO_FINGER_OPPOSITE_TAP: {
    "4_FINGERS": "two-finger-opposite-tap-4-fingers",
    "ALL_AIR": "two-finger-opposite-tap-all-air",
  },
  TWO_FINGER_OPPOSITE_DOUBLE_TAP: {
    "4_FINGERS": "two-finger-opposite-double-tap-4-fingers",
    "ALL_AIR": "two-finger-opposite-double-tap-all-air",
  },
  TAP_AND_HOLD: {
    "2_FINGERS": "tap-and-hold-2-fingers",
    "3_FINGERS": "tap-and-hold-3-fingers",
  },
  SINGLE_SWIPE: {
    "3_FINGERS": "single-swipe-3-fingers",
    "ALL_AIR": "single-swipe-all-air",
  },
  PINCH_SWIPE: {
    "RECHTS": "pinch-swipe-rechts",
    "LINKS": "pinch-swipe-links",
  },
  SPREAD_SWIPE: {
    "RECHTS": "spread-swipe-rechts",
    "LINKS": "spread-swipe-links",
  },
  NO_GESTURE: {
    "KNOB_TURN_3_FINGERS": "knob-turn-3-fingers",
    "KNOB_TURN_ALL_FINGERS": "knob-turn-all-fingers",
    "KNOB_PRESS_NO_FINGERS": "knob-press-no-fingers",
    "KNOB_PRESS_4_FINGERS": "knob-press-4-fingers",
    "LAY_ON_2_FINGERS": "lay-on-2-fingers",
    "LAY_ON_3_FINGERS": "lay-on-3-fingers",
    "LAY_OFF_ALL_FINGERS": "lay-off-all-fingers",
    "LAY_OFF_4_FINGERS": "lay-off-4-fingers",
  }
} as const

export const GESTURE_NAME_LIST = Object.values(GESTURE_HIERARCHY).flatMap((group) => Object.values(group))