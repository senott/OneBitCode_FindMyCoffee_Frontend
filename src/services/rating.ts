import api from './api';
import { StoreProps } from './store';

export interface RatingProps {
  value: number,
  opinion: string,
  user_name: string,
  date?: string,
};



const RatingService = {
  create: (store: StoreProps, rating: RatingProps) => api.post('/ratings', { store: store, rating: rating })
}

export default RatingService;
