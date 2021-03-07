import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import * as ROUTES from './constants/routes'
import './styles/app.css'

const Login = lazy(() => import('./pages/login'))
const SignUp = lazy(() => import('./pages/signup'))
const NotFound = lazy(() => import('./pages/notFound'))

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading....</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGNUP} component={SignUp} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
