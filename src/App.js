import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './components/header/Header';
import Main from './components/main/Main';
import Details from './components/content/details/Details';
import ErrorBoundary from './components/error/ErrorBoundary';
import { appRoutes } from './redux/actions/routes';

const App = (props) => {
  const { appRoutes } = props;
  const routes = [
    {
      id: 1,
      path: '/',
      component: Main
    },
    {
      id: 2,
      path: '/:id/details',
      component: Details
    }
  ];

  useEffect(() => {
    appRoutes(routes);
    // eslint-disable-next-line
  }, [routes]);

  return (
    <Router>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.id}
            exact
            path={route.path}
            component={route.component}
            {...props}
          />
        ))}
      </Switch>
    </Router>
  );
};

App.propTypes = {
  appRoutes: PropTypes.func.isRequired
};

export default connect(null, { appRoutes })(App);
