import { Header } from '@components/layout/app'
import { Outlet, Route } from '@tanstack/react-router'
import { rootRoute } from 'routes/__root'

export const appLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'appLayout',
  component: () => (
    // <div>
    //   <Header />
    //   <header>..APP..</header>
    //   <main>
    //     <Outlet />
    //   </main>
    //   <footer>...</footer>
    // </div>
    <>
      <div className='min-h-full'>
        <Header />

        <div className='py-10'>
          <header>
            <div className='px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold leading-tight tracking-tight text-gray-900'>
                Dashboard
              </h1>
            </div>
          </header>
          <main>
            <div className='sm:px-6 lg:px-8'>
              {/* Replace with your content */}
              <div className='px-4 py-8 sm:px-0'>
                <div className='h-96 rounded-lg border-4 border-dashed border-gray-200' />
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>
    </>
  ),
})
