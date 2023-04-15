import * as React from 'react'
import { ReactRouter } from '@tanstack/react-router'

import { rootRoute } from './routes/__root'
import { indexRoute } from './routes'
import { authLayoutRoute } from './routes/auth'
import { appLayoutRoute } from '@components/layout/app'
import { appRoutes } from './routes/app'
import { loginRoute } from './routes/auth/Login/Login'

const routeTree = rootRoute.addChildren([
  indexRoute,
  authLayoutRoute.addChildren([loginRoute]),
  appLayoutRoute.addChildren(appRoutes),
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
