// utils/api.js

const fetchData = async (url) => {
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
  
  export default fetchData;
  