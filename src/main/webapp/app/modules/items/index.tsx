import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
// import Items from './items';
import ItemsAlt from 'app/modules/items/items-alt';

import ItemDetail from 'app/modules/items/item-detail';
import ItemDetailAlt from 'app/modules/items/item-detail-alt';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute exact path={`${match.url}/detail/:id`} component={ItemDetailAlt} />
    <ErrorBoundaryRoute exact path={`${match.url}/:slug`} component={ItemsAlt} />
    <ErrorBoundaryRoute exact path={match.url} component={ItemsAlt} />
  </div>
);

export default Routes;
