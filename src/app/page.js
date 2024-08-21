"use client"; // Ensure this is a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [matchId, setMatchId] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (matchId) {
      router.push(`/basic-theme/${matchId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 items-center text-gray-950">
      <h1 className="m-10 text-4xl font-extrabold">Score <span className="text-orange-500">Ticker </span><span className="text-sm font-normal">by Younis Majeed</span></h1>
      <h1 className="m-4">Enter Match ID</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="text-gray-50 font-mono rounded-md px-3 py-1 mr-2 bg-slate-950 text-balance"
          type="text"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          placeholder="Enter match ID"
        />
        <button type="submit" className="rounded-md bg-gray-800 px-4 py-1 text-gray-50">Submit</button>
      </form>
    </div>
  );
}
