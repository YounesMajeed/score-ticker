"use client"; // Add this line at the top

import { useState, useEffect } from "react";

export default function FetchDataComponent() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);

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
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data every 3 seconds
    const intervalId = setInterval(fetchData, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [id]);

  return (
    <div className="flex-col p-3">
      <h1>Enter cricHeroes Match ID: </h1>
      <input
        className="rounded-md p-2 m-2 bg-zinc-500"
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter ID"
      />
      {data ? (
        <div>
          <h2>Data from API:</h2>
          <p>
            Score:{" "}
            {data.data.current_inning === 1
              ? data.data.team_a.summary
              : data.data.team_b.summary}{" "}
            overs:{" "}
            {data.data.current_inning === 1
              ? data.data.team_a.innings[0].summary.over
              : data.data.team_b.innings[0].summary.over}
          </p>
          <p>
            Last Balls:
            {data.data.recent_over.split("|")[1]}
          </p>
          <p>
            {data.data.batsmen.sb.name} {data.data.batsmen.sb.runs}(
            {data.data.batsmen.sb.balls})*
          </p>
          <p>
            {data.data.batsmen.nsb.name} {data.data.batsmen.nsb.runs}(
            {data.data.batsmen.nsb.balls})
          </p>
        </div>
      ) : id ? (
        <p>Loading...</p>
      ) : (
        <p>Please enter an ID to fetch data.</p>
      )}
    </div>
  );
}
