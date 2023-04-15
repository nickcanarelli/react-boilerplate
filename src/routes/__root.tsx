import { ThemeSettings } from '@components/layout/app/_components'
import { showThemeSettingsAtom, themeSettingsAtom } from '@components/layout/app/_recoil/state'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Outlet, RootRoute } from '@tanstack/react-router'
import { useHotkeys } from 'react-hotkeys-hook'
import { useRecoilState, useRecoilValue } from 'recoil'
import { createGlobalStyle } from 'styled-components'
import { useDarkMode } from 'utils/hooks'
import { env } from '../environment'

interface ThemeProps {
  light: { [key: string]: any }
  dark: { [key: string]: any }
}

const GlobalStyle = createGlobalStyle`
  .light {
    --color-brand-primary: ${(props: ThemeProps) => props.light.colors.primary[100]};

    --color-brand-neutral-100: ${(props: ThemeProps) => props.light.colors.neutral[100]};
    --color-brand-neutral-200: ${(props: ThemeProps) => props.light.colors.neutral[200]};
    --color-brand-neutral-300: ${(props: ThemeProps) => props.light.colors.neutral[300]};
    --color-brand-neutral-400: ${(props: ThemeProps) => props.light.colors.neutral[400]};
    --color-brand-neutral-500: ${(props: ThemeProps) => props.light.colors.neutral[500]};
    --color-brand-neutral-600: ${(props: ThemeProps) => props.light.colors.neutral[600]};
    --color-brand-neutral-700: ${(props: ThemeProps) => props.light.colors.neutral[700]};
    --color-brand-neutral-800: ${(props: ThemeProps) => props.light.colors.neutral[800]};

    --color-brand-warning: ${(props: ThemeProps) => props.light.colors.states.warning};
    --color-brand-error: ${(props: ThemeProps) => props.light.colors.states.error};
    --color-brand-success: ${(props: ThemeProps) => props.light.colors.states.success};
  }
  .dark {
    --color-brand-primary: ${(props: ThemeProps) => props.dark.colors.primary[100]};

    --color-brand-neutral-100: ${(props: ThemeProps) => props.dark.colors.neutral[100]};
    --color-brand-neutral-200: ${(props: ThemeProps) => props.dark.colors.neutral[200]};
    --color-brand-neutral-300: ${(props: ThemeProps) => props.dark.colors.neutral[300]};
    --color-brand-neutral-400: ${(props: ThemeProps) => props.dark.colors.neutral[400]};
    --color-brand-neutral-500: ${(props: ThemeProps) => props.dark.colors.neutral[500]};
    --color-brand-neutral-600: ${(props: ThemeProps) => props.dark.colors.neutral[600]};
    --color-brand-neutral-700: ${(props: ThemeProps) => props.dark.colors.neutral[700]};
    --color-brand-neutral-800: ${(props: ThemeProps) => props.dark.colors.neutral[800]};
    --color-brand-neutral-900: ${(props: ThemeProps) => props.dark.colors.neutral[900]};

    --color-brand-warning: ${(props: ThemeProps) => props.light.colors.states.warning};
    --color-brand-error: ${(props: ThemeProps) => props.light.colors.states.error};
    --color-brand-success: ${(props: ThemeProps) => props.light.colors.states.success};
  }
`

export const rootRoute = new RootRoute({
  component: Root,
})

function Root() {
  const [showThemeSettings, setShowThemeSettings] = useRecoilState(showThemeSettingsAtom)
  const themeSettings = useRecoilValue(themeSettingsAtom)
  const { light, dark } = themeSettings

  // Call useDarkMode to keep current theme synced with localStorage
  const [isDark, setDarkMode] = useDarkMode()

  useHotkeys(`Meta+'`, () => {
    setDarkMode(!isDark)
  })

  const isDev = env.name === 'local'

  return (
    <>
      <GlobalStyle light={light} dark={dark} />
      <Outlet />
      {isDev && !showThemeSettings ? (
        <div
          className='absolute bottom-4 right-4 rounded-lg bg-white shadow-md h-10 w-10 flex items-center justify-center text-primary-100 cursor-pointer'
          onClick={() => setShowThemeSettings(true)}
        >
          <FontAwesomeIcon icon={solid('cog')} />
        </div>
      ) : null}
      <ThemeSettings />
      {/* <TanStackRouterDevtools position='bottom-right' /> */}
    </>
  )
}
