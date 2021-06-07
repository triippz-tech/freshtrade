import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { TranslatorContext } from 'react-jhipster';

import { AUTHORITIES } from 'app/config/constants';
import { PrivateRouteComponent, hasAnyAuthority } from './private-route';

const TestComp = () => <div>Test</div>;

describe('private-route component', () => {
  beforeAll(() => {
    TranslatorContext.registerTranslations('en', {});
  });

  // All tests will go here
  it('Should throw error when no component is provided', () => {
    const originalError = console.error;
    console.error = jest.fn();
    expect(() => render(<PrivateRouteComponent component={null} isAuthenticated sessionHasBeenFetched isAuthorized path="/" />)).toThrow(
      Error
    );
    console.error = originalError;
  });

  it('Should render an error message when the user has no authorities', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <PrivateRouteComponent component={TestComp} isAuthenticated sessionHasBeenFetched isAuthorized={false} path="/" />
      </Router>
    );
    expect(container.innerHTML).toEqual(
      '<div class="insufficient-authority"><div class="alert alert-danger"><span>You are not authorized to access this page.</span></div></div>'
    );
  });

  it('Should render a route for the component provided when authenticated', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <PrivateRouteComponent component={TestComp} isAuthenticated sessionHasBeenFetched isAuthorized path="/" />
      </Router>
    );
    expect(container.innerHTML).toEqual('<div>Test</div>');
  });

  it('Should render a redirect to login when not authenticated', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <PrivateRouteComponent exact component={TestComp} isAuthenticated={false} sessionHasBeenFetched isAuthorized path="/" />
      </Router>
    );
    expect(container.innerHTML).not.toEqual('<div>Test</div>');
  });
});

describe('hasAnyAuthority', () => {
  // All tests will go here
  it('Should return false when authorities is invalid', () => {
    expect(hasAnyAuthority(undefined, undefined)).toEqual(false);
    expect(hasAnyAuthority(null, [])).toEqual(false);
    expect(hasAnyAuthority([], [])).toEqual(false);
    expect(hasAnyAuthority([], [AUTHORITIES.BUYER])).toEqual(false);
  });

  it('Should return true when authorities is valid and hasAnyAuthorities is empty', () => {
    expect(hasAnyAuthority([AUTHORITIES.BUYER], [])).toEqual(true);
  });

  it('Should return true when authorities is valid and hasAnyAuthorities contains an authority', () => {
    expect(hasAnyAuthority([AUTHORITIES.BUYER], [AUTHORITIES.BUYER])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.BUYER, AUTHORITIES.ADMIN], [AUTHORITIES.BUYER])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.BUYER, AUTHORITIES.ADMIN], [AUTHORITIES.BUYER, AUTHORITIES.ADMIN])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.BUYER, AUTHORITIES.ADMIN], [AUTHORITIES.BUYER, 'ROLEADMIN'])).toEqual(true);
    expect(hasAnyAuthority([AUTHORITIES.BUYER, AUTHORITIES.ADMIN], [AUTHORITIES.ADMIN])).toEqual(true);
  });

  it('Should return false when authorities is valid and hasAnyAuthorities does not contain an authority', () => {
    expect(hasAnyAuthority([AUTHORITIES.BUYER], [AUTHORITIES.ADMIN])).toEqual(false);
    expect(hasAnyAuthority([AUTHORITIES.BUYER, AUTHORITIES.ADMIN], ['ROLE_BUYER'])).toEqual(false);
    expect(hasAnyAuthority([AUTHORITIES.BUYER, AUTHORITIES.ADMIN], ['ROLEUSER', 'ROLEADMIN'])).toEqual(false);
  });
});
