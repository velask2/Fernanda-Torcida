import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FernandaTorcida from './fernanda-torcida-portfolio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FernandaTorcida />
  </StrictMode>,
)
