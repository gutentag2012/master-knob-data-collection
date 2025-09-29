export type RecorderCountdownProps = {
  withCountdown?: boolean
  markers: string[]
  amountOfRecordings: number
}

export function RecorderCountdown({withCountdown, markers, amountOfRecordings}: RecorderCountdownProps) {
  const markerSummary = markers.reduce((acc, curr) => {
    if(curr.includes("start")) acc.isStarted = true
    if(curr === "end" && acc.isStarted) {
      acc.ended += 1
      acc.isStarted = false
    }
    return acc
  }, {ended: 0, isStarted: false})
  const recordingsToMap = Array.from({length: amountOfRecordings}).map((_, i) => {
    if(i < markerSummary.ended) return 1
    if(i === markerSummary.ended && markerSummary.isStarted) return 0
    return -1
  })
  return (<div>
    {withCountdown && <p id="countdown">3</p>}
    <div>
      {recordingsToMap.map((state, i) => {
        if(state === 1) return <span key={i} className="text-green-500 font-bold">● </span>
        if(state === 0) return <span key={i} className="text-yellow-500 font-bold animate-pulse">● </span>
        return <span key={i} className="text-gray-400 font-bold">● </span>
      })}
    </div>
  </div>)
}