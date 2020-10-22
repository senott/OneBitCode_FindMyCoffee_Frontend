import React, { useCallback, useState } from 'react';
import ReactStar from 'react-stars';

import { EstablishmentProps } from '../../../../services/GoogleEstablishmentService';
import RatingService from '../../../../services/rating';
import { NewRating, Input, TextArea, Button } from './styles';

interface FormProps {
  place: EstablishmentProps;
  loadStore: () => any;
}

const Form: React.FC<FormProps> = ({ place, loadStore }) => {
  const [username, setUsername] = useState('');
  const [opinion, setOpinion] = useState('');
  const [rating, setRating] = useState(1);

  const handleFormSubmit = useCallback(
    async e => {
      e.preventDefault();

      if (place.geometry && place.formatted_address && place.place_id) {
        const store_params = {
          latitude: Number(place.geometry.location.lat),
          longitude: Number(place.geometry.location.lng),
          name: place.name,
          address: place.formatted_address,
          google_place_id: place.place_id,
        };

        const rating_params = {
          value: rating == null ? 1 : rating,
          opinion,
          user_name: username,
        };

        const response = await RatingService.create(
          store_params,
          rating_params,
        );

        console.log(response);

        loadStore();

        setUsername('');
        setOpinion('');
        setRating(1);
      }
    },
    [
      opinion,
      place.formatted_address,
      place.geometry,
      place.name,
      place.place_id,
      rating,
      username,
      loadStore,
    ],
  );

  return (
    <NewRating>
      <h4>Deixe sua opinião</h4>

      <form onSubmit={handleFormSubmit}>
        <Input
          name="username"
          type="text"
          className="input"
          placeholder="Seu primeiro nome"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />

        <TextArea
          name="opinion"
          className="textrea"
          placeholder="Sua opinião"
          onChange={e => setOpinion(e.target.value)}
          value={opinion}
        />

        <div>
          <ReactStar
            count={5}
            color2="#ffd700"
            size={24}
            value={rating}
            onChange={newRating => setRating(newRating)}
          />
          <Button type="submit" className="button is-danger">
            Enviar
          </Button>
        </div>
      </form>
    </NewRating>
  );
};

export default Form;
