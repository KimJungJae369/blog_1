import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './HouseholdAccountBook/1. Header/Header'
import Article from './HouseholdAccountBook/2. Article/Article'
import { AppProvider } from './HouseholdAccountBook/2. Article/AppContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <Header />
      <Article />
    </AppProvider>
  </StrictMode>,
)
