import PlayGrid from '../components/game/playgrid'


export default function GamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 flex flex-col items-center">
      <PlayGrid />
    </div>
  )
}