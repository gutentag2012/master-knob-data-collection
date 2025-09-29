export type TutorialPageProps = {
  parentTask?: {
    id: number
    title: string
    description: string
  }
  childTask?: {
    id: number
    title: string
    description: string
    explanation_video_path?: string | null
  }
}

export function TutorialPage({parentTask, childTask}: TutorialPageProps) {
  return (
    <div className="h-full flex flex-col gap-4 p-4">
      {parentTask && (
        <header>
          <h1 className="text-2xl font-semibold text-center">{childTask?.title ?? parentTask.title}</h1>
          <p className="text-sm text-center">{parentTask.description}</p>
          {childTask && (
            <p className="text-sm text-center">{childTask.description}</p>
          )}
        </header>
      )}
      {childTask?.explanation_video_path && (
        <video src={childTask.explanation_video_path} autoPlay loop muted className="max-h-96 mt-4" />
      )}
    </div>
  )
}