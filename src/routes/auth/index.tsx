import { Outlet, Route } from '@tanstack/react-router'
import { rootRoute } from 'routes/__root'

export const authLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'authLayout',
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div>
      <header>..AUTH..</header>
      <main>
        <Outlet />
      </main>
      <footer>...</footer>
    </div>
  )
}
