import { duotone } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Switch } from '@headlessui/react'
import { useDarkMode } from 'utils/hooks'
import clsx from 'clsx'

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useDarkMode()

  return (
    <div className='flex items-center gap-x-2 px-4'>
      {/* <FontAwesomeIcon
        icon={duotone('sun-bright')}
        className={clsx({
          'text-black/[.33]': isDark,
          'text-black': !isDark,
        })}
        aria-hidden='true'
      /> */}
      <Switch
        checked={isDark}
        onChange={setIsDark}
        className='w-full'
        // className={`${
        //   isDark ? 'bg-primary-200' : 'bg-black/[.33]'
        // } relative flex w-full h-12 items-center rounded-lg justify-center`}
      >
        <span className='bg-gray-100 dark:bg-neutral-900 rounded-lg p-1 h-[76px] lg:h-10 w-full flex relative transition duration-150'>
          <span
            className={clsx(
              `block w-full h-1/2 lg:h-full lg:w-1/2 rounded-lg transition duration-150 ease-in-out transform bg-gray-200 dark:bg-neutral-700`,
              {
                'translate-y-full lg:translate-x-full lg:translate-y-0': isDark,
              }
            )}
          />
          <span className='absolute left-1 right-1 top-1 bottom-1 flex flex-col lg:flex-row justify-between'>
            <div
              className={clsx('flex flex-1 items-center justify-center gap-x-3 text-xs', {
                'text-neutral-800': !isDark,
                'text-neutral-200': isDark,
              })}
            >
              <FontAwesomeIcon
                icon={duotone('sun-bright')}
                className={clsx('h-4 w-4')}
                aria-hidden='true'
              />
              <span className='hidden font-medium lg:block'>Light</span>
            </div>
            <div
              className={clsx('flex flex-1 items-center justify-center gap-x-3 text-xs', {
                'text-white': isDark,
                'text-neutral-200': !isDark,
              })}
            >
              <FontAwesomeIcon
                icon={duotone('moon-stars')}
                className={clsx('h-4 w-4')}
                aria-hidden='true'
              />
              <span className='hidden font-medium lg:block'>Dark</span>
            </div>
          </span>
        </span>
        {/* <span className='bg-white dark:bg-neutral-900 rounded-lg p-1 h-[84px] lg:h-11 w-full flex relative'>
          <span
            className={clsx(
              `block h-full w-1/2 rounded-lg transition duration-150 ease-in-out transform bg-neutral-700`,
              {
                'translate-y-full lg:translate-x-full lg:translate-y-0': isDark,
              }
            )}
          />
          <span className='absolute left-1 right-1 top-1 bottom-1 flex flex-col justify-between'>
            <div
              className={clsx('flex flex-1 items-center justify-center gap-x-3 text-xs', {
                'text-white': !isDark,
                'text-neutral-200': isDark,
              })}
            >
              <FontAwesomeIcon
                icon={duotone('sun-bright')}
                className={clsx('h-5 w-5')}
                aria-hidden='true'
              />
              <span className='hidden lg:block'>Light</span>
            </div>
            <div
              className={clsx('flex flex-1 items-center justify-center gap-x-3 text-xs', {
                'text-white': isDark,
                'text-neutral-200': !isDark,
              })}
            >
              <FontAwesomeIcon
                icon={duotone('moon-stars')}
                className={clsx('h-5 w-5')}
                aria-hidden='true'
              />
              <span className='hidden lg:block'>Dark</span>
            </div>
          </span>
        </span> */}
        <span className='sr-only'>Dark Mode</span>
      </Switch>
    </div>
  )
}

export default ThemeSwitch
