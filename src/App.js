import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import Header from './components/header/Header';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      Hello from App
    </Provider>
  );
};

export default App;
