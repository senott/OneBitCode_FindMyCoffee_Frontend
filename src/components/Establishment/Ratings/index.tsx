import React, { Fragment, useCallback, useEffect, useState } from 'react';
import ReactStar from 'react-stars';

import { EstablishmentProps } from '../../../services/GoogleEstablishmentService';
import Form from './Form';
import StoreService, { StoreProps } from '../../../services/store';
import ReactStars from 'react-stars';

interface RatingsComponent {
  place: EstablishmentProps;
}

const Ratings: React.FC<RatingsComponent> = ({ place }) => {
  const [store, setStore] = useState<StoreProps | undefined>(undefined);

  const loadStore = useCallback(() => {
    try {
      setStore(undefined);
      if (place.place_id) {
        StoreService.show(place.place_id).then(response => {
          setStore(response.data);
        });
      }
    } catch (error) {
      setStore(undefined);
    }
  }, [place]);

  useEffect(() => {
    loadStore();
  }, [loadStore]);

  return (
    <Fragment>
      <h4>
        {store?.ratings_count || 0} opiniões
        {store?.ratings_average && (
          <ReactStar edit={false} value={store?.ratings_average || 0} />
        )}
      </h4>
      <hr />
      {store?.ratings && (
        <div>
          {store.ratings.map((rating, index) => {
            return (
              <div key={index}>
                <strong>{rating.user_name}</strong>
                <ReactStars edit={false} value={rating.value} />
                <p>{rating.opinion}</p>
                <p>{rating.date}</p>
                <hr />
              </div>
            );
          })}
        </div>
      )}
      <Form place={place} loadStore={loadStore} />
    </Fragment>
  );
};

export default Ratings;
