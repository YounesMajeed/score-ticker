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

    // Fetch data every 3 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [id]);

  if (!data) {
    return (
      <div className="flex items-center justify-center text-gray-950 px-10 py-10">
        Loading...
      </div>
    );
  }

  // setting the score, Team name and the Overs
  // according to the Team that's playing
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
    <div className="flex min-h-screen justify-end items-stretch min-w-full flex-col">
      <div className="hidden lg:block">
      <div className="flex flex-row bg-slate-300 px-2 py-1 items-center justify-between text-xl">
        <span className="py-0">
          <span className="bg-red-500 py-1 px-8 rounded-s-full text-3xl font-light">
            {name.substring(0, 15)}
          </span>
          <span className=" bg-blue-700 py-1 px-8 rounded-e-full text-3xl font-extrabold">
            {score} <span className="font-extralight">{over}</span>
          </span>
        </span>
        <div className=" bg-blue-700 py-2 px-8 rounded-full ">
          <span className="px-2">
            {batter.sb.name.substring(0, 14)}{" "}
            <span className="font-extrabold">{batter.sb.runs}</span>
            <span className="font-extralight">({batter.sb.balls})*</span>
          </span>
          <span className="px-2">
            {batter.nsb.name.substring(0, 14)}{" "}
            <span className="font-extrabold">{batter.nsb.runs}</span>
            <span className="font-extralight">({batter.nsb.balls})</span>
          </span>
        </div>
        <span className="bg-slate-700 py-2 px-8 mr-3 rounded-full">
          {" ⚾ "}
          {bowler.sb.name.substring(0, 14)}
          {" :- "} {bowler.sb.wickets} {" . "}
          {bowler.sb.runs}
          {" . "}({bowler.sb.overs})
        </span>
      </div>

      <div className="flex flex-row bg-slate-800 px-8 py-2 justify-between text-lg">
        <span>Run Rate: {runrate}</span>
        <span>{data.match_summary.summary}</span>
        This Over:
        {data.recent_over.split("|")[1]}
      </div>
      </div>
      <div className="block md:hidden text-slate-950 text-xl text-center py-40 font-bold"> The Preview looks best only on desktop.</div>
    </div>
  );
}
