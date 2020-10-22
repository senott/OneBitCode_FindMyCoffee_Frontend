import api from './api';
import { StoreProps } from './store';

interface RatingProps {
  value: number,
  opinion: string,
  user_name: string,
};



const RatingService = {
  create: (store: StoreProps, rating: RatingProps) => api.post('/ratings', { store: store, rating: rating })
}

export default RatingService;
