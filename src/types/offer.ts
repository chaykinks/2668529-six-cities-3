type Offer = {
  id: number;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  goods: string[];
  bedrooms: number;
  maxAdults: number;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type {Offer};
