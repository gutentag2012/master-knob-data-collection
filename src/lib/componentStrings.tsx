import {renderToString} from "react-dom/server";
import {TutorialPage, type TutorialPageProps} from "../components/tasks/TutorialPage.tsx";
import {RecorderCountdown, type RecorderCountdownProps} from "../components/tasks/RecorderCountdown.tsx";

export function getTutorialPage(props: TutorialPageProps) {
  return renderToString(<TutorialPage {...props} />)
}

export function getRecorderCountdown(props?: RecorderCountdownProps) {
  return renderToString(<RecorderCountdown {...(props ?? {})} />)
}