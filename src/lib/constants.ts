export const GESTURE_HIERARCHY = {
  SINGLE_TAP: {
    "4_FINGERS": "single-tap-4-fingers",
    "4_FINGERS_AIR": "single-tap-4-fingers-air",
    "3_FINGERS": "single-tap-3-fingers",
  },
  DOUBLE_TAP: {
    "4_FINGERS": "double-tap-4-fingers",
    "4_FINGERS_AIR": "double-tap-4-fingers-air",
    "3_FINGERS": "double-tap-3-fingers",
    "3_FINGERS_END_GROUND": "double-tap-3-fingers-end-ground",
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
    "4_FINGERS_END_GROUND": "two-finger-opposite-double-tap-4-fingers-end-ground",
    "ALL_AIR": "two-finger-opposite-double-tap-all-air",
  },
  TAP_AND_HOLD: {
    "2_FINGERS": "tap-and-hold-2-fingers",
    "3_FINGERS": "tap-and-hold-3-fingers",
    "4_FINGERS": "tap-and-hold-4-fingers",
  },
  SINGLE_SWIPE: {
    "3_FINGERS": "single-swipe-3-fingers",
    "4_FINGERS": "single-swipe-4-fingers",
  },
  PINCH_SWIPE: {
    "3_FINGERS": "pinch-swipe-3-fingers",
    "4_FINGERS": "pinch-swipe-4-fingers",
  },
  SPREAD_SWIPE: {
    "3_FINGERS": "spread-swipe-3-fingers",
    "4_FINGERS": "spread-swipe-4-fingers",
  },
} as const

export const GESTURE_NAME_LIST = Object.values(GESTURE_HIERARCHY).flatMap((group) => Object.values(group))