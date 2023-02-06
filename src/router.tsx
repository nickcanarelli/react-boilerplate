import * as React from 'react'
import { ReactRouter } from '@tanstack/react-router'

import { rootRoute } from './routes/__root'
import { indexRoute } from './routes'
import { authLayoutRoute } from './routes/auth'
import { appLayoutRoute } from './routes/app'
import { loginRoute } from './routes/auth/Login/Login'
import { dashboardRoute } from './routes/app/Dashboard/Dashboard'

const routeTree = rootRoute.addChildren([
  indexRoute,
  authLayoutRoute.addChildren([loginRoute]),
  appLayoutRoute.addChildren([dashboardRoute]),
  // dashboardRoute.addChildren([
  //   dashboardIndexRoute,
  //   invoicesRoute.addChildren([invoicesIndexRoute, invoiceRoute]),
  //   usersRoute.addChildren([usersIndexRoute, userRoute]),
  // ]),
  // expensiveRoute,
  // authenticatedRoute.addChildren([authenticatedIndexRoute]),
  // layoutRoute.addChildren([layoutRouteA, layoutRouteB]),
])

export const router = new ReactRouter({
  routeTree,
  defaultPendingComponent: () => <div className={`p-2 text-2xl`}>...Loading ...</div>,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
