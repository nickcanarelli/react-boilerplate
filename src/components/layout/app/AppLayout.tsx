import { duotone } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Outlet, Route } from '@tanstack/react-router'
import { HorizontalNavbar, VerticalNavbar } from './_components'
import { useRecoilValue } from 'recoil'
import { themeSettingsAtom } from './_recoil/state'
import { rootRoute } from 'routes/__root'

export const appLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'appLayout',
  component: () => <AppLayout />,
})

function AppLayout() {
  const themeSettings = useRecoilValue(themeSettingsAtom)
  const { orientation } = themeSettings

  return (
    <div className='min-h-full'>
      {orientation === 'horizontal' ? (
        <>
          <HorizontalNavbar />
          <div className='flex flex-1 flex-col md:pl-16 lg:pl-64'>
            <div className='sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden'>
              <button
                type='button'
                className='-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                // onClick={() => setSidebarOpen(true)}
              >
                <span className='sr-only'>Open sidebar</span>
                <FontAwesomeIcon icon={duotone('bars')} aria-hidden='true' />
              </button>
            </div>
            <main className='flex-1'>
              <div className='py-6'>
                <div className='px-4 sm:px-6 md:px-8'>
                  {/* Replace with your content */}
                  <div className='py-4'>
                    <Outlet />
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        <>
          <VerticalNavbar />
          <main>
            <Outlet />
          </main>
        </>
      )}
    </div>
  )
}
