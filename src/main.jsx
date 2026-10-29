import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CampaignProvider } from './context/CampaignContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CampaignProvider>
      <App />
    </CampaignProvider>
  </React.StrictMode>
);

