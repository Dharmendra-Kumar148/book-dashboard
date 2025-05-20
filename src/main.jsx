import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <App />
      <Toaster position="top-center" toastOptions={{
        success:{
          style:{
            background:'#4caf50',
            color:'white',
          },
        },
        error:{
          style:{
            background:'#f44336',
            color:'white',
          },
        },
        duration: 3000 
        }} 
      />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
