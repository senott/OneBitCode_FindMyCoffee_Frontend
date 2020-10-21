import api from '../services/api';

interface IndexParams {
  latitude: string;
  longitude: string;
}

const GoogleListOfEstablishmentsService = {
  index: ({latitude, longitude}: IndexParams)  => {
    api.get(`/google_store?latitude=${latitude}&longitude=${longitude}`)
  }
}

export default GoogleListOfEstablishmentsService;
