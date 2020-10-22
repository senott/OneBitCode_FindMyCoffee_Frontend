import api from './api';

import { EstablishmentProps } from './GoogleEstablishmentService'

interface IndexParams {
  latitude: Number;
  longitude: Number;
}

const GoogleListOfEstablishmentsService = {
  index: async ({ latitude, longitude }: IndexParams): Promise<EstablishmentProps[]>  => {
    const response = await api.get(`/google_stores?latitude=${latitude}&longitude=${longitude}`);
    return response.data.results;
  }
}

export default GoogleListOfEstablishmentsService;
