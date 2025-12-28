
export interface CarModel {
  id: string;
  name: string;
  tagline: string;
  price: string;
  specs: {
    range: string;
    topSpeed: string;
    acceleration: string;
  };
  image: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
