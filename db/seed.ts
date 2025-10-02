import {db, recordingTask} from 'astro:db';

console.log(import.meta.env.ASTRO_DB_REMOTE_URL)

export default async function seed() {
  const singleTap = await db.insert(recordingTask).values({
    title: "Single Tap",
    description: "Einfacher Tipp auf die Seite des Knopfes. (Hier mit dem Zeigefinger)",
    required_repetitions: 6 * 3
  })
  await db.insert(recordingTask).values([
    {
      title: "Single Tap (4 Finger)",
      description: "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf.",
      parent_id: singleTap.lastInsertRowid ? Number(singleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "single-tap-4-fingers",
      explanation_video_path: "/videos/single_tap_(4_finger).webm"
    },
    {
      title: "Single Tap (4 Finger, Luft)",
      description: "Hier ruhen nur 3 Finger (Daumen, Mittel-, Ring-Finger) auf dem Knopf, der Zeigefinger startet in der Luft.",
      parent_id: singleTap.lastInsertRowid ? Number(singleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "single-tap-4-fingers-air",
      explanation_video_path: "/videos/single_tap_(4_finger,_luft).webm"
    },
    {
      title: "Single Tap (3 Finger)",
      description: "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf.",
      parent_id: singleTap.lastInsertRowid ? Number(singleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "single-tap-3-fingers",
      explanation_video_path: "/videos/single_tap_(3_finger).webm"
    }
  ])

  const doubleTap = await db.insert(recordingTask).values({
    title: "Double Tap",
    description: "Doppel-Tipp auf die Seite des Knopfes. (Hier mit dem Zeigefinger)",
    required_repetitions: 6 * 4
  })
  await db.insert(recordingTask).values([
    {
      title: "Double Tap (4 Finger)",
      description: "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf.",
      parent_id: doubleTap.lastInsertRowid ? Number(doubleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "double-tap-4-fingers",
      explanation_video_path: "/videos/double_tap_(4_finger).webm"
    },
    {
      title: "Double Tap (4 Finger, Luft)",
      description: "Hier ruhen nur 3 Finger (Daumen, Mittel-, Ring-Finger) auf dem Knopf, der Zeigefinger startet in der Luft.",
      parent_id: doubleTap.lastInsertRowid ? Number(doubleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "double-tap-4-fingers-air",
      explanation_video_path: "/videos/double_tap_(4_finger,_luft).webm"
    },
    {
      title: "Double Tap (3 Finger)",
      description: "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf.",
      parent_id: doubleTap.lastInsertRowid ? Number(doubleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "double-tap-3-fingers",
      explanation_video_path: "/videos/double_tap_(3_finger).webm"
    },
    {
      title: "Double Tap (3 Finger, Ende auf Knopf)",
      description: "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf. Nach dem zweiten Tippen bleibt der Zeigefinger auf dem Knopf liegen.",
      parent_id: doubleTap.lastInsertRowid ? Number(doubleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "double-tap-3-fingers-end-ground",
      explanation_video_path: "/videos/double_tap_(3_finger,_ende_auf_knopf).webm"
    }
  ])

  const twoFingerTap = await db.insert(recordingTask).values({
    title: "Two-Finger Tap",
    description: "Zwei-Finger-Tipp auf die Seite des Knopfes. (Hier mit Zeige- und Mittelfinger)",
    required_repetitions: 6 * 2
  })
  await db.insert(recordingTask).values([
    {
      title: "Two-Finger Tap (4 Finger)",
      description: "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf, Zeige- und Mittelfinger tippen.",
      parent_id: twoFingerTap.lastInsertRowid ? Number(twoFingerTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "two-finger-tap-4-fingers",
      explanation_video_path: "/videos/two-finger_tap_(4_finger).webm"
    },
    {
      title: "Two-Finger Tap (3 Finger)",
      description: "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf, Zeige- und Mittelfinger tippen.",
      parent_id: twoFingerTap.lastInsertRowid ? Number(twoFingerTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "two-finger-tap-3-fingers",
      explanation_video_path: "/videos/two-finger_tap_(3_finger).webm"
    }
  ])

  const twoFingerDoubleTap = await db.insert(recordingTask).values({
    title: "Two-Finger Double Tap",
    description: "Zwei-Finger-Doppel-Tipp auf die Seite des Knopfes. (Hier mit Zeige- und Mittelfinger)",
    required_repetitions: 6 * 2
  })
  await db.insert(recordingTask).values([
    {
      title: "Two-Finger Double Tap (4 Finger)",
      description: "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf, Zeige- und Mittelfinger tippen.",
      parent_id: twoFingerDoubleTap.lastInsertRowid ? Number(twoFingerDoubleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "two-finger-double-tap-4-fingers",
      explanation_video_path: "/videos/two-finger_double_tap_(4_finger).webm"
    },
    {
      title: "Two-Finger Double Tap (3 Finger)",
      description: "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf, Zeige- und Mittelfinger tippen.",
      parent_id: twoFingerDoubleTap.lastInsertRowid ? Number(twoFingerDoubleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "two-finger-double-tap-3-fingers",
      explanation_video_path: "/videos/two-finger_double_tap_(3_finger).webm"
    }
  ])

  const twoFingerOppositeTap = await db.insert(recordingTask).values({
    title: "Two-Finger Opposite Tap",
    description: "Zwei-Finger-Gegenüber-Tipp auf die Seite des Knopfes. (Hier mit Zeige- und Mittelfinger)",
    required_repetitions: 6 * 2
  })
  await db.insert(recordingTask).values([
    {
      title: "Two-Finger Opposite Tap (4 Finger)",
      description: "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf, Zeige- und Mittelfinger tippen gegenüberliegend.",
      parent_id: twoFingerOppositeTap.lastInsertRowid ? Number(twoFingerOppositeTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "two-finger-opposite-tap-4-fingers",
      explanation_video_path: "/videos/two-finger_opposite_tap_(4_finger).webm"
    },
    {
      title: "Two-Finger Opposite Tap (All Air)",
      description: "Hier starten beide Finger in der Luft und tippen gegenüberliegend auf den Knopf.",
      parent_id: twoFingerOppositeTap.lastInsertRowid ? Number(twoFingerOppositeTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "two-finger-opposite-tap-all-air",
      explanation_video_path: "/videos/two-finger_opposite_tap_(all_air).webm"
    }
  ])

  const twoFingerOppositeDoubleTap = await db.insert(recordingTask).values({
    title: "Two-Finger Opposite Double Tap",
    description: "Zwei-Finger-Gegenüber-Doppel-Tipp auf die Seite des Knopfes. (Hier mit Zeige- und Mittelfinger)",
    required_repetitions: 6 * 3
  })
  await db.insert(recordingTask).values([
    {
      title: "Two-Finger Opposite Double Tap (4 Finger)",
      description: "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf, Zeige- und Mittelfinger tippen gegenüberliegend.",
      parent_id: twoFingerOppositeDoubleTap.lastInsertRowid ? Number(twoFingerOppositeDoubleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "two-finger-opposite-double-tap-4-fingers",
      explanation_video_path: "/videos/two-finger_opposite_double_tap_(4_finger).webm"
    },
    {
      title: "Two-Finger Opposite Double Tap (4 Finger, Ende auf Knopf)",
      description: "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf, Zeige- und Mittelfinger tippen gegenüberliegend. Nach dem zweiten Tippen bleiben beide Finger auf dem Knopf liegen.",
      parent_id: twoFingerOppositeDoubleTap.lastInsertRowid ? Number(twoFingerOppositeDoubleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "two-finger-opposite-double-tap-4-fingers-end-ground",
      explanation_video_path: "/videos/two-finger_opposite_double_tap_(4_finger,_ende_auf_knopf).webm"
    },
    {
      title: "Two-Finger Opposite Double Tap (All Air)",
      description: "Hier starten beide Finger in der Luft und tippen gegenüberliegend auf den Knopf.",
      parent_id: twoFingerOppositeDoubleTap.lastInsertRowid ? Number(twoFingerOppositeDoubleTap.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "two-finger-opposite-double-tap-all-air",
      explanation_video_path: "/videos/two-finger_opposite_double_tap_(all_air).webm"
    }
  ])

  const tapAndHold = await db.insert(recordingTask).values({
    title: "Tap and Hold",
    description: "Tipp auf die Seite des Knopfes und Halten. (Hier mit Zeige- und Mittelfinger)",
    required_repetitions: 6 * 3
  })
  await db.insert(recordingTask).values([
    {
      title: "Tap and Hold (2 Finger)",
      description: "Hier ruhen 2 Finger (Daumen, Zeige-Finger) bei Start auf dem Knopf, der Zeigefinger tippt und hält.",
      parent_id: tapAndHold.lastInsertRowid ? Number(tapAndHold.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "tap-and-hold-2-fingers",
      explanation_video_path: "/videos/tap_and_hold_(2_finger).webm"
    },
    {
      title: "Tap and Hold (3 Finger)",
      description: "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf, der Zeigefinger tippt und hält.",
      parent_id: tapAndHold.lastInsertRowid ? Number(tapAndHold.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "tap-and-hold-3-fingers",
      explanation_video_path: "/videos/tap_and_hold_(3_finger).webm"
    },
    {
      title: "Tap and Hold (4 Finger)",
      description: "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf, der Zeigefinger tippt und hält.",
      parent_id: tapAndHold.lastInsertRowid ? Number(tapAndHold.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "tap-and-hold-4-fingers",
      explanation_video_path: "/videos/tap_and_hold_(4_finger).webm"
    }
  ])

  const singleSwipe = await db.insert(recordingTask).values({
    title: "Single Swipe",
    description: "Einfaches Wischen über die Seite des Knopfes. (Hier mit dem Zeigefinger)",
    required_repetitions: 6 * 2
  })
  await db.insert(recordingTask).values([
    {
      title: "Single Swipe (3 Finger)",
      description: "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf, der Zeigefinger wischt über den Knopf.",
      parent_id: singleSwipe.lastInsertRowid ? Number(singleSwipe.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "single-swipe-3-fingers",
      explanation_video_path: "/videos/single_swipe_(3_finger).webm"
    },
    {
      title: "Single Swipe (4 Finger)",
      description: "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf, der Zeigefinger wischt über den Knopf.",
      parent_id: singleSwipe.lastInsertRowid ? Number(singleSwipe.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "single-swipe-4-fingers",
      explanation_video_path: "/videos/single_swipe_(4_finger).webm"
    }
  ])

  const pinchSwipe = await db.insert(recordingTask).values({
    title: "Pinch Swipe",
    description: "Zwei-Finger-Zusammen-Wischen über die Seite des Knopfes. (Hier mit Zeige- und Mittelfinger)",
    required_repetitions: 6 * 2
  })
  await db.insert(recordingTask).values([
    {
      title: "Pinch Swipe (3 Finger)",
      description: "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf, Zeige- und Mittelfinger wischen zusammen über den Knopf.",
      parent_id: pinchSwipe.lastInsertRowid ? Number(pinchSwipe.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "pinch-swipe-3-fingers",
      explanation_video_path: "/videos/pinch_swipe_(3_finger).webm"
    },
    {
      title: "Pinch Swipe (4 Finger)",
      description: "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf, Zeige- und Mittelfinger wischen zusammen über den Knopf.",
      parent_id: pinchSwipe.lastInsertRowid ? Number(pinchSwipe.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "pinch-swipe-4-fingers",
      explanation_video_path: "/videos/pinch_swipe_(4_finger).webm"
    }
  ])

  const spreadSwipe = await db.insert(recordingTask).values({
    title: "Spread Swipe",
    description: "Zwei-Finger-Auseinander-Wischen über die Seite des Knopfes. (Hier mit Zeige- und Mittelfinger)",
    required_repetitions: 6 * 2
  })
  await db.insert(recordingTask).values([
    {
      title: "Spread Swipe (3 Finger)",
      description: "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf, Zeige- und Mittelfinger wischen auseinander über den Knopf.",
      parent_id: spreadSwipe.lastInsertRowid ? Number(spreadSwipe.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "spread-swipe-3-fingers",
      explanation_video_path: "/videos/spread_swipe_(3_finger).webm"
    },
    {
      title: "Spread Swipe (4 Finger)",
      description: "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf, Zeige- und Mittelfinger wischen auseinander über den Knopf.",
      parent_id: spreadSwipe.lastInsertRowid ? Number(spreadSwipe.lastInsertRowid) : undefined,
      required_repetitions: 6,
      gesture: "spread-swipe-4-fingers",
      explanation_video_path: "/videos/spread_swipe_(4_finger).webm"
    }
  ])

  const scenarios = await db.insert(recordingTask).values({
    title: "Szenarien",
    description: "In diesen Szenarien können die Gesten in einer realistischen Anwendung ausprobiert werden.",
    required_repetitions: 3
  })
  await db.insert(recordingTask).values([
    {
      title: "Bild vergrößern",
      description: "In diesem Szenario wird ein Bild aus einer Liste ausgewählt und vergrößert.",
      parent_id: scenarios.lastInsertRowid ? Number(scenarios.lastInsertRowid) : undefined,
      required_repetitions: 1,
      explanation_video_path: "/videos/bild_vergrößern.webm"
    },
    {
      title: "Dateien kopieren",
      description: "In diesem Szenario werden Dateien von einem Ordner in einen anderen kopiert.",
      parent_id: scenarios.lastInsertRowid ? Number(scenarios.lastInsertRowid) : undefined,
      required_repetitions: 1,
      explanation_video_path: "/videos/dateien_kopieren.webm"
    },
    {
      title: "Musik Vorschau",
      description: "In diesem Szenario wird durch eine Liste von Musiktiteln gescrollt und eine Vorschau abgespielt.",
      parent_id: scenarios.lastInsertRowid ? Number(scenarios.lastInsertRowid) : undefined,
      required_repetitions: 1,
      explanation_video_path: "/videos/musik_vorschau.webm"
    }
  ])
}
