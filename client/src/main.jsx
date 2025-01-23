import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import App from './App.jsx'
import CreatePartner from './CreatePartner.jsx'
import UpdatePartner from './UpdatePartner.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/create' element={<CreatePartner/>}/>
        <Route path='/update' element={<UpdatePartner/>}/>
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
