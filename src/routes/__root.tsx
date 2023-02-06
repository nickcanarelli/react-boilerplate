import { Outlet, RootRoute } from '@tanstack/react-router'

export const rootRoute = new RootRoute({
  component: () => (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools position='bottom-right' /> */}
    </>
  ),
})
