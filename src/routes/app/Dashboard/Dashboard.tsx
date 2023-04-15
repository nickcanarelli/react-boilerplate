import { Route } from '@tanstack/react-router'
import { appLayoutRoute } from '@components/layout/app'

export const dashboardRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: '/dashboard',
  component: () => (
    <div>
      <h1 className='text-2xl font-bold'>Define & Hypothesize</h1>
      <p>Dashboard</p>
    </div>
  ),
})
