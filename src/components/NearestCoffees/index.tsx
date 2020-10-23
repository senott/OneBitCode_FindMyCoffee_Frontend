import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

import StoreService, { StoreProps } from '../../services/store';
import { EstablishmentProps } from '../../services/GoogleEstablishmentService';

import {
  RightBar,
  Head,
  Body,
  Footer,
  EstablishmentItem,
  Title,
  Paragraph,
} from './styles';

interface NearestCoffeesProps {
  latitude: number;
  longitude: number;
  establishments: EstablishmentProps[];
  handleMarkerClick: (store: EstablishmentProps) => void;
}

const NearestCoffees: React.FC<NearestCoffeesProps> = ({
  latitude,
  longitude,
  establishments,
  handleMarkerClick,
}) => {
  const [stores, setStores] = useState<StoreProps[] | undefined>(undefined);

  useEffect(() => {
    StoreService.index(latitude, longitude).then(response =>
      setStores(response.data),
    );
  }, [latitude, longitude]);

  return (
    <RightBar>
      <Head>
        <h3>Find My Coffee</h3>
      </Head>

      <Body>
        <strong>Mais amados na região</strong>
        <hr />
        {stores &&
          stores.map(store => {
            const establishment = establishments.find(
              item => item.place_id === store.google_place_id,
            );
            return (
              <EstablishmentItem
                key={store.name}
                onClick={() => handleMarkerClick(establishment!)}
              >
                <Title>{store.name}</Title>
                <Paragraph>{store.address}</Paragraph>
                {store.ratings_count || 0} opiniões
                <ReactStars edit={false} value={store.ratings_average || 0} />
                <hr />
              </EstablishmentItem>
            );
          })}
      </Body>

      <Footer>
        <h2>OneBitCode.com</h2>
        <Paragraph>
          Projeto Open Source desenvolvido na Semana Super Full Stack da escola
          online de programação
        </Paragraph>
      </Footer>
    </RightBar>
  );
};

export default NearestCoffees;
