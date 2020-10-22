import api from './api';

import { RatingProps } from './rating';

export interface StoreProps {
  latitude: number,
  longitude: number,
  name: string,
  address: string,
  google_place_id: string
  ratings_count?: number,
  ratings_average?: number,
  ratings?: RatingProps[]
}

const StoreService = {
  show: (google_place_id: string) => api.get<StoreProps>(`/stores/${google_place_id}`),
  index: (latitude: number, longitude: number) => api.get<StoreProps[]>('/stores', { params: { latitude: latitude, longitude: longitude } })
}

export default StoreService;
