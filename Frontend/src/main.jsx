import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import {Provider} from "./Context/provider.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <Provider>
    <App />
  </Provider>
  </BrowserRouter>
  </StrictMode>,
)
