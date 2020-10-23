import React, { useEffect, useState } from 'react';

import GoogleEstablishmentService, {
  EstablishmentProps,
} from '../../services/GoogleEstablishmentService';
import Ratings from './Ratings';

import { LeftBar, Title, Paragraph, Image } from './styles';

interface EstablishmentComponent {
  place: EstablishmentProps;
}

const Establishment: React.FC<EstablishmentComponent> = props => {
  const [establishment, setEstablishment] = useState<
    EstablishmentProps | undefined
  >(undefined);
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    try {
      GoogleEstablishmentService.show(props.place.place_id!).then(response => {
        setEstablishment(response);
      });
    } catch (error) {
      setEstablishment(undefined);
    }
  }, [props]);

  useEffect(() => {
    if (establishment?.photos) {
      if (establishment.photos[0] !== undefined) {
        const url = `https://maps.googleapis.com/maps/api/place/photo?maxheight=150&photoreference=${establishment.photos[0].photo_reference}&sensor=false&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
        setPhotoUrl(url);
      }
    }
  }, [establishment]);

  return (
    <LeftBar>
      {photoUrl ? (
        <Image src={photoUrl} alt="Coffee Shop Photo" />
      ) : (
        <Image src="/images/no_photo.jpg" alt="Coffee Shop without photo" />
      )}
      <Title>{establishment?.name}</Title>
      {establishment?.opening_hours ? (
        <div>
          {establishment.opening_hours.open_now === true ? 'Aberto' : 'Fechado'}
          <hr />
          {establishment.opening_hours.weekday_text.map((schedule, index) => {
            return <Paragraph key={index}>{schedule}</Paragraph>;
          })}
        </div>
      ) : (
        <Paragraph>
          'Não há informação sobre os dias e horários de abertura'
        </Paragraph>
      )}
      <hr />
      <Paragraph>{establishment?.formatted_address}</Paragraph>

      <Ratings place={props.place} />
    </LeftBar>
  );
};

export default Establishment;
