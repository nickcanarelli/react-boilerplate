import { atom } from 'recoil'

const defaultSettings = {
  orientation: 'vertical',
  light: {
    colors: {
      primary: {
        100: '#205de8',
      },
      neutral: {
        100: '#b5b7bd',
        200: '#a0a3a9',
        300: '#8a8e96',
        400: '#757982',
        500: '#62656d',
        600: '#474a4f',
        700: '#2d2e32',
        800: '#121314',
      },
      states: {
        warning: '#ffd874',
        error: '#f67991',
        success: '#5fdcb3',
      },
    },
  },
  dark: {
    colors: {
      primary: {
        100: '#205de8',
      },
      neutral: {
        100: '#a1b1ce',
        200: '#869ac0',
        300: '#6b84b3',
        400: '#546fa1',
        500: '#465c87',
        600: '#384a6c',
        700: '#2a3751',
        800: '#1c2536',
        900: '#192030',
      },
      states: {
        warning: '#ffd874',
        error: '#f67991',
        success: '#5fdcb3',
      },
    },
  },
}

////////////////////////////////
// THEME SETTINGS
////////////////////////////////
export const themeSettingsAtom = atom({
  key: 'themeSettings',
  default: defaultSettings as {
    orientation: 'vertical' | 'horizontal'
    light: { colors: { [key: string]: any } }
    dark: { colors: { [key: string]: any } }
  },
})

export const showThemeSettingsAtom = atom({
  key: 'showThemeSettings',
  default: false as boolean,
})

export const darkModeAtom = atom({
  key: 'darkMode',
  default: false as any,
})

////////////////////////////////
// GLOBAL SEARCH
////////////////////////////////
export const showSearchModalAtom = atom({
  key: 'showSearchModal',
  default: false as boolean,
})
