import { Route } from '@tanstack/react-router'
import { authLayoutRoute } from '..'

export const loginRoute = new Route({
  getParentRoute: () => authLayoutRoute,
  path: '/login',
  component: Login,
})

function Login() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  )
}
