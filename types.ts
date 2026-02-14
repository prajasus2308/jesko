
export interface Jet {
  id: string;
  name: string;
  category: 'Light' | 'Midsize' | 'Super Midsize' | 'Large' | 'Ultra Long Range';
  passengers: number;
  range: string;
  speed: string;
  cabinHeight: string;
  image: string;
  description: string;
  hourlyRate: number;
}

export interface BookingRequest {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  jetCategory?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
