// utils/api.js
// app/utils/api.js

export const fetchMatchData = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        "api-key": "cr!CkH3r0s",
        "device-type": "Chrome: 127.0.0.0",
        udid: "5010064645373612700053736",
      },
      // cache: 'no-store' ensures we always get fresh data for live scores
      cache: 'no-store' 
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
/*const fetchData = async (url) => {
    const response = await fetch(url, {
      headers: {
        //cric heroes headers
        "api-key": "cr!CkH3r0s",
        "device-type": "Chrome: 127.0.0.0",
        udid: "5010064645373612700053736",
      },
    });
  
    return response.json();
  };
  
  export default fetchData;*/
  
