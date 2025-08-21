import { NewsArticle } from '../types/news';
import { WeatherData } from '../types/weather';

export const filterNewsByWeather = (news: NewsArticle[], weather: WeatherData): NewsArticle[] => {
  if (!weather || !weather.weather || !weather.weather.length) {
    return news;
  }

  const weatherCondition = weather.weather[0].main.toLowerCase();
  const temperature = weather.main.temp;

  // Define temperature thresholds (in Celsius)
  const COLD_THRESHOLD = 10;  // Below 10°C is considered cold
  const HOT_THRESHOLD = 25;   // Above 25°C is considered hot
  const COOL_THRESHOLD = 20;  // 10-20°C is considered cool

  // Weather-based news filtering logic
  let relevantKeywords: string[] = [];

  if (temperature < COLD_THRESHOLD) {
    // Cold weather: Show depressing news
    relevantKeywords = [
      'depression', 'sad', 'gloomy', 'melancholy', 'despair', 'hopelessness',
      'economic crisis', 'recession', 'unemployment', 'poverty', 'homelessness',
      'death', 'tragedy', 'disaster', 'accident', 'crime', 'violence',
      'political turmoil', 'corruption', 'scandal', 'failure', 'bankruptcy',
      'disease', 'illness', 'pandemic', 'epidemic', 'outbreak'
    ];
  } else if (temperature > HOT_THRESHOLD) {
    // Hot weather: Show fear-related news
    relevantKeywords = [
      'fear', 'terror', 'horror', 'panic', 'anxiety', 'dread',
      'threat', 'danger', 'warning', 'alert', 'emergency', 'crisis',
      'attack', 'invasion', 'war', 'conflict', 'violence', 'terrorism',
      'natural disaster', 'earthquake', 'tsunami', 'hurricane', 'wildfire',
      'climate change', 'global warming', 'extinction', 'pollution', 'contamination'
    ];
  } else if (temperature >= COLD_THRESHOLD && temperature <= COOL_THRESHOLD) {
    // Cool weather: Show winning and happiness news
    relevantKeywords = [
      'victory', 'win', 'success', 'achievement', 'triumph', 'celebration',
      'happiness', 'joy', 'excitement', 'optimism', 'hope', 'inspiration',
      'breakthrough', 'discovery', 'innovation', 'progress', 'advancement',
      'good news', 'positive', 'uplifting', 'motivational', 'encouraging',
      'sports win', 'championship', 'medal', 'award', 'recognition'
    ];
  }

  // If no specific weather condition, return all news
  if (relevantKeywords.length === 0) {
    return news;
  }

  // Filter news based on relevant keywords
  return news.filter(article => {
    const title = article.title.toLowerCase();
    const description = article.description?.toLowerCase() || '';
    const content = article.content?.toLowerCase() || '';

    // Check if any of the relevant keywords appear in the article
    return relevantKeywords.some(keyword => 
      title.includes(keyword) || 
      description.includes(keyword) || 
      content.includes(keyword)
    );
  });
}; 