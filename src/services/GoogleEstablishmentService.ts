import api from './api';

export interface EstablishmentProps extends google.maps.places.PlaceResult {
  photos: google.maps.places.PlaceResult['photos'] & {
    photo_reference: string,
  }[]
  opening_hours: google.maps.places.PlaceResult['opening_hours'] & {
    open_now: boolean,
  }[]
}

const GoogleEstablishmentService = {
  show: async (place_id: string): Promise<EstablishmentProps>  => {
    const response = await api.get(`/google_stores/${place_id}`);
    return response.data.result;
  }
}

export default GoogleEstablishmentService;
