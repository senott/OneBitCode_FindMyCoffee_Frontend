import React, { Fragment } from 'react';

import { EstablishmentProps } from '../../../services/GoogleEstablishmentService';
import Form from './Form';

interface RatingsComponent {
  place: EstablishmentProps;
}

const Ratings: React.FC<RatingsComponent> = props => {
  return (
    <Fragment>
      <Form place={props.place} />
    </Fragment>
  );
};

export default Ratings;
