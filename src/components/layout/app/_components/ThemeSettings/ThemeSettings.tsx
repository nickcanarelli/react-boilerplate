import { duotone, regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, Disclosure, Listbox, Popover, Transition } from '@headlessui/react'
import React, { forwardRef, Fragment, useCallback, useMemo } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { darkModeAtom, showThemeSettingsAtom, themeSettingsAtom } from '../../_recoil/state'
import update from 'immutability-helper'
import { ChromePicker } from 'react-color'
import { useDarkMode } from 'utils/hooks'
import { Float } from '@headlessui-float/react'
import useClipboard from 'react-use-clipboard'
import clsx from 'clsx'

const orientations = [
  { name: 'Vertical', value: 'vertical' },
  { name: 'Horizontal', value: 'horizontal' },
]

const ThemeSettings = () => {
  const [showThemeSettings, setShowThemeSettings] = useRecoilState(showThemeSettingsAtom)
  const [themeSettings, setThemeSettings] = useRecoilState(themeSettingsAtom)
  const [isSettingsCopied, setSettingsCopied] = useClipboard(JSON.stringify(themeSettings), {
    successDuration: 1500,
  })
  const isDark = useRecoilValue(darkModeAtom)

  const { light, dark, orientation } = themeSettings

  const colors = useMemo(
    () => (!isDark ? Object.keys(light.colors.neutral) : Object.keys(dark.colors.neutral)),
    [dark.colors.neutral, isDark, light.colors.neutral]
  )

  return (
    <Transition.Root show={showThemeSettings} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setShowThemeSettings}>
        {/* <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child> */}

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-sm'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white dark:bg-neutral-800 py-6 shadow-xl'>
                    <div className='px-4 sm:px-6'>
                      <div className='flex items-center justify-between'>
                        <Dialog.Title className='text-xl font-bold text-neutral-800 dark:text-white flex items-center justify-start gap-x-3'>
                          Theme Settings
                          <span className='cursor-pointer' onClick={setSettingsCopied}>
                            <FontAwesomeIcon
                              icon={duotone('paste')}
                              aria-hidden='true'
                              className='text-neutral-200 h-4 w-4'
                            />
                          </span>
                        </Dialog.Title>
                        <button
                          type='button'
                          className='rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 flex items-center justify-center'
                          onClick={() => setShowThemeSettings(false)}
                        >
                          <span className='sr-only'>Close panel</span>
                          <FontAwesomeIcon
                            icon={solid('xmark')}
                            aria-hidden='true'
                            className='h-4 w-4'
                          />
                        </button>
                      </div>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                      {/* Replace with your content */}
                      <div className='absolute inset-0 px-4 sm:px-6'>
                        <div className='flex flex-col flex-1 gap-y-4'>
                          <Disclosure defaultOpen>
                            {({ open: disclosureOpen }) => (
                              /* Use the `open` state to conditionally change the direction of an icon. */
                              <>
                                <Disclosure.Button className='flex items-center justify-between py-2 font-medium border-b border-gray-200'>
                                  General{' '}
                                  <FontAwesomeIcon
                                    icon={regular('chevron-down')}
                                    aria-hidden='true'
                                    className={disclosureOpen ? 'rotate-180 transform' : ''}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel>
                                  {' '}
                                  <div className='flex items-center justify-between'>
                                    <span className='text-neutral-800 dark:text-white text-sm flex-1'>
                                      Layout Orientation:
                                    </span>
                                    <Orientation orientation={orientation} />
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>

                          <Disclosure defaultOpen>
                            {({ open }) => (
                              /* Use the `open` state to conditionally change the direction of an icon. */
                              <>
                                <Disclosure.Button className='flex items-center justify-between py-2 font-medium border-b border-gray-200'>
                                  Colors{' '}
                                  <FontAwesomeIcon
                                    icon={regular('chevron-down')}
                                    aria-hidden='true'
                                    className={open ? 'rotate-180 transform' : ''}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className='flex flex-col gap-y-2'>
                                  <div className='flex justify-between items-center'>
                                    <span className='text-neutral-800 dark:text-white text-sm'>
                                      --color-brand-primary:
                                    </span>
                                    <Popover>
                                      {({ open }) => (
                                        <Float
                                          as={Fragment}
                                          show={open}
                                          placement={'bottom-end'}
                                          offset={8}
                                          flip={8}
                                          leave='transition ease-in duration-100'
                                          leaveFrom='opacity-100'
                                          leaveTo='opacity-0'
                                        >
                                          <Popover.Button className='h-7 w-20 rounded-lg bg-primary-100' />
                                          <Popover.Panel>
                                            <ChromePicker
                                              color={
                                                !isDark
                                                  ? light.colors.primary[100]
                                                  : dark.colors.primary[100]
                                              }
                                              onChangeComplete={(color) =>
                                                setThemeSettings((prev) => {
                                                  return {
                                                    ...prev,
                                                    light: {
                                                      ...prev.light,
                                                      colors: {
                                                        ...prev.light.colors,
                                                        primary: {
                                                          ...prev.light.colors.primary,
                                                          100: color.hex,
                                                        },
                                                      },
                                                    },
                                                    dark: {
                                                      ...prev.dark,
                                                      colors: {
                                                        ...prev.dark.colors,
                                                        primary: {
                                                          ...prev.dark.colors.primary,
                                                          100: color.hex,
                                                        },
                                                      },
                                                    },
                                                  }
                                                })
                                              }
                                            />
                                          </Popover.Panel>
                                        </Float>
                                      )}
                                    </Popover>
                                  </div>
                                  {colors.map((color: string | number, colorIdx: any) => {
                                    return (
                                      <NeutralThemeColor
                                        key={!isDark ? `light-${colorIdx}` : `dark-${colorIdx}`}
                                        color={light.colors.neutral[color]}
                                        colorKey={String(color)}
                                      />
                                    )
                                  })}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const Orientation = ({ orientation }: { orientation: string }) => {
  const [themeSettings, setThemeSettings] = useRecoilState(themeSettingsAtom)

  const handleUpdateOrientation = (value: string) => {
    setThemeSettings((prev: any) => {
      const newOrientation = update(prev, {
        orientation: { $set: value },
      })
      return newOrientation
    })
  }

  return (
    <Listbox value={orientation} onChange={(value: string) => handleUpdateOrientation(value)}>
      {({ open: listboxOpen }) => (
        <Float
          as={Fragment}
          show={listboxOpen}
          placement={'bottom-end'}
          offset={8}
          flip={8}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Button className='relative cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-100 focus:outline-none focus:ring-0 sm:text-sm'>
            <span className='block truncate'>
              {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
            </span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <FontAwesomeIcon
                icon={regular('chevron-down')}
                aria-hidden='true'
                className='h-5 w-5 text-gray-400'
              />
            </span>
          </Listbox.Button>

          <Listbox.Options className='z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {orientations.map((item, itemIdx) => (
              <Listbox.Option
                key={item.name}
                value={item.value}
                className={({ active }) =>
                  clsx(
                    active ? 'text-white bg-primary-100' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-2 pr-9'
                  )
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
                    >
                      {item.name}
                    </span>

                    {selected ? (
                      <span
                        className={clsx(
                          active ? 'text-white' : 'text-primary-100',
                          'absolute inset-y-0 right-0 flex items-center pr-2'
                        )}
                      >
                        <FontAwesomeIcon
                          icon={regular('check')}
                          aria-hidden='true'
                          className='h-3 w-3'
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Float>
      )}
    </Listbox>
  )
}

const NeutralThemeColor = forwardRef<HTMLButtonElement, any>(
  ({ color, colorKey }: { color: string; colorKey: string }, ref) => {
    const setThemeSettings = useSetRecoilState(themeSettingsAtom)
    const [isDark] = useDarkMode()

    return (
      <div className='flex justify-between items-center'>
        <span className='text-neutral-800 dark:text-white text-sm'>
          --color-brand-neutral-{colorKey}:
        </span>
        <Popover>
          {({ open }) => (
            <Float
              as={Fragment}
              show={open}
              placement={'bottom-end'}
              offset={8}
              flip={8}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Popover.Button ref={ref} className={`h-7 w-20 rounded-lg bg-neutral-${colorKey}`} />
              <Popover.Panel>
                <ChromePicker
                  color={color}
                  onChangeComplete={(color) =>
                    setThemeSettings((prev) => {
                      return !isDark
                        ? {
                            ...prev,
                            light: {
                              ...prev.light,
                              colors: {
                                ...prev.light.colors,
                                neutral: {
                                  ...prev.light.colors.neutral,
                                  [colorKey]: color.hex,
                                },
                              },
                            },
                          }
                        : {
                            ...prev,
                            dark: {
                              ...prev.dark,
                              colors: {
                                ...prev.dark.colors,
                                neutral: {
                                  ...prev.dark.colors.neutral,
                                  [colorKey]: color.hex,
                                },
                              },
                            },
                          }
                    })
                  }
                />
              </Popover.Panel>
            </Float>
          )}
        </Popover>
      </div>
    )
  }
)

export default ThemeSettings
