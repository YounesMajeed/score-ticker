// app/utils/apiEndpoints.js

export const BASE_URL = "https://cricheroes.in/api/v1/scorecard/get-mini-scorecard";

export const getScorecardUrl = (matchId) => `${BASE_URL}/${matchId}`;
