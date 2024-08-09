import { Outlet } from 'react-router-dom'
import './Styles/Home.css'
import { useMyContext } from './Components/useMyContext'
import { createTheme, ThemeProvider } from '@mui/material'

function App() {
  const { Theme } = useMyContext()
  let theme = createTheme({
    palette: {
      mode: Theme,
    }
  })
  return (
    <div className={`w-100 flex-grow-1 d-flex flex-column ${Theme == 'light' ? "lightTheme-bg lightTheme-text" : "darkTheme-bg darkTheme-text"}`}>

      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </div>
  )
}

export default App
