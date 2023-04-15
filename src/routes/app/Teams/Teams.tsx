import { Outlet, Route } from '@tanstack/react-router'
import { appLayoutRoute } from '@components/layout/app'
import TeamsIndex from './Index/Index'
import Team from './Team/Team'

export const teamsRoute = new Route({
  getParentRoute: () => appLayoutRoute,
  path: '/teams',
  component: () => <Outlet />,
})

const teamsIndexRoute = new Route({
  getParentRoute: () => teamsRoute,
  path: '/',
  component: () => <TeamsIndex />,
})

const teamRoute = new Route({
  getParentRoute: () => teamsRoute,
  path: '$teamId',
  component: () => <Team />,
})

export const teamsRoutes = teamsRoute.addChildren([teamsIndexRoute, teamRoute])
