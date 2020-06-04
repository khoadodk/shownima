import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Main from './components/main/Main';
import Details from './components/content/details/Details';
import Error from './components/error/Error';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/:id/:name/details" component={Details} />
          <Route component={Error} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
