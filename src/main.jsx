import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
//import App from './App.jsx'
import { createTheme, MantineProvider } from '@mantine/core';
import AppRoutes from './Routers/Routes.jsx';
import './index.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';







const theme = createTheme({});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <AppRoutes />
    </MantineProvider>
  </StrictMode>,
)
