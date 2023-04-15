import { showSearchModalAtom } from '@components/layout/app/_recoil/state'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useRecoilState } from 'recoil'

const Search = () => {
  const [showSearch, setShowSearch] = useRecoilState(showSearchModalAtom)
  const [rawQuery, setRawQuery] = useState('')

  const query = rawQuery.toLowerCase().replace(/^[#>@]/, '')

  const filteredProjects =
    rawQuery === '#'
      ? projects
      : query === '' || rawQuery.startsWith('>') || rawQuery.startsWith('@')
      ? []
      : projects.filter((project) => project.name.toLowerCase().includes(query))

  const filteredTasks =
    rawQuery === '>'
      ? tasks
      : query === '' || rawQuery.startsWith('#') || rawQuery.startsWith('@')
      ? []
      : tasks.filter((task) => task.name.toLowerCase().includes(query))

  const filteredUsers =
    rawQuery === '@'
      ? users
      : query === '' || rawQuery.startsWith('#') || rawQuery.startsWith('>')
      ? []
      : users.filter((user) => user.name.toLowerCase().includes(query))

  useHotkeys('Meta+k', () => {
    setShowSearch((prev) => !prev)
  })

  return (
    <>
      <div
        className='cursor-pointer w-full px-3 h-10 rounded-lg flex text-xs items-center justify-between lg:bg-gray-100 text-neutral-800 border border-transparent dark:hover:border-neutral-700 dark:lg:bg-neutral-900 dark:text-neutral-100 transition-all duration-150'
        onClick={() => setShowSearch(true)}
      >
        <div className='flex items-center justify-start flex-1'>
          <FontAwesomeIcon
            icon={regular('magnifying-glass')}
            aria-hidden='true'
            className='flex-shrink-0 h-4 w-4 dark:text-white'
          />{' '}
          <span className='hidden lg:block lg:truncate lg:ml-3'>Search ..</span>
        </div>
        <div className='flex gap-x-1'>
          <span className='hidden lg:flex h-6 px-2 bg-gray-200 dark:bg-neutral-700 rounded-lg items-center justify-center gap-x-1'>
            <FontAwesomeIcon
              icon={regular('command')}
              aria-hidden='true'
              className='flex-shrink-0 h-3 w-3 dark:text-neutral-200'
            />
            <FontAwesomeIcon
              icon={solid('k')}
              aria-hidden='true'
              className='flex-shrink-0 h-3 w-3 dark:text-neutral-200'
            />
          </span>
        </div>
      </div>
      <Transition.Root show={showSearch} as={Fragment} afterLeave={() => setRawQuery('')} appear>
        <Dialog as='div' className='relative z-10' onClose={setShowSearch}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all'>
                <Combobox onChange={(item: any) => (window.location = item.url)}>
                  <div className='relative'>
                    <FontAwesomeIcon
                      icon={regular('magnifying-glass')}
                      aria-hidden='true'
                      className='pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400'
                    />

                    <Combobox.Input
                      className='h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm'
                      placeholder='Search...'
                      onChange={(event) => setRawQuery(event.target.value)}
                    />
                  </div>

                  {(filteredProjects.length > 0 ||
                    filteredTasks.length > 0 ||
                    filteredUsers.length > 0) && (
                    <Combobox.Options
                      static
                      className='max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto pb-2'
                    >
                      {filteredProjects.length > 0 && (
                        <li>
                          <h2 className='bg-gray-100 dark:bg-neutral-200 py-2.5 px-4 text-xs font-semibold text-gray-900'>
                            Projects
                          </h2>
                          <ul className='mt-2 text-sm text-gray-700 mx-2'>
                            {filteredProjects.map((project) => (
                              <Combobox.Option
                                key={project.id}
                                value={project}
                                className={({ active }) =>
                                  clsx(
                                    'flex cursor-default select-none items-center px-2 py-2 rounded-md',
                                    active && 'bg-indigo-600 text-white'
                                  )
                                }
                              >
                                {({ active }) => (
                                  <>
                                    <FontAwesomeIcon
                                      icon={regular('folder')}
                                      aria-hidden='true'
                                      className={clsx(
                                        'h-6 w-6 flex-none',
                                        active ? 'text-white' : 'text-gray-400'
                                      )}
                                    />

                                    <span className='ml-3 flex-auto truncate'>{project.name}</span>
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}
                      {filteredTasks.length > 0 && (
                        <li>
                          <h2 className='bg-gray-100 dark:bg-neutral-200 py-2.5 px-4 text-xs font-semibold text-gray-900'>
                            Tasks
                          </h2>
                          <ul className='mt-2 text-sm text-gray-700 mx-2'>
                            {filteredTasks.map((task) => (
                              <Combobox.Option
                                key={task.id}
                                value={task}
                                className={({ active }) =>
                                  clsx(
                                    'flex cursor-default select-none items-center px-2 py-2 rounded-md',
                                    active && 'bg-indigo-600 text-white'
                                  )
                                }
                              >
                                {({ active }) => (
                                  <>
                                    <FontAwesomeIcon
                                      icon={regular('folder')}
                                      aria-hidden='true'
                                      className={clsx(
                                        'h-6 w-6 flex-none',
                                        active ? 'text-white' : 'text-gray-400'
                                      )}
                                    />

                                    <span className='ml-3 flex-auto truncate'>{task.name}</span>
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}
                      {filteredUsers.length > 0 && (
                        <li>
                          <h2 className='bg-gray-100 dark:bg-neutral-200 py-2.5 px-4 text-xs font-semibold text-gray-900'>
                            Users
                          </h2>
                          <ul className='mt-2 text-sm text-gray-700 mx-2'>
                            {filteredUsers.map((user) => (
                              <Combobox.Option
                                key={user.id}
                                value={user}
                                className={({ active }) =>
                                  clsx(
                                    'flex cursor-default select-none items-center px-2 py-2 rounded-md',
                                    active && 'bg-indigo-600 text-white'
                                  )
                                }
                              >
                                <img
                                  src={user.imageUrl}
                                  alt=''
                                  className='h-6 w-6 flex-none rounded-full'
                                />
                                <span className='ml-3 flex-auto truncate'>{user.name}</span>
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}
                    </Combobox.Options>
                  )}

                  {rawQuery === '?' && (
                    <div className='py-14 px-6 text-center text-sm sm:px-14'>
                      <FontAwesomeIcon
                        icon={regular('buoy')}
                        aria-hidden='true'
                        className='mx-auto h-6 w-6 text-gray-400'
                      />
                      <p className='mt-4 font-semibold text-gray-900'>Help with searching</p>
                      <p className='mt-2 text-gray-500'>
                        Use this tool to quickly search for users and projects across our entire
                        platform. You can also use the search modifiers found in the footer below to
                        limit the results to just users or projects.
                      </p>
                    </div>
                  )}

                  {query !== '' &&
                    rawQuery !== '?' &&
                    filteredProjects.length === 0 &&
                    filteredUsers.length === 0 && (
                      <div className='py-14 px-6 text-center text-sm sm:px-14'>
                        <FontAwesomeIcon
                          icon={regular('triangle-exclamation')}
                          aria-hidden='true'
                          className='mx-auto h-6 w-6 text-gray-400'
                        />

                        <p className='mt-4 font-semibold text-gray-900'>No results found</p>
                        <p className='mt-2 text-gray-500'>
                          We couldn’t find anything with that term. Please try again.
                        </p>
                      </div>
                    )}

                  {query === '' &&
                    filteredProjects.length === 0 &&
                    filteredTasks.length === 0 &&
                    filteredUsers.length === 0 && (
                      <div className='border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14'>
                        <FontAwesomeIcon
                          icon={regular('globe-americas')}
                          aria-hidden='true'
                          className='mx-auto h-6 w-6 text-gray-400'
                        />
                        <p className='mt-4 font-semibold text-gray-900'>
                          Search for clients and projects
                        </p>
                        <p className='mt-2 text-gray-500'>
                          Quickly access clients and projects by running a global search.
                        </p>
                      </div>
                    )}

                  <div className='flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700'>
                    Type{' '}
                    <kbd
                      className={clsx(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery.startsWith('#')
                          ? 'border-primary-100 text-primary-100'
                          : 'border-gray-400 text-gray-900'
                      )}
                    >
                      #
                    </kbd>{' '}
                    <span className='sm:hidden'>for projects,</span>
                    <span className='hidden sm:inline'>to access projects,</span>
                    <kbd
                      className={clsx(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery.startsWith('>')
                          ? 'border-primary-100 text-primary-100'
                          : 'border-gray-400 text-gray-900'
                      )}
                    >
                      &gt;
                    </kbd>{' '}
                    for tasks,
                    <kbd
                      className={clsx(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery.startsWith('@')
                          ? 'border-primary-100 text-primary-100'
                          : 'border-gray-400 text-gray-900'
                      )}
                    >
                      @
                    </kbd>{' '}
                    for users, and{' '}
                    <kbd
                      className={clsx(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery === '?'
                          ? 'border-primary-100 text-primary-100'
                          : 'border-gray-400 text-gray-900'
                      )}
                    >
                      ?
                    </kbd>{' '}
                    for help.
                  </div>
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

const projects = [
  { id: 1, name: 'Workflow Inc. / Website Redesign', category: 'Projects', url: '#' },
  // More projects...
]

const tasks = [
  { id: 1, name: 'Test Task / We Build Cool Shit', category: 'Tasks', url: '#' },
  // More projects...
]

const users = [
  {
    id: 1,
    name: 'Leslie Alexander',
    url: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More users...
]

export default Search
