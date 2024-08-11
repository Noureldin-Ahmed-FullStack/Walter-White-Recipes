import { Outlet } from 'react-router-dom'
import './Styles/Home.css'
import { createTheme, ThemeProvider } from '@mui/material'
import Navbar from './Components/Navbar'
import GlobalStates from './Components/GlobalState'

function App() {
  const { Theme } = GlobalStates()
  let theme = createTheme({
    palette: {
      mode: Theme,
    }
  })
  return (
    <div className={`w-100 flex-grow-1 d-flex flex-column ${Theme == 'light' ? "lightTheme-bg lightTheme-text" : "darkTheme-bg darkTheme-text"}`}>

      <ThemeProvider theme={theme}>
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </div>
  )
}

export default App
