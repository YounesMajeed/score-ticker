import fetchData from "../utils/api";
import {
  cricHeroes,
} from "../utils/apiEndpoints";

export default async function Home() {
  //API endpoints moved to utils/apiEndpoints.js

  // Fetch Indian Super League and Hero I League Teams in parallel
  const [dataCricHeroes] = await Promise.all([
    fetchData(cricHeroes),
  ]);
  return (
    <main className="flex min-h-screen flex-col justify-end p-2 font-mono">
      <p>Score Ticker</p>
      <div className="">
        <span className="bg-blue-500 text-2xl p-1 pl-10 pr-10">{dataCricHeroes.data.team_a.name}</span>
        <span className="bg-slate-300 p-2 rounded-2xl text-black">
        <span className="pl-4 p-1 font-bold text-2xl">{dataCricHeroes.data.team_a.summary}</span>
        <span className="font-medium text-xl pr-10">{dataCricHeroes.data.team_a.innings[0].summary.over}</span>
        <span className="p-2 font-bold text-xl">{dataCricHeroes.data.batsmen.sb.name} {dataCricHeroes.data.batsmen.sb.runs}({dataCricHeroes.data.batsmen.sb.balls})*</span>
        <span className="p-2 font-bold text-xl">{dataCricHeroes.data.batsmen.nsb.name} {dataCricHeroes.data.batsmen.nsb.runs}({dataCricHeroes.data.batsmen.nsb.balls})</span>
        <span className="p-2 font-bold text-xl"> | {dataCricHeroes.data.bowlers.sb.name} {dataCricHeroes.data.bowlers.sb.wickets} - {dataCricHeroes.data.bowlers.sb.runs} - ({dataCricHeroes.data.bowlers.sb.overs})</span>
        
        </span>
      </div>
      <div className="p-3">
      <span className="font-medium text-xl pr-10">CRR: {dataCricHeroes.data.team_a.innings[0].summary.rr}</span>
      <span className="font-medium text-xl pr-10 pl-24">Last Balls: {dataCricHeroes.data.recent_over}</span>

      </div>
    </main>
  );
}
