"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";

export default function MatchPage({ params }) {
  const [data, setData] = useState(null);
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cricheroes.in/api/v1/scorecard/get-mini-scorecard/${id}`,
          {
            headers: {
              "api-key": "cr!CkH3r0s",
              "device-type": "Chrome: 127.0.0.0",
              udid: "5010064645373612700053736",
            },
          }
        );

        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [id]);

  if (!data) {
    return (
      <div className="flex items-center justify-center text-gray-950 px-10 py-10 font-sans">
        <div className="animate-pulse flex space-x-4">
          <div className="h-4 w-4 bg-[#4285F4] rounded-full"></div>
          <div className="h-4 w-4 bg-[#EA4335] rounded-full"></div>
          <div className="h-4 w-4 bg-[#FBBC05] rounded-full"></div>
          <div className="h-4 w-4 bg-[#34A853] rounded-full"></div>
        </div>
      </div>
    );
  }

  // setting the score, Team name and the Overs
  const score =
    data.current_inning === 1 ? data.team_a.summary : data.team_b.summary;
  const over =
    data.current_inning === 1
      ? data.team_a.innings[0].summary.over
      : data.team_b.innings[0].summary.over;
  const name = data.current_inning === 1 ? data.team_a.name : data.team_b.name;
  const runrate =
    data.current_inning === 1
      ? data.team_a.innings[0].summary.rr
      : data.team_b.innings[0].summary.rr;
  const batter = data.batsmen;
  const bowler = data.bowlers;

  return (
    <div className="flex min-h-screen justify-end items-stretch min-w-full flex-col font-sans">
      <div className="hidden lg:block">
        {/* Main Ticker Bar - White Background for "Card" look */}
        <div className="flex flex-row bg-white shadow-lg border-t-4 border-[#4285F4] px-4 py-3 items-center justify-between text-xl">
          
          {/* Team Name (Google Blue) & Score (Google Red) */}
          <span className="flex items-center shadow-sm rounded-full overflow-hidden">
            <span className="bg-[#4285F4] text-white py-2 px-6 text-2xl font-medium tracking-wide">
              {name.substring(0, 15)}
            </span>
            <span className="bg-[#EA4335] text-white py-2 px-6 text-2xl font-bold">
              {score} <span className="font-light opacity-90 ml-2">{over}</span>
            </span>
          </span>

          {/* Batsmen (Google Yellow - Dark Text for contrast) */}
          <div className="bg-[#FBBC05] text-gray-900 py-2 px-8 rounded-full text-xl font-medium shadow-sm mx-2">
            <span className="px-3 border-r border-yellow-600/30">
              {batter.sb.name}
              <span className="font-extrabold ml-2">{batter.sb.runs}</span>
              <span className="text-sm ml-1 font-normal opacity-80">({batter.sb.balls})*</span>
            </span>
            <span className="px-3">
              {batter.nsb.name.substring(0, 14)}
              <span className="font-extrabold ml-2">{batter.nsb.runs}</span>
              <span className="text-sm ml-1 font-normal opacity-80">({batter.nsb.balls})</span>
            </span>
          </div>

          {/* Bowler (Google Green) */}
          <span className="bg-[#34A853] text-white py-2 px-8 rounded-full text-xl shadow-sm flex items-center">
            <span className="mr-2">⚾</span>
            <span className="font-medium">{bowler.sb.name.substring(0, 14)}</span>
            <span className="mx-2 opacity-60">|</span>
            <span className="font-bold">{bowler.sb.wickets}</span>
            <span className="mx-1">-</span>
            <span className="font-bold">{bowler.sb.runs}</span>
            <span className="ml-2 text-sm font-light opacity-90">
              ({bowler.sb.overs})
            </span>
          </span>
        </div>

        {/* Footer / Info Bar (Google Grey) */}
        <div className="flex flex-row bg-[#F1F3F4] text-gray-700 px-16 py-2 justify-between text-lg font-medium border-t border-gray-200">
          <span>Run Rate: <span className="text-[#EA4335] font-bold">{runrate}</span></span>
          <span className="uppercase tracking-widest text-gray-500 text-sm mt-1">{data.match_summary.summary}</span>
          <span className="flex items-center">
            <span className="mr-2 text-gray-500">This Over:</span>
            <span className="tracking-widest font-mono text-gray-900">{data.recent_over.split("|")[1]}</span>
          </span>
        </div>
      </div>

      <div className="block md:hidden text-slate-950 text-xl text-center py-40 font-bold">
        The Preview looks best only on desktop.
      </div>
    </div>
  );
}
