import {selectedChildTask, selectedParentTask} from "../../lib/state.ts";

export type Props = {
  id: string
  experiments: {
    id: number
    title: string
    progress: number
    parent_id: number | null
  }[]
  oob?: boolean
}

export function TaskSelector({id, experiments, oob}: Props) {
  const selectedParent = selectedParentTask.peek()
  const selectedChild = selectedChildTask.peek()
  const oobProps = oob ? { "hx-swap-oob": "true" } : {}
  return (
    <div id="experiment-list" {...oobProps}>
      <p className="text-lg font-semibold">Kategorien</p>
      <div className="mt-2 grid grid-cols-4 gap-2">
          {experiments.filter(task => !task.parent_id).map(task => (
            <button
              key={task.id}
              hx-post="/operator/select-parent-task"
              hx-vals={`{"session_id": "${id}", "task_id": "${task.id}"}`}
              hx-target="#experiment-list"
              hx-swap="outerHTML"
              className={[
                "relative flex items-center justify-between px-1 py-0.5 rounded cursor-pointer text-start text-sm bg-indigo-100 text-indigo-900 hover:bg-indigo-200",
                selectedParent === task.id ? "ring-2 ring-offset-2 ring-indigo-400" : "",
              ].join(" ")}
            >
                <span
                  style={{width: `${task.progress * 100}%`}}
                  className="absolute rounded top-0 bottom-0 left-0 bg-indigo-200"
                />
                <span className="font-medium z-10">{task.title}</span>
            </button>
          ))}
        </div>
      <p className="text-lg font-semibold mt-4">Unterkategorien</p>
      <div className="mt-2 grid grid-cols-4 gap-2">
          {experiments.filter(task => selectedParent && task.parent_id === selectedParent).map(task => (
            <button
              key={task.id}
              hx-post="/operator/select-child-task"
              hx-vals={`{"session_id": "${id}", "task_id": "${task.id}"}`}
              hx-target="#experiment-list"
              hx-swap="outerHTML"
              className={[
                "relative flex items-center justify-between px-1 py-0.5 rounded cursor-pointer text-start text-sm bg-indigo-100 text-indigo-900 hover:bg-indigo-200",
                selectedChild === task.id ? "ring-2 ring-offset-2 ring-indigo-400" : "",
              ].join(" ")}
            >
                <span
                  style={{width: `${task.progress * 100}%`}}
                  className="absolute rounded top-0 bottom-0 left-0 bg-indigo-200"
                />
                <span className="font-medium z-10">{task.title}</span>
            </button>
          ))}
        </div>
    </div>
  )
}