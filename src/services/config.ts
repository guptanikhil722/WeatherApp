export const CONFIG = {
  WEATHER_API_KEY: '3d4c5b724910eca63020f2b843a01aa3',
  NEWS_API_KEY: '881bbea0c54145f8b2063e04ccbcf9cb',
  WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  NEWS_BASE_URL: 'https://newsapi.org/v2',
  DEFAULT_LOCATION: {
    latitude: 40.7128,
    longitude: -74.0060,
    city: 'New York',
    country: 'US'
  }
};

export const WEATHER_ENDPOINTS = {
  CURRENT: '/weather',
  FORECAST: '/forecast',
  AIR_POLLUTION: '/air_pollution'
};

export const NEWS_ENDPOINTS = {
  TOP_HEADLINES: '/top-headlines',
  EVERYTHING: '/everything',
  SOURCES: '/sources'
}; 