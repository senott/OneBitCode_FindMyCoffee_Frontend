import api from './api';

interface IndexParams {
  latitude: Number;
  longitude: Number;
}

export interface CoffeeShop {
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const GoogleListOfEstablishmentsService = {
  index: async ({ latitude, longitude }: IndexParams): Promise<CoffeeShop[]>  => {
    const response = await api.get(`/google_stores?latitude=${latitude}&longitude=${longitude}`);
    return response.data.results;
  }
}

export default GoogleListOfEstablishmentsService;
