import {column, defineDb, defineTable, NOW, sql} from 'astro:db';
import {GESTURE_NAME_LIST} from "../src/lib/constants.ts";

const recordingTask = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    parent_id: column.number({references: (): any => recordingTask.columns.id, optional: true}),
    explanation_video_path: column.text({optional: true}),
    title: column.text(),
    description: column.text(),
    gesture: column.text({enum: GESTURE_NAME_LIST as [string, ...string[]], optional: true}),
    required_repetitions: column.number(),
    createdAt: column.date({default: NOW}),
  }
})

const participant = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    age: column.number(),
    gender: column.text(),
    dominant_hand: column.text({enum: ["left", "right", "ambidextrous"]}),
    hand_span_cm: column.number(),
    hand_width_cm: column.number(),
    hand_length_cm: column.number(),
    experience_with_touchscreens: column.text({enum: ["none", "little", "some", "much"]}),
    experience_with_knobs: column.text({enum: ["none", "little", "some", "much"]}),
    experience_with_gestures: column.text({enum: ["none", "little", "some", "much"]}),
    experience_with_other_input_devices: column.text({enum: ["none", "little", "some", "much"]}),
    regular_use_of_input_devices: column.text({enum: ["none", "little", "some", "much"]}),
    remarks: column.text({optional: true}),
    createdAt: column.date({default: NOW}),
  }
})

const session = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    participant_id: column.text({references: () => participant.columns.id}),
    startTime: column.date({default: NOW}),
    endTime: column.date({optional: true}),
    remarks: column.text({optional: true}),
  }
})

const sessionTask = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    session_id: column.text({references: () => session.columns.id}),
    recording_task_id: column.number({references: () => recordingTask.columns.id}),
    startTime: column.date({default: NOW}),
    endTime: column.date({optional: true}),
    recording_path: column.text({optional: true}),
    remarks: column.text({optional: true}),
    repetitions_completed: column.number({default: 0}),
  }
})

const sensorData = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    session_task_id: column.text({references: () => sessionTask.columns.id}),
    timestamp: column.date({default: NOW}),
    motor_angle: column.number({optional: true}),
    motor_angle_delta: column.number({optional: true}),
    motor_snap_point: column.number({optional: true}),
    button_pressed: column.boolean({optional: true}),
    button_state_delta: column.number({optional: true}),
    touch_count: column.number({optional: true}),
    touch_count_delta: column.number({optional: true}),
    touch_pressure: column.number({optional: true}),
    touch_1_position: column.number({optional: true}),
    touch_1_relative_position: column.number({optional: true}),
    touch_1_pressure: column.number({optional: true}),
    touch_1_channel: column.number({optional: true}),
    touch_2_position: column.number({optional: true}),
    touch_2_relative_position: column.number({optional: true}),
    touch_2_pressure: column.number({optional: true}),
    touch_2_channel: column.number({optional: true}),
    touch_3_position: column.number({optional: true}),
    touch_3_relative_position: column.number({optional: true}),
    touch_3_pressure: column.number({optional: true}),
    touch_3_channel: column.number({optional: true}),
    touch_4_position: column.number({optional: true}),
    touch_4_relative_position: column.number({optional: true}),
    touch_4_pressure: column.number({optional: true}),
    touch_4_channel: column.number({optional: true}),
    touch_5_position: column.number({optional: true}),
    touch_5_relative_position: column.number({optional: true}),
    touch_5_pressure: column.number({optional: true}),
    touch_5_channel: column.number({optional: true}),
    other_touches: column.text({optional: true}), // JSON string of other touches
  }
})

const sessionTaskMarker = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    session_task_id: column.text({references: () => sessionTask.columns.id}),
    timestamp: column.date({default: NOW}),
    marker: column.text(),
  }
})

export default defineDb({
  tables: {
    recordingTask,
    participant,
    session,
    sessionTask,
    sensorData,
    sessionTaskMarker,
  },
});
