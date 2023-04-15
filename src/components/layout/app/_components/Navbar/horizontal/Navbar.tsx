import { duotone, regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ThemeSwitch, Search } from '../_components'
import clsx from 'clsx'

import LOGO from '@assets/img/logo/logo.svg'

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='relative z-40 md:hidden' onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>

          <div className='fixed inset-0 z-40 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-white'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 -mr-12 pt-2'>
                    <button
                      type='button'
                      className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <FontAwesomeIcon icon={duotone('xmark')} aria-hidden='true' />
                    </button>
                  </div>
                </Transition.Child>
                <div className='h-0 flex-1 overflow-y-auto pt-5 pb-4'>
                  <div className='flex flex-shrink-0 items-center px-4'>
                    <img
                      className='h-8 w-auto'
                      src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                      alt='Your Company'
                    />
                  </div>
                  <nav className='mt-5 space-y-1 px-2'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={clsx(
                            item.current
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className='flex flex-shrink-0 border-t border-gray-200 p-4'>
                  <a href='#' className='group block flex-shrink-0'>
                    <div className='flex items-center'>
                      <div>
                        <img
                          className='inline-block h-10 w-10 rounded-full'
                          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                          alt=''
                        />
                      </div>
                      <div className='ml-3'>
                        <p className='text-base font-medium text-gray-700 group-hover:text-gray-900'>
                          Tom Cook
                        </p>
                        <p className='text-sm font-medium text-gray-500 group-hover:text-gray-700'>
                          View profile
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className='w-14 flex-shrink-0'>
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='hidden md:fixed md:inset-y-0 md:flex md:w-18 lg:w-64 md:flex-col transition-all duration-150'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className='flex min-h-0 flex-1 flex-col bg-white dark:bg-neutral-800 transition-all duration-150'>
          <div className='flex flex-1 flex-col overflow-y-auto py-4 gap-y-4'>
            <div className='flex flex-shrink-0 items-center px-4'>
              <img className='h-8 w-auto fill-primary-100' src={LOGO} alt='Your Company' />
            </div>
            <div className='px-4'>
              <Search />
            </div>

            <nav className='flex-1 flex flex-col gap-y-1 px-4'>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'group flex items-center justify-center lg:justify-start px-3 h-10 text-xs font-medium rounded-lg dark:text-white transition-all duration-150 hover:bg-gray-100 dark:hover:bg-neutral-700',
                    {
                      'dark:bg-neutral-700 bg-gray-100': item.current,
                    }
                  )}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={clsx('flex flex-shrink-0 h-4 w-4 text-neutral-800 dark:text-white')}
                    aria-hidden='true'
                  />
                  <span className='hidden text-neutral-800 dark:text-white lg:block lg:truncate lg:ml-3'>
                    {item.name}
                  </span>
                </a>
              ))}
              <div className='flex h-[1px] w-full bg-gray-100 dark:bg-neutral-600 my-1' />
              {siteHelpers.map((item, itemIdx) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'group flex items-center justify-center lg:justify-start px-3 h-10 text-xs font-medium rounded-lg dark:text-white transition-all duration-150 hover:bg-gray-100 dark:hover:bg-neutral-700',
                    {
                      'dark:bg-neutral-700 bg-gray-100': item.current,
                    }
                  )}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={clsx('flex flex-shrink-0 h-4 w-4 text-neutral-800 dark:text-white')}
                    aria-hidden='true'
                  />
                  <span className='hidden text-neutral-800 dark:text-white lg:block lg:truncate lg:ml-3'>
                    {item.name}
                  </span>
                </a>
              ))}
            </nav>
          </div>
          <div className='flex flex-col gap-y-4 pt-1'>
            <div className='px-4'>
              <div className='font-medium text-neutral-300 text-xs hidden lg:block'>
                Recently Viewed
              </div>
              <ul className='lg:mt-1 flex flex-col lg:pl-3'>
                <li className='h-10 flex items-center'>
                  <a
                    href='#'
                    className='text-xs flex gap-x-3 min-w-0 justify-center lg:justify-start items-center dark:hover:text-white/80 w-full h-full'
                  >
                    <FontAwesomeIcon
                      icon={solid('circle')}
                      className={clsx('h-1.5 w-1.5 text-success')}
                      aria-hidden='true'
                    />
                    <span className='hidden font-medium text-neutral-800 dark:text-white lg:block lg:truncate'>
                      Q123-144 - Something about fixing something thats doesnt need fixed ...
                    </span>
                  </a>
                </li>
                <li className='h-10 flex items-center'>
                  <a
                    href='#'
                    className='text-xs flex gap-x-3 min-w-0 justify-center lg:justify-start items-center dark:hover:text-white/80 w-full h-full'
                  >
                    <FontAwesomeIcon
                      icon={solid('circle')}
                      className={clsx('h-1.5 w-1.5 text-warning')}
                      aria-hidden='true'
                    />
                    <span className='hidden font-medium text-neutral-800 dark:text-white lg:block lg:truncate'>
                      Q123-16 - Something about fixing something thats doesnt need fixed ...
                    </span>
                  </a>
                </li>
                <li className='h-10 flex items-center'>
                  <a
                    href='#'
                    className='text-xs flex gap-x-3 min-w-0 justify-center lg:justify-start items-center dark:hover:text-white/80 w-full h-full'
                  >
                    <FontAwesomeIcon
                      icon={solid('circle')}
                      className={clsx('h-1.5 w-1.5 text-warning')}
                      aria-hidden='true'
                    />
                    <span className='hidden font-medium text-neutral-800 dark:text-white lg:block lg:truncate'>
                      Q123-111 - Something about fixing something thats doesnt need fixed ...
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <ThemeSwitch />
            <div className='flex flex-shrink-0 p-4'>
              <div className='group flex w-full flex-shrink-0'>
                <div className='flex items-center justify-center lg:justify-start flex-1'>
                  <img
                    className='inline-block w-9 h-9 lg:h-10 lg:w-10 rounded-full shrink-0'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                  <div className='ml-3 hidden lg:flex flex-col truncate pr-3'>
                    <p className='text-xs font-medium text-gray-700 group-hover:text-gray-900 dark:text-white dark:group-hover:text-white'>
                      Nick Canarelli
                    </p>
                    <p className='block truncate text-xs font-medium text-gray-500 group-hover:text-gray-700 dark:text-neutral-200 dark:group-hover:text-neutral-200'>
                      nick@nickcanarelli.com
                    </p>
                  </div>
                </div>
                <span className='shrink-0 items-center justify-center dark:text-white hidden lg:flex'>
                  <FontAwesomeIcon
                    icon={regular('arrow-right-from-bracket')}
                    className='flex-shrink-0 h-4 w-4 rotate-180'
                    aria-hidden='true'
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const navigation = [
  { name: 'Dashboard', href: '#', icon: regular('grid-2'), current: true },
  { name: 'Projects', href: '#', icon: regular('square-kanban'), current: false },
  { name: 'Team', href: '#', icon: regular('users'), current: false },
  { name: 'Reports', href: '#', icon: regular('chart-line-up'), current: false },
]

const siteHelpers = [
  { name: 'Help', href: '#', icon: regular('life-ring'), current: false },
  { name: 'Report', href: '#', icon: regular('bullhorn'), current: false },
]
