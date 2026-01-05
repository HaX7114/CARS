import { CarModel } from './types';

export const CARS: CarModel[] = [
  {
    id: 'tesla',
    name: 'Tesla',
    tagline: 'The Ultimate Electric Performance',
    price: 'From $89,900',
    specs: {
      range: '405 mi',
      topSpeed: '155 mph',
      acceleration: '3.1s'
    },
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'amg',
    name: 'AMG',
    tagline: 'Versatility Perfected',
    price: 'From $94,900',
    specs: {
      range: '348 mi',
      topSpeed: '155 mph',
      acceleration: '3.8s'
    },
    image: 'https://www.supercars.net/blog/wp-content/uploads/2024/10/2025-Mercedes-AMG-E53-Hybrid-001-2100-scaled.jpg'
  },
  {
    id: 'bmw-7',
    name: 'BMW 7',
    tagline: 'Performance Beyond Limits',
    price: 'From $119,900',
    specs: {
      range: '396 mi',
      topSpeed: '200 mph',
      acceleration: '1.99s'
    },
    image: 'https://media.drivingelectric.com/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1597781537/drivingelectric/2019-06/1-bmw-7-series-hybrid.jpg'
  }
];