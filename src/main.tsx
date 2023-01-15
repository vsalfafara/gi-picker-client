import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './css/index.css'
import App from './App';
import { NotifcationProvider } from './context/NotifcationContext';
import Notiification from './components/Notification/Notiification';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotifcationProvider>
        <App />
        <Notiification />
      </NotifcationProvider>
    </BrowserRouter>
  </React.StrictMode>
)
