import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

import LOGO from '@assets/img/logo/logo.svg'
import { Notifications, Search } from '../_components'
import { Float } from '@headlessui-float/react'
import { Button } from '@components/core'

export const Navbar = () => {
  return (
    <Disclosure
      as='nav'
      className='bg-white dark:bg-neutral-800 transition-all duration-150 border-b border-gray-100 dark:border-neutral-700'
    >
      {({ open }) => (
        <>
          <div className='px-4'>
            <div className='flex justify-between h-14'>
              <div className='flex justify-start lg:w-0 lg:flex-1'>
                <div className='flex flex-shrink-0 items-center'>
                  <img className='block h-8 w-auto' src={LOGO} alt='Your Company' />
                </div>
                <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:gap-x-6 items-center'>
                  {navigation.map((item, itemIdx) =>
                    item.name.toLowerCase() === 'projects' ? (
                      <Popover as={Fragment} key={itemIdx}>
                        {({ open }) => (
                          <Float
                            as={Fragment}
                            show={open}
                            placement={'bottom-start'}
                            offset={-4}
                            flip={-4}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1 -translate-x-2'
                            enterTo='opacity-100 translate-y-0 -translate-x-2'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0 -translate-x-2'
                            leaveTo='opacity-0 translate-y-1 -translate-x-2'
                            arrow
                          >
                            <Popover.Button
                              className={clsx(
                                'group flex items-center justify-center lg:justify-start border-b-2 border-transparent text-sm font-medium transition-all duration-150 hover:border-gray-300 hover:text-neutral-600 ring-0 outline-none',
                                {
                                  'border-primary-100': item.current,
                                  'text-neutral-600': !item.current && open,
                                  'text-neutral-800 dark:text-white': !item.current && !open,
                                }
                              )}
                            >
                              <span>Projects</span>
                              <FontAwesomeIcon
                                icon={regular('chevron-down')}
                                className={clsx(
                                  open ? 'text-gray-600' : 'text-gray-400',
                                  'ml-1 h-3 w-3 group-hover:text-gray-500'
                                )}
                                aria-hidden='true'
                              />
                            </Popover.Button>

                            <Popover.Panel className='z-10 w-screen max-w-md lg:max-w-3xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-md shadow-lg focus:outline-none'>
                              <Float.Arrow className='absolute bg-white dark:bg-neutral-800 dark:border-neutral-700 -translate-x-4 w-5 h-5 rotate-45 border border-gray-200' />

                              <div className='relative h-full bg-white dark:bg-neutral-800 rounded-md flex flex-1'>
                                <div className='relative grid p-4 lg:grid-cols-1 min-w-[400px] w-full'>
                                  {solutions.map((item, itemIdx) => (
                                    <a
                                      key={itemIdx}
                                      href={item.href}
                                      className='flex items-start rounded-lg p-3 hover:bg-gray-50'
                                    >
                                      <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 text-white'>
                                        <FontAwesomeIcon
                                          icon={item.icon}
                                          className='h-4 w-4'
                                          aria-hidden='true'
                                        />
                                      </div>
                                      <div className='ml-3'>
                                        <p className='text-sm font-medium text-gray-900 mb-0'>
                                          {item.name}
                                        </p>
                                        <p className='text-xs text-gray-500'>{item.description}</p>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                                <div className='bg-gray-50 p-4 max-w-[300px] rounded-r-md dark:bg-neutral-700'>
                                  <div className='font-medium text-neutral-300 text-xs hidden lg:block'>
                                    Recently Viewed
                                  </div>
                                  <ul className='lg:mt-1 flex flex-col'>
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
                                          Q123-144 - Something about fixing something thats doesnt
                                          need fixed ...
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
                                          Q123-16 - Something about fixing something thats doesnt
                                          need fixed ...
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
                                          Q123-111 - Something about fixing something thats doesnt
                                          need fixed ...
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
                                          className={clsx('h-1.5 w-1.5 text-success')}
                                          aria-hidden='true'
                                        />
                                        <span className='hidden font-medium text-neutral-800 dark:text-white lg:block lg:truncate'>
                                          Q123-144 - Something about fixing something thats doesnt
                                          need fixed ...
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
                                          Q123-16 - Something about fixing something thats doesnt
                                          need fixed ...
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
                                          Q123-111 - Something about fixing something thats doesnt
                                          need fixed ...
                                        </span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Float>
                        )}
                      </Popover>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          'group flex items-center justify-center lg:justify-start border-b-2 border-transparent text-sm font-medium text-neutral-800 dark:text-white transition-all duration-150 hover:border-gray-300 hover:text-neutral-600',
                          {
                            'border-primary-100': item.current,
                          }
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    )
                  )}
                  <Button>
                    Create{' '}
                    <FontAwesomeIcon
                      icon={regular('plus')}
                      aria-hidden='true'
                      className='text-white'
                    />
                  </Button>
                </div>
              </div>
              <div className='flex items-center justify-center w-72'>
                <Search />
              </div>
              <div className='hidden items-center justify-end sm:flex sm:flex-1 lg:w-0 gap-x-6'>
                <Notifications />

                {/* Profile dropdown */}
                <Menu as='div' className='relative'>
                  <div>
                    <Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                      <span className='sr-only'>Open user menu</span>
                      <img className='h-8 w-8 rounded-full' src={user.imageUrl} alt='' />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={clsx(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <div className='-mr-2 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <FontAwesomeIcon
                      icon={regular('xmark')}
                      className='h-6 w-6'
                      aria-hidden='true'
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={regular('bars')}
                      className='h-6 w-6'
                      aria-hidden='true'
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 pt-2 pb-3'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={clsx(
                    item.current
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className='border-t border-gray-200 pt-4 pb-3'>
              <div className='flex items-center px-4'>
                <div className='flex-shrink-0'>
                  <img className='h-10 w-10 rounded-full' src={user.imageUrl} alt='' />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium text-gray-800'>{user.name}</div>
                  <div className='text-sm font-medium text-gray-500'>{user.email}</div>
                </div>
                <button
                  type='button'
                  className='ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  <span className='sr-only'>View notifications</span>
                  <FontAwesomeIcon icon={regular('bell')} className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>
              <div className='mt-3 space-y-1'>
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', icon: regular('grid-2'), current: true },
  { name: 'Projects', href: '#', icon: regular('square-kanban'), current: false },
  { name: 'Teams', href: '#', icon: regular('users'), current: false },
  { name: 'Reports', href: '#', icon: regular('chart-line-up'), current: false },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const solutions = [
  {
    name: 'Analytics',
    description: 'Software Product',
    href: '#',
    icon: regular('square-kanban'),
  },
  {
    name: 'Engagement',
    description: 'Software Product',
    href: '#',
    icon: regular('square-kanban'),
  },
  {
    name: 'Security',
    description: 'Software Product',
    href: '#',
    icon: regular('square-kanban'),
  },
  {
    name: 'Integrations',
    description: 'Software Product',
    href: '#',
    icon: regular('square-kanban'),
  },
  {
    name: 'Automations',
    description: 'Software Product',
    href: '#',
    icon: regular('square-kanban'),
  },
  {
    name: 'Reports',
    description: 'Software Product',
    href: '#',
    icon: regular('square-kanban'),
  },
]
