import weatherForecast from '@/components/weather-forecast/weather-forecast';
import pageNotFoundComponent from '@/components/page-not-found/page-not-found';

export default [{
  path: '/weather-forecast',
  name: 'weather-forecast',
  component: weatherForecast,
}, {
  path: '/',
  redirect: { name: 'weather-forecast' },
}, {
  path: '*',
  component: pageNotFoundComponent,
}];
