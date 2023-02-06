import { Route, Outlet, Navigate, ReactRouter, useSearch, useParams } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { rootRoute } from './__root'

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

function Index() {
  const params = useParams()
  const search = useSearch()
  const isLoggedIn = false

  // if (!isLoggedIn) {
  //   return <Navigate to='login' search />
  // } else {
  //   return <Outlet />
  // }

  return <Outlet />
}
