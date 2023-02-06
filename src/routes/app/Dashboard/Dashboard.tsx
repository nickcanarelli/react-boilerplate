import { Route } from '@tanstack/react-router'
import { appLayoutRoute } from '..'

export const dashboardRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: '/dashboard',
  component: () => (
    <div>
      <h1>Dashboard</h1>
    </div>
  ),
})
