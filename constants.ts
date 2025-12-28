
import { CarModel } from './types';

export const CARS: CarModel[] = [
  {
    id: 'model-alpha',
    name: 'Model Alpha',
    tagline: 'The Ultimate GT Performance',
    price: 'From $89,900',
    specs: {
      range: '405 mi',
      topSpeed: '155 mph',
      acceleration: '3.1s'
    },
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'model-sigma',
    name: 'Model Sigma',
    tagline: 'Versatility Perfected',
    price: 'From $94,900',
    specs: {
      range: '348 mi',
      topSpeed: '155 mph',
      acceleration: '3.8s'
    },
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'model-zenith',
    name: 'Model Zenith',
    tagline: 'Performance Beyond Limits',
    price: 'From $119,900',
    specs: {
      range: '396 mi',
      topSpeed: '200 mph',
      acceleration: '1.99s'
    },
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=2000'
  }
];
