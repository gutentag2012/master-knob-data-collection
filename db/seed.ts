import { db, recordingTask } from "astro:db";

export default async function seed() {
  const singleTap = await db.insert(recordingTask).values({
    title: "Single Tap",
    description: "Einfacher Tipp auf die Seite des Knopfes.",
    required_repetitions: 6 * 3,
  });
  await db.insert(recordingTask).values([
    {
      title: "Single Tap (4 Finger)",
      description:
        "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf. Der Zeigefinger tippt.",
      parent_id: singleTap.lastInsertRowid
        ? Number(singleTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "single-tap-4-fingers",
      explanation_video_path: "/videos/single_tap_(4_finger).webm",
    },
    {
      title: "Single Tap (3 Finger, Luft)",
      description:
        "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf, der Zeigefinger startet in der Luft. Der Zeigefinger tippt.",
      parent_id: singleTap.lastInsertRowid
        ? Number(singleTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "single-tap-3-fingers-air",
      explanation_video_path: "/videos/single_tap_(3_finger,_luft).webm",
    },
  ]);

  const doubleTap = await db.insert(recordingTask).values({
    title: "Double Tap",
    description: "Doppel-Tipp auf die Seite des Knopfes.",
    required_repetitions: 6 * 4,
  });
  await db.insert(recordingTask).values([
    {
      title: "Double Tap (4 Finger)",
      description:
        "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf.",
      parent_id: doubleTap.lastInsertRowid
        ? Number(doubleTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "double-tap-4-fingers",
      explanation_video_path: "/videos/double_tap_(4_finger).webm",
    },
    {
      title: "Double Tap (3 Finger, Luft)",
      description:
        "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf, der Zeigefinger startet in der Luft. Der Zeigefinger tippt.",
      parent_id: doubleTap.lastInsertRowid
        ? Number(doubleTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "double-tap-3-fingers-air",
      explanation_video_path: "/videos/double_tap_(3_finger,_luft).webm",
    },
  ]);

  const twoFingerTap = await db.insert(recordingTask).values({
    title: "Two-Finger Tap",
    description:
      "Zwei-Finger-Tipp auf die Seite des Knopfes. (Hier mit Zeige- und Mittelfinger)",
    required_repetitions: 6 * 2,
  });
  await db.insert(recordingTask).values([
    {
      title: "Two-Finger Tap (4 Finger)",
      description:
        "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf. Zeige- und Mittelfinger tippen.",
      parent_id: twoFingerTap.lastInsertRowid
        ? Number(twoFingerTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "two-finger-tap-4-fingers",
      explanation_video_path: "/videos/two-finger_tap_(4_finger).webm",
    },
    {
      title: "Two-Finger Tap (3 Finger)",
      description:
        "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf. Zeige- und Mittelfinger tippen.",
      parent_id: twoFingerTap.lastInsertRowid
        ? Number(twoFingerTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "two-finger-tap-3-fingers",
      explanation_video_path: "/videos/two-finger_tap_(3_finger).webm",
    },
  ]);

  const twoFingerDoubleTap = await db.insert(recordingTask).values({
    title: "Two-Finger Double Tap",
    description: "Zwei-Finger-Doppel-Tipp auf die Seite des Knopfes.",
    required_repetitions: 6 * 2,
  });
  await db.insert(recordingTask).values([
    {
      title: "Two-Finger Double Tap (4 Finger)",
      description:
        "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf. Zeige- und Mittelfinger tippen.",
      parent_id: twoFingerDoubleTap.lastInsertRowid
        ? Number(twoFingerDoubleTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "two-finger-double-tap-4-fingers",
      explanation_video_path: "/videos/two-finger_double_tap_(4_finger).webm",
    },
    {
      title: "Two-Finger Double Tap (3 Finger)",
      description:
        "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf. Zeige- und Mittelfinger tippen.",
      parent_id: twoFingerDoubleTap.lastInsertRowid
        ? Number(twoFingerDoubleTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "two-finger-double-tap-3-fingers",
      explanation_video_path: "/videos/two-finger_double_tap_(3_finger).webm",
    },
  ]);

  const twoFingerOppositeTap = await db.insert(recordingTask).values({
    title: "Two-Finger Opposite Tap",
    description: "Zwei-Finger-Gegenüber-Tipp auf die Seite des Knopfes.",
    required_repetitions: 6 * 2,
  });
  await db.insert(recordingTask).values([
    {
      title: "Two-Finger Opposite Tap (4 Finger)",
      description:
        "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf. Daumen und Mittelfinger tippen gegenüberliegend, dabei geht der Zeigefinger mit in die Luft.",
      parent_id: twoFingerOppositeTap.lastInsertRowid
        ? Number(twoFingerOppositeTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "two-finger-opposite-tap-4-fingers",
      explanation_video_path: "/videos/two-finger_opposite_tap_(4_finger).webm",
    },
    {
      title: "Two-Finger Opposite Tap (All Air)",
      description:
        "Hier starten alle Finger in der Luft. Daumen und Mittelfinger tippen gegenüberliegend auf den Knopf, dabei geht der Zeigefinger mit in die Luft.",
      parent_id: twoFingerOppositeTap.lastInsertRowid
        ? Number(twoFingerOppositeTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "two-finger-opposite-tap-all-air",
      explanation_video_path: "/videos/two-finger_opposite_tap_(all_air).webm",
    },
  ]);

  const twoFingerOppositeDoubleTap = await db.insert(recordingTask).values({
    title: "Two-Finger Opposite Double Tap",
    description:
      "Zwei-Finger-Gegenüber-Doppel-Tipp auf die Seite des Knopfes. (Hier mit Zeige- und Mittelfinger)",
    required_repetitions: 6 * 3,
  });
  await db.insert(recordingTask).values([
    {
      title: "Two-Finger Opposite Double Tap (4 Finger)",
      description:
        "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf. Zeige- und Mittelfinger tippen gegenüberliegend.",
      parent_id: twoFingerOppositeDoubleTap.lastInsertRowid
        ? Number(twoFingerOppositeDoubleTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "two-finger-opposite-double-tap-4-fingers",
      explanation_video_path:
        "/videos/two-finger_opposite_double_tap_(4_finger).webm",
    },
    {
      title: "Two-Finger Opposite Double Tap (All Air)",
      description:
        "Hier starten alle Finger in der Luft. Daumen und Mittelfinger tippen gegenüberliegend auf den Knopf, dabei geht der Zeigefinger mit in die Luft.",
      parent_id: twoFingerOppositeDoubleTap.lastInsertRowid
        ? Number(twoFingerOppositeDoubleTap.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "two-finger-opposite-double-tap-all-air",
      explanation_video_path:
        "/videos/two-finger_opposite_double_tap_(all_air).webm",
    },
  ]);

  const tapAndHold = await db.insert(recordingTask).values({
    title: "Tap and Hold",
    description:
      "Tipp auf die Seite des Knopfes und Halten. (Hier mit Zeige- und Mittelfinger)",
    required_repetitions: 6 * 3,
  });
  await db.insert(recordingTask).values([
    {
      title: "Tap and Hold (2 Finger)",
      description:
        "Hier ruhen 2 Finger (Daumen, Zeige-Finger) bei Start auf dem Knopf, der Zeigefinger tippt und hält.",
      parent_id: tapAndHold.lastInsertRowid
        ? Number(tapAndHold.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "tap-and-hold-2-fingers",
      explanation_video_path: "/videos/tap_and_hold_(2_finger).webm",
    },
    {
      title: "Tap and Hold (3 Finger)",
      description:
        "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf. Der Mittelfinger tippt und hält.",
      parent_id: tapAndHold.lastInsertRowid
        ? Number(tapAndHold.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "tap-and-hold-3-fingers",
      explanation_video_path: "/videos/tap_and_hold_(3_finger).webm",
    },
  ]);

  const singleSwipe = await db.insert(recordingTask).values({
    title: "Single Swipe",
    description:
      "Einfaches Wischen über die Seite des Knopfes. (Hier mit dem Zeigefinger)",
    required_repetitions: 6 * 2,
  });
  await db.insert(recordingTask).values([
    {
      title: "Single Swipe (3 Finger)",
      description:
        "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf. Der Zeigefinger wischt über den Knopf im Uhrzeigersinn.",
      parent_id: singleSwipe.lastInsertRowid
        ? Number(singleSwipe.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "single-swipe-3-fingers",
      explanation_video_path: "/videos/single_swipe_(3_finger).webm",
    },
    {
      title: "Single Swipe (All Air)",
      description:
        "Hier starten alle Finger in der Luft. Der Zeigefinger wischt über den Knopf gegen den Uhrzeigersinn.",
      parent_id: singleSwipe.lastInsertRowid
        ? Number(singleSwipe.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "single-swipe-all-air",
      explanation_video_path: "/videos/single_swipe_(all_air).webm",
    },
  ]);

  const pinchSwipe = await db.insert(recordingTask).values({
    title: "Pinch Swipe",
    description: "Zwei-Finger-Zusammen-Wischen über die Seite des Knopfes.",
    required_repetitions: 6 * 2,
  });
  await db.insert(recordingTask).values([
    {
      title: "Pinch Swipe (Rechts)",
      description:
        "Hier starten alle Finger in der Luft. Zeige- und Mittelfinger starten jeweils oben und unten auf dem Knopf und wischen nach rechts zusammen.",
      parent_id: pinchSwipe.lastInsertRowid
        ? Number(pinchSwipe.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "pinch-swipe-rechts",
      explanation_video_path: "/videos/pinch_swipe_(rechts).webm",
    },
    {
      title: "Pinch Swipe (Links)",
      description:
        "Hier starten alle Finger in der Luft. Zeige- und Mittelfinger starten jeweils oben und unten auf dem Knopf und wischen nach links zusammen.",
      parent_id: pinchSwipe.lastInsertRowid
        ? Number(pinchSwipe.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "pinch-swipe-links",
      explanation_video_path: "/videos/pinch_swipe_(links).webm",
    },
  ]);

  const spreadSwipe = await db.insert(recordingTask).values({
    title: "Spread Swipe",
    description: "Zwei-Finger-Auseinander-Wischen über die Seite des Knopfes.",
    required_repetitions: 6 * 2,
  });
  await db.insert(recordingTask).values([
    {
      title: "Spread Swipe (Rechts)",
      description:
        "Hier starten alle Finger in der Luft. Zeige- und Mittelfinger starten jeweils oben und unten auf dem Knopf und wischen nach rechts auseinander.",
      parent_id: spreadSwipe.lastInsertRowid
        ? Number(spreadSwipe.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "spread-swipe-rechts",
      explanation_video_path: "/videos/spread_swipe_(rechts).webm",
    },
    {
      title: "Spread Swipe (Links)",
      description:
        "Hier starten alle Finger in der Luft. Zeige- und Mittelfinger starten jeweils oben und unten auf dem Knopf und wischen nach links auseinander.",
      parent_id: spreadSwipe.lastInsertRowid
        ? Number(spreadSwipe.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "spread-swipe-links",
      explanation_video_path: "/videos/spread_swipe_(links).webm",
    },
  ]);

  const scenarios = await db.insert(recordingTask).values({
    title: "Szenarien",
    description:
      "In diesen Szenarien können die Gesten in einer realistischen Anwendung ausprobiert werden.",
    required_repetitions: 3,
  });
  await db.insert(recordingTask).values([
    {
      title: "Bild vergrößern",
      description:
        "In diesem Szenario wird ein Bild aus einer Liste ausgewählt und vergrößert.\nSchritte:\n1. Knopf drehen (Hier wird durch eine Dateiliste gescrollt)\n2. Double Tap (Öffnet ein Bild)\n3. Drehen (Wählt andere Bilder in der Detailansicht aus)\n4. Spread Swipe (Zoomt in das Bild hinein)\n5. Pinch Swipe (Zoomt aus dem Bild heraus)\n6. Two-Finger Opposite Double Tap (Schließt die Detailansicht)",
      parent_id: scenarios.lastInsertRowid
        ? Number(scenarios.lastInsertRowid)
        : undefined,
      required_repetitions: 1,
      explanation_video_path: "/videos/bild_vergrößern.webm",
    },
    {
      title: "Dateien kopieren",
      description:
        "In diesem Szenario werden Dateien von einem Ordner in einen anderen kopiert.\nSchritte:\n1. Tap and Hold (Startet eine Auswahl)\n2. Knopf drehen (Erweitert die Auswahl in der Dateiliste)\n3. Two-Finger Opposite Tap (Bestätigt die Auswahl)\n4. Swipe rechts (Kopiert Dateien in Zwischenablage)\n5. Knopf doppelt drücken (Geht aus Ordner heraus)\n6. Knopf drehen (Wechselt in den Zielordner)\n7. Knopf drücken (Geht in den Zielordner hinein)\n8. Swipe links (Fügt die Dateien aus der Zwischenablage in den Ordner ein)",
      parent_id: scenarios.lastInsertRowid
        ? Number(scenarios.lastInsertRowid)
        : undefined,
      required_repetitions: 1,
      explanation_video_path: "/videos/dateien_kopieren.webm",
    },
    {
      title: "Musik Vorschau",
      description:
        "In diesem Szenario wird durch eine Liste von Musiktiteln gescrollt und ein Song gesucht.\nSchritte:\n1. Drehen (Scrollt durch die Liste)\n2. Two-Finger Tap (Spielt eine Vorschau des Songs ab)\n3. Drehen (Scrollt weiter durch die Liste)\n4. Two-Finger Tap (Spielt eine Vorschau des Songs ab)\n5. Two-Finger Double Tap (Startet den kompletten Song)\n6. Drehen (Passt die Lautstärke an)",
      parent_id: scenarios.lastInsertRowid
        ? Number(scenarios.lastInsertRowid)
        : undefined,
      required_repetitions: 1,
      explanation_video_path: "/videos/musik_vorschau.webm",
    },
  ]);

  const noGesture = await db.insert(recordingTask).values({
    title: "No Gesture",
    description:
      "Auflegen und Abnehmen der Hand sowie Betätigen des Knopfes ohne weitere Geste.",
    required_repetitions: 1,
    gesture: "no-gesture",
    explanation_video_path: "/videos/no_gesture.webm",
  });
  await db.insert(recordingTask).values([
    {
      title: "Knob Turn (3 Fingers)",
      description:
        "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf. Der Knopf wird gedreht.",
      parent_id: noGesture.lastInsertRowid
        ? Number(noGesture.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "knob-turn-3-fingers",
      explanation_video_path: "/videos/knob_turn_(3_finger).webm",
    },
    {
      title: "Knob Turn (All Fingers)",
      description:
        "Hier ruhen alle Finger (Daumen, Zeige-, Mittel-, Ring- und kleiner Finger) bei Start auf dem Knopf. Der Knopf wird gedreht.",
      parent_id: noGesture.lastInsertRowid
        ? Number(noGesture.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "knob-turn-all-fingers",
      explanation_video_path: "/videos/knob_turn_(all_finger).webm",
    },
    {
      title: "Knob Press (No Fingers)",
      description:
        "Hier sind keine Finger auf dem Knopf. Der Knopf wird gedrückt.",
      parent_id: noGesture.lastInsertRowid
        ? Number(noGesture.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "knob-press-no-fingers",
      explanation_video_path: "/videos/knob_press_(no_finger).webm",
    },
    {
      title: "Knob Press (4 Fingers)",
      description:
        "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf. Der Knopf wird gedrückt.",
      parent_id: noGesture.lastInsertRowid
        ? Number(noGesture.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "knob-press-4-fingers",
      explanation_video_path: "/videos/knob_press_(4_finger).webm",
    },
    {
      title: "Lay On (2 Fingers)",
      description:
        "Hier ruhen 2 Finger (Daumen, Zeige-Finger) bei Start auf dem Knopf. Die Hand wird aufgelegt.",
      parent_id: noGesture.lastInsertRowid
        ? Number(noGesture.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "lay-on-2-fingers",
      explanation_video_path: "/videos/lay_on_(2_finger).webm",
    },
    {
      title: "Lay On (3 Fingers)",
      description:
        "Hier ruhen 3 Finger (Daumen, Zeige-, Mittel-Finger) bei Start auf dem Knopf. Die Hand wird aufgelegt.",
      parent_id: noGesture.lastInsertRowid
        ? Number(noGesture.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "lay-on-3-fingers",
      explanation_video_path: "/videos/lay_on_(3_finger).webm",
    },
    {
      title: "Lay Off (All Fingers)",
      description:
        "Hier ruhen alle Finger (Daumen, Zeige-, Mittel-, Ring- und kleiner Finger) bei Start auf dem Knopf. Die Hand wird abgenommen.",
      parent_id: noGesture.lastInsertRowid
        ? Number(noGesture.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "lay-off-all-fingers",
      explanation_video_path: "/videos/lay_off_(all_finger).webm",
    },
    {
      title: "Lay Off (4 Fingers)",
      description:
        "Hier ruhen 4 Finger (Daumen, Zeige-, Mittel-, Ring-Finger) bei Start auf dem Knopf. Die Hand wird abgenommen.",
      parent_id: noGesture.lastInsertRowid
        ? Number(noGesture.lastInsertRowid)
        : undefined,
      required_repetitions: 6,
      gesture: "lay-off-4-fingers",
      explanation_video_path: "/videos/lay_off_(4_finger).webm",
    },
  ]);
}
