//updated home file
"use client";

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
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      {/* --- Navbar --- */}
      <nav className="flex justify-between items-center p-6 max-w-5xl mx-auto w-full">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-[#4285F4]">Score</span>
          <span className="text-[#EA4335]">Ticker</span>
        </div>
        <a 
          href="https://www.buymeacoffee.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#FFDD00] hover:bg-[#FFEA00] text-gray-900 font-medium py-2 px-4 rounded-full shadow-sm transition-transform transform hover:-translate-y-0.5"
        >
          ☕ Buy me a coffee
        </a>
      </nav>

      {/* --- Hero Section (Input) --- */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900">
          Professional Cricket Overlays <br/>
          <span className="text-[#4285F4]">Made Simple.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
          Generate real-time, broadcast-quality cricket score tickers for your live streams. 
          Just paste your match ID below to get started.
        </p>

        <div className="w-full max-w-md bg-white p-2 rounded-full shadow-lg border border-gray-200 flex transition-shadow hover:shadow-xl focus-within:ring-2 ring-[#4285F4] ring-offset-2">
          <form onSubmit={handleSubmit} className="flex w-full">
            <input
              className="flex-grow bg-transparent px-6 py-3 outline-none text-gray-700 placeholder-gray-400 font-medium rounded-l-full"
              type="text"
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              placeholder="Enter Match ID (e.g., 123456)"
            />
            <button 
              type="submit" 
              className="bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Go Live
            </button>
          </form>
        </div>
        
        <p className="text-sm text-gray-400 mt-4">
          Supports CricHeroes matches natively.
        </p>
      </main>

      {/* --- FAQ Section --- */}
      <section className="bg-white py-16 px-4 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-xl mb-3 text-[#EA4335]">Where do I find the Match ID?</h3>
              <p className="text-gray-600">
                Go to the match page on CricHeroes. The ID is the number at the very end of the URL. 
                <br/><code className="text-xs bg-gray-200 p-1 rounded mt-2 block">cricheroes.in/.../scorecard/[12345]</code>
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-xl mb-3 text-[#34A853]">Is this free to use?</h3>
              <p className="text-gray-600">
                Yes! This tool is completely open-source and free for personal broadcasting use.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-xl mb-3 text-[#FBBC05]">How do I use this in OBS?</h3>
              <p className="text-gray-600">
                Copy the URL of the generated ticker page and paste it into a <strong>Browser Source</strong> in OBS. Set the width to 1920 and height to 1080.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-xl mb-3 text-[#4285F4]">The score isn't updating?</h3>
              <p className="text-gray-600">
                The ticker automatically refreshes every 5 seconds. If it stops, please check if the match is still live on the source website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer / Socials --- */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h4 className="text-white font-bold text-lg">Score Ticker</h4>
            <p className="text-sm mt-2">Developed by Younis Majeed</p>
          </div>

          <div className="flex space-x-6">
            <a href="https://twitter.com" target="_blank" className="hover:text-white transition-colors">
              Twitter / X
            </a>
            <a href="https://github.com" target="_blank" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="mailto:contact@example.com" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-600 mt-12 border-t border-gray-800 pt-8">
          &copy; {new Date().getFullYear()} Score Ticker. All rights reserved. Not affiliated with CricHeroes.
        </div>
      </footer>
    </div>
  );
}




//old home page file

/*"use client"; // Ensure this is a client component

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
*/
