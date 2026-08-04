import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ModalProvider } from './lib/ModalContext'
import { ConsultProvider } from './lib/ConsultContext'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <ConsultProvider>
          <App />
        </ConsultProvider>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
)
