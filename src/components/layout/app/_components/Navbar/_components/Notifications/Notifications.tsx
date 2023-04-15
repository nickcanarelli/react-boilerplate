import { light, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Float } from '@headlessui-float/react'
import { Popover, Tab } from '@headlessui/react'
import { randBoolean, randRecentDate } from '@ngneat/falso'
import clsx from 'clsx'
import { Fragment } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

const Notifications = () => {
  const unreadNotifications = notifications
    .filter((notification) => !notification.isRead)
    .sort((a, b) => Date.parse(String(b.date)) - Date.parse(String(a.date)))

  return (
    <Popover>
      {({ open }) => (
        <>
          <Float
            as={Fragment}
            show={open}
            placement={'bottom-end'}
            offset={16}
            flip={16}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1 translate-x-2'
            enterTo='opacity-100 translate-y-0 translate-x-2'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0 translate-x-2'
            leaveTo='opacity-0 translate-y-1 translate-x-2'
            arrow
          >
            <Popover.Button
              className={clsx(
                ' hover:text-gray-500 focus:outline-none focus:ring-0 flex items-center justify-center relative',
                {
                  'text-gray-500': open,
                  'text-gray-400': !open,
                }
              )}
            >
              <span className='sr-only'>View notifications</span>
              <FontAwesomeIcon icon={regular('bell')} className='h-4 w-4' aria-hidden='true' />

              {unreadNotifications.length > 0 ? (
                <span className='bg-error h-2 w-2 rounded-full absolute -left-[2px] top-0 ring-2 ring-white dark:ring-neutral-800' />
              ) : null}
            </Popover.Button>
            <Popover.Panel className='w-[400px] bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-md shadow-lg focus:outline-none'>
              <Float.Arrow className='absolute bg-white dark:bg-neutral-800 dark:border-neutral-700 -translate-x-2 w-5 h-5 rotate-45 border border-gray-200' />

              <div className='relative h-full bg-white dark:bg-neutral-800 rounded-md'>
                <Tab.Group>
                  <div className='flex flex-col border-b border-gray-100 dark:border-neutral-700'>
                    <div className='flex items-center justify-between p-4 pb-3'>
                      <div>Notifications</div>
                      <span className='text-primary-100 text-xs'>Mark all as read</span>
                    </div>

                    <Tab.List className='text-xs px-4 flex gap-x-2'>
                      {notificationTabs.map((tab, tabIdx) => (
                        <Tab as={Fragment} key={tabIdx}>
                          {({ selected }) => (
                            /* Use the `selected` state to conditionally style the selected tab. */
                            <button
                              className={clsx(
                                'px-1 pb-2 border-b-2 border-transparent flex items-center gap-x-1 font-bold outline-none ring-0',
                                {
                                  'border-primary-100 text-primary-100': selected,
                                  'text-gray-500 dark:text-neutral-300': !selected,
                                }
                              )}
                            >
                              {tab}{' '}
                              {tabIdx === 1 && unreadNotifications.length > 0 ? (
                                <span className='text-[8px] text-primary-100 py-[2px] px-2 rounded-full bg-indigo-100/50 dark:bg-primary-100 dark:text-white'>
                                  {unreadNotifications.length}
                                </span>
                              ) : null}
                            </button>
                          )}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels>
                    <Tab.Panel>
                      <ul className='max-h-[calc(100vh-200px)] overflow-y-auto'>
                        {notifications
                          .sort((a, b) => Date.parse(String(b.date)) - Date.parse(String(a.date)))
                          .map((notification, notificationIdx) => {
                            const { isRead, firstName, lastName, date, text } = notification

                            const initials = firstName[0].toUpperCase() + lastName[0].toUpperCase()

                            return (
                              <li
                                key={notificationIdx}
                                className={clsx('flex px-4 py-3 items-center', {
                                  'border-gray-200': isRead,
                                  'bg-blue-200/10 dark:bg-neutral-700': !isRead,
                                  'border-b border-gray-200 dark:border-neutral-600':
                                    notificationIdx !== notifications.length - 1,
                                  'border-b-0': notificationIdx === notifications.length - 1,
                                })}
                              >
                                <span className='shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 relative'>
                                  {!isRead ? (
                                    <span
                                      className={clsx(
                                        'absolute h-2 w-2 rounded-full bg-primary-100 top-0.5 left-0.5 ring-2 ring-white',
                                        {
                                          'dark:ring-neutral-700': !isRead,
                                          'dark:ring-neutral-800': isRead,
                                        }
                                      )}
                                    />
                                  ) : null}
                                  <span className='text-sm font-medium leading-none text-neutral-800'>
                                    {initials}
                                  </span>
                                </span>

                                <div className='flex min-w-0 flex-col ml-2'>
                                  <p className='text-sm font-medium text-gray-900 block truncate dark:text-white'>
                                    {notification.firstName +
                                      ' ' +
                                      notification.lastName +
                                      ' ' +
                                      text}
                                  </p>
                                  <p className='text-xs text-gray-500'>{dayjs(date).fromNow()}</p>
                                </div>
                              </li>
                            )
                          })}
                      </ul>
                      <button className='w-full py-2 text-xs border-t border-gray-100 text-gray-500 font-bold dark:border-neutral-700'>
                        View All
                      </button>
                    </Tab.Panel>
                    <Tab.Panel>
                      <ul className='max-h-[calc(100vh-200px)] overflow-y-auto'>
                        {unreadNotifications.map((notification, notificationIdx) => {
                          const { isRead, firstName, lastName, date, text } = notification

                          const initials = firstName[0].toUpperCase() + lastName[0].toUpperCase()

                          return (
                            <li
                              key={notificationIdx}
                              className={clsx('flex px-4 py-3 items-center ', {
                                'bg-blue-200/10 dark:bg-neutral-700': !isRead,
                                'border-b border-gray-200 dark:border-neutral-600':
                                  notificationIdx !== unreadNotifications.length - 1,
                                'border-b-0': notificationIdx === unreadNotifications.length - 1,
                              })}
                            >
                              <span className='shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 relative'>
                                {!isRead ? (
                                  <span className='absolute h-2 w-2 rounded-full bg-primary-100 top-0.5 left-0.5 ring-2 ring-white dark:ring-neutral-800' />
                                ) : null}
                                <span className='text-sm font-medium leading-none text-neutral-800'>
                                  {initials}
                                </span>
                              </span>

                              <div className='flex min-w-0 flex-col ml-2'>
                                <p className='text-sm font-medium text-gray-900 block truncate dark:text-white'>
                                  {notification.firstName +
                                    ' ' +
                                    notification.lastName +
                                    ' ' +
                                    text}
                                </p>
                                <p className='text-xs text-gray-500'>{dayjs(date).fromNow()}</p>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                      <button className='w-full py-2 text-xs border-t border-gray-100 text-gray-500 font-bold dark:border-neutral-700'>
                        View All
                      </button>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className='text-center w-8/12 mx-auto py-8 flex flex-col items-center gap-y-1'>
                        <FontAwesomeIcon
                          icon={light('bell-slash')}
                          className='h-10 w-10 text-gray-400'
                        />
                        <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
                          No notifications
                        </h3>
                        <p className='text-sm text-gray-500 dark:text-neutral-300'>
                          Get started by creating a new <a href='#'>project</a>,{' '}
                          <a href='#'>task</a>, or <a href='#'>manage your team</a>.
                        </p>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </Popover.Panel>
          </Float>
        </>
      )}
    </Popover>
  )
}

const notificationTabs = ['All', 'Unread', 'Empty']

const notifications = [
  {
    isRead: randBoolean(),
    firstName: 'Calvin',
    lastName: 'Hawkins',
    text: 'wants to edit Test Design System',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'Kristen',
    lastName: 'Ramos',
    text: 'added a file to Dark Mode',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'Ted',
    lastName: 'Fox',
    text: 'completed task Q123-144',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'Scott',
    lastName: 'Stewart',
    text: 'completed task Q123-144',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'William',
    lastName: 'McKinney',
    text: 'requested access to Test Design System',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'Scott',
    lastName: 'Stewart',
    text: 'completed task Q123-144',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'William',
    lastName: 'McKinney',
    text: 'requested access to Test Design System',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'Calvin',
    lastName: 'Hawkins',
    text: 'wants to edit Test Design System',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'Kristen',
    lastName: 'Ramos',
    text: 'added a file to Dark Mode',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'Ted',
    lastName: 'Fox',
    text: 'completed task Q123-144',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'Scott',
    lastName: 'Stewart',
    text: 'completed task Q123-144',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'William',
    lastName: 'McKinney',
    text: 'requested access to Test Design System',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'Scott',
    lastName: 'Stewart',
    text: 'completed task Q123-144',
    date: randRecentDate(),
  },
  {
    isRead: randBoolean(),
    firstName: 'William',
    lastName: 'McKinney',
    text: 'requested access to Test Design System',
    date: randRecentDate(),
  },
]

export default Notifications
