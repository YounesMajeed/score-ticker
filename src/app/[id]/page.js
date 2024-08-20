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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen items-end min-w-full">
      <div className="flex flex-row">
        <span>
          {data.current_inning === 1
            ? <span><span>{data.team_a.name}</span> <span> {data.team_a.summary} </span> </span>
            : <span><span>{data.team_b.name} </span> <span>{data.team_b.summary} </span></span> } 
          {data.current_inning === 1
            ? data.team_a.innings[0].summary.over
            : data.team_b.innings[0].summary.over}
        </span>
        <div className="">
          <span className="px-2">
            🏏{data.batsmen.sb.name}{" "}
            {data.batsmen.sb.runs}({data.batsmen.sb.balls})
          </span>
          <span className="px-2">
            {data.batsmen.nsb.name}{" "}
            {data.batsmen.nsb.runs}({data.batsmen.nsb.balls})
          </span>
        </div>

        <span className="px-2">
          {data.bowlers.nsb.name} {data.bowlers.wickets}
          {data.bowlers.nsb.runs}({data.bowlers.nsb.overs}){" "}
        </span>
      </div>

      <div>
        {" "}
        This Over:
        {data.recent_over.split("|")[1]}
      </div>

      {/* <div style={{ marginTop: "20px" }}>
        <h4>Match Details</h4>
        <p>Toss: {data.toss_details}</p>
        <p>Result: {data.match_summary.summary}</p>
        <p>Winning Team: {data.winning_team}</p>
        <p>Win By: {data.win_by}</p>
      </div> */}
    </div>
  );
}
