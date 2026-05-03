import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DemocracyOS_Complete from './DemocracyOS_Complete.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DemocracyOS_Complete />
  </StrictMode>,
)
