import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Silk Satin Evening Gown',
    price: 890000,
    description: 'A masterpiece of minimalism. This floor-length gown is crafted from the finest Italian silk satin, featuring a delicate cowl neck and an open back for a sophisticated silhouette.',
    category: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    details: {
      fabric: '100% Italian Silk Satin',
      care: 'Dry clean only',
      fit: 'True to size, slim fit'
    }
  },
  {
    id: '2',
    name: 'Structured Wool Blazer',
    price: 650000,
    description: 'The quintessential power piece. Our structured blazer features sharp shoulders, a cinched waist, and premium wool construction that transitions seamlessly from day to night.',
    category: 'Outerwear',
    images: [
      'https://images.unsplash.com/photo-1515347619152-14588c75c808?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    details: {
      fabric: '90% Virgin Wool, 10% Cashmere',
      care: 'Professional dry clean',
      fit: 'Tailored fit'
    }
  },
  {
    id: '3',
    name: 'Cashmere Knit Top',
    price: 320000,
    description: 'Unparalleled softness. This lightweight cashmere knit top offers a second-skin feel with a refined ribbed texture and a classic crew neckline.',
    category: 'Tops',
    images: [
      'https://images.unsplash.com/photo-1550614000-4b95d415dc1c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    details: {
      fabric: '100% Grade A Cashmere',
      care: 'Hand wash cold or dry clean',
      fit: 'Relaxed fit'
    }
  },
  {
    id: '4',
    name: 'Wide-Leg Tailored Trousers',
    price: 420000,
    description: 'Modern sophistication. These high-waisted trousers feature a dramatic wide-leg silhouette, precise pleating, and a fluid drape that elongates the frame.',
    category: 'Bottoms',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    details: {
      fabric: '70% Wool, 30% Silk',
      care: 'Dry clean only',
      fit: 'High-waisted, wide-leg'
    }
  },
  {
    id: '5',
    name: 'Oversized Cashmere Coat',
    price: 1250000,
    description: 'A winter essential. This oversized coat is crafted from double-faced cashmere, featuring dropped shoulders and a sweeping length for dramatic effect.',
    category: 'Outerwear',
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M'],
    details: { fabric: '100% Cashmere', care: 'Dry clean only', fit: 'Oversized fit' }
  },
  {
    id: '6',
    name: 'Pleated Midi Skirt',
    price: 280000,
    description: 'Fluid movement. A meticulously knife-pleated midi skirt that creates a beautiful silhouette with every step.',
    category: 'Bottoms',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    details: { fabric: '100% Polyester', care: 'Dry clean', fit: 'True to size' }
  },
  {
    id: '7',
    name: 'Ribbed Knit Dress',
    price: 450000,
    description: 'Effortless elegance. A form-fitting ribbed knit dress that contours the body while providing ultimate comfort.',
    category: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    details: { fabric: '80% Viscose, 20% Nylon', care: 'Hand wash cold', fit: 'Bodycon' }
  },
  {
    id: '8',
    name: 'Silk Camisole',
    price: 180000,
    description: 'The perfect foundation. A bias-cut silk camisole with delicate straps and a soft v-neckline.',
    category: 'Tops',
    images: [
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524041255072-7da0525d6b34?q=80&w=800&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    details: { fabric: '100% Mulberry Silk', care: 'Hand wash cold', fit: 'Relaxed fit' }
  }
];
