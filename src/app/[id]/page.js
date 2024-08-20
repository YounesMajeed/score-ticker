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
    return <div className="text-gray-950">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen justify-end items-stretch min-w-full flex-col">
      <div className="flex flex-row bg-slate-950 px-4 py-1 items-center">
        <span>
          {data.current_inning === 1
            ? <span><span className="text-xl">{data.team_a.name}</span> {"   |   "}<span className="text-2xl"> {data.team_a.summary} </span> </span>
            : <span><span className="text-xl">{data.team_b.name} </span> {"   |   "} <span className="text-2xl">{data.team_b.summary} </span></span> } 
          {data.current_inning === 1
            ? data.team_a.innings[0].summary.over
            : data.team_b.innings[0].summary.over}
        </span>
        <div className="mx-12">
          <span className="px-2">
            🏏{data.batsmen.sb.name}{" "}
            {data.batsmen.sb.runs}({data.batsmen.sb.balls})
          </span>
          <span className="px-2">
            {data.batsmen.nsb.name}{" "}
            {data.batsmen.nsb.runs}({data.batsmen.nsb.balls})
          </span>
        </div>
        <span className="mx-16 px-2">
          {" ⚾ "}{data.bowlers.sb.name}{" - "} {data.bowlers.wickets} {" "}
          {data.bowlers.sb.runs}({data.bowlers.sb.overs}){" "}
        </span>
      </div>

      <div className="flex flex-row bg-slate-950 p-2 justify-center">
        {" "}
        This Over:
        {data.recent_over.split("|")[1]}
      </div>
    </div>
  );
}
