
import { Jet } from './types';

export const FLEET: Jet[] = [
  {
    id: 'g650er',
    name: 'Gulfstream G650ER',
    category: 'Ultra Long Range',
    passengers: 19,
    range: '7,500 nm',
    speed: 'Mach 0.925',
    cabinHeight: '6 ft 5 in',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1200',
    description: 'The definitive gold standard of business aviation. A residence in the sky that transcends borders with quiet elegance.',
    hourlyRate: 15000
  },
  {
    id: 'global7500',
    name: 'Bombardier Global 7500',
    category: 'Ultra Long Range',
    passengers: 19,
    range: '7,700 nm',
    speed: 'Mach 0.925',
    cabinHeight: '6 ft 2 in',
    image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&q=80&w=1200',
    description: 'An architectural masterpiece featuring four distinct living spaces and a master suite for ultimate restoration.',
    hourlyRate: 16500
  },
  {
    id: 'citation-longitude',
    name: 'Cessna Citation Longitude',
    category: 'Super Midsize',
    passengers: 12,
    range: '3,500 nm',
    speed: '483 ktas',
    cabinHeight: '6 ft 0 in',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=1200',
    description: 'Refined performance meets unparalleled cabin quietness. The preferred choice for regional excellence.',
    hourlyRate: 8500
  },
  {
    id: 'phenom300e',
    name: 'Embraer Phenom 300E',
    category: 'Light',
    passengers: 9,
    range: '2,010 nm',
    speed: '464 ktas',
    cabinHeight: '4 ft 11 in',
    image: 'https://images.unsplash.com/photo-1626014303757-6ecbe42627ad?auto=format&fit=crop&q=80&w=1200',
    description: 'The epitome of light jet luxury. Intelligently designed for the modern executive who values time and style.',
    hourlyRate: 4500
  }
];

export const NAV_LINKS = [
  { label: 'The Collection', href: '#fleet' },
  { label: 'The Experience', href: '#services' },
  { label: 'The Attache', href: '#concierge' },
  { label: 'Contact', href: '#contact' }
];
