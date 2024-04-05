import React from 'react';
import {App} from "./App"
import rootReducer from './reducer/rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import Header from './Header/Header';
const store = configureStore({
  reducer : rootReducer
});


const root = createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store = {store}>
        <Header></Header>
        <App>

        </App>
      </Provider>
    </CookiesProvider>

  </React.StrictMode>
);

