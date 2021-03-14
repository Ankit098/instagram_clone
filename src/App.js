import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listener'
import UserContext from './context/user'
import ProtectedRoutes from './helpers/protectedRoutes'
import IsUserLoggedIn from './helpers/isUserLoggedIn'
import './styles/app.css'

const Login = lazy(() => import('./pages/login'))
const SignUp = lazy(() => import('./pages/signup'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const Profile = lazy(() => import('./pages/profile'))
const NotFound = lazy(() => import('./pages/notFound'))

function App() {
  const { user } = useAuthListener()

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading....</p>}>
          <Switch>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGNUP}>
              <SignUp />
            </IsUserLoggedIn>
            <ProtectedRoutes user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoutes>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App
