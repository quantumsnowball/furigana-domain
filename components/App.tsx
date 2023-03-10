import { store, persistor, RootState } from '../redux/store'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createTheme, styled, ThemeProvider } from '@mui/material'
import { CustomFC } from '../types'
import MenuBar from './MenuBar'
import Main from './Main'
import { CenterContent } from './styled/containers'
import { useCallback, useEffect } from 'react'
import chooseTheme from '../styles/theme'
import BottomBar from './BottomBar'


const defaultTheme = createTheme()

const FlexColumnDiv = styled(CenterContent('div'))`
  /* cover full viewport */
  position: fixed;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  /* theme */
  color: ${props => props.theme.palette.text.primary};
  background-color: ${props => props.theme.palette.background.default};
`

const App: CustomFC = ({ children }) => {
  return (
    <FlexColumnDiv id="app-ctn">
      <MenuBar />
      <Main> {children} </Main>
      <BottomBar />
    </FlexColumnDiv>
  )
}

const ThemeWrapper: CustomFC = ({ children }) => {
  const mode = useSelector((s: RootState) => s.theme.mode)
  const name = useSelector((s: RootState) => s.theme.name)
  const theme = useCallback(() => createTheme(chooseTheme(name)(mode)), [name, mode])

  useEffect(() => {
    document.body.style.backgroundColor = theme().palette.background.default
  }, [theme])

  return (
    <ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={theme}>
        <App> {children} </App>
      </ThemeProvider>
    </ThemeProvider>
  )
}

const ReduxWrapper: CustomFC = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeWrapper> {children} </ThemeWrapper>
      </PersistGate>
    </Provider>
  )
}

export default ReduxWrapper

