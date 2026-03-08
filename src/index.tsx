import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app.tsx';
import {Settings, AuthorizationStatus} from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App
        offersCount={Settings.OffersCount}
        authorizationStatus={AuthorizationStatus.NoAuth}
      />
    </BrowserRouter>
  </React.StrictMode>
);
