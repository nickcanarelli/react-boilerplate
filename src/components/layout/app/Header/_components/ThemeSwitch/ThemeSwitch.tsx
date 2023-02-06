import { duotone } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Switch } from '@headlessui/react'
import { useDarkMode } from 'utils/hooks'
import clsx from 'clsx'

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useDarkMode()

  return (
    <div className='flex items-center gap-x-2 mb-4'>
      <FontAwesomeIcon
        icon={duotone('sun-bright')}
        className={clsx({
          'text-black/[.33]': isDark,
          'text-black': !isDark,
        })}
        aria-hidden='true'
      />
      <div>
        <Switch
          checked={isDark}
          onChange={setIsDark}
          className={`${
            isDark ? 'bg-primary-200' : 'bg-black/[.33]'
          } relative flex w-12 h-6 items-center rounded-full justify-center`}
        >
          <span className='sr-only'>Enable notifications</span>
          <span
            className={`${
              isDark ? 'translate-x-[0.75rem]' : '-translate-x-3'
            } inline-block h-5 w-5 transform rounded-full bg-black transition`}
          />
        </Switch>
      </div>
      <FontAwesomeIcon
        icon={duotone('moon-stars')}
        className={clsx({
          'text-black': isDark,
          'text-black/[.33]': !isDark,
        })}
        aria-hidden='true'
      />
    </div>
  )
}

export default ThemeSwitch
