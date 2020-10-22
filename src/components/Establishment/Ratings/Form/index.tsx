import React, { useCallback, useState } from 'react';
import ReactStarRating from 'react-star-rating-component';

import { EstablishmentProps } from '../../../../services/GoogleEstablishmentService';
import RatingService from '../../../../services/rating';
import { NewRating, Input, TextArea, Button } from './styles';

interface FormProps {
  place: EstablishmentProps;
}

const Form: React.FC<FormProps> = props => {
  const [username, setUsername] = useState('');
  const [opinion, setOpinion] = useState('');
  const [rating, setRating] = useState(1);

  const handleFormSubmit = useCallback(
    async e => {
      e.preventDefault();

      if (
        props.place.geometry &&
        props.place.formatted_address &&
        props.place.place_id
      ) {
        const store_params = {
          latitude: props.place.geometry.location.lat,
          longitude: props.place.geometry.location.lng,
          name: props.place.name,
          address: props.place.formatted_address,
          google_place_id: props.place.place_id,
        };

        const rating_params = {
          value: rating == null ? 1 : rating,
          opinion,
          user_name: username,
        };

        await RatingService.create(store_params, rating_params);

        //props.loadStore;

        setUsername('');
        setOpinion('');
      }
    },
    [
      opinion,
      props.place.formatted_address,
      props.place.geometry,
      props.place.name,
      props.place.place_id,
      rating,
      username,
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
          <ReactStarRating name="rating" starCount={5} value={rating} />
          <Button type="submit" className="button is-danger">
            Enviar
          </Button>
        </div>
      </form>
    </NewRating>
  );
};

export default Form;
