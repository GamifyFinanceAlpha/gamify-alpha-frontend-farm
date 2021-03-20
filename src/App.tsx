import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import GlobalStyle from './style/Global'
import ResetCSS from './style/ResetCSS'
import Menu from './components/Menu'
import Navigation from './components/Navigation'
import PageLoader from './components/PageLoader'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'style3.css'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
// const Pools = lazy(() => import('./views/Pools'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()

  return (
    <Router>
      <ResetCSS />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans|Quicksand" rel="stylesheet"/>
      <GlobalStyle />
      <Navigation />
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/tanks">
              <Farms tokenMode/>
            </Route>
            <Route path="/string">
              <Farms />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
    </Router>
  )
}

export default React.memo(App)
