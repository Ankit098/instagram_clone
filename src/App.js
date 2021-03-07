import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listener'
import UserContext from './context/user'
import './styles/app.css'

const Login = lazy(() => import('./pages/login'))
const SignUp = lazy(() => import('./pages/signup'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const NotFound = lazy(() => import('./pages/notFound'))

function App() {
  const { user } = useAuthListener()

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading....</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGNUP} component={SignUp} />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App
