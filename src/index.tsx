import './index.css'
import App from './App'
// import reportWebVitals from './reportWebVitals'

import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { randUuid } from '@ngneat/falso'
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <RecoilRoot key={randUuid()}>
    <App />
  </RecoilRoot>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// if (process.env.TARGET_ENV === 'local') {
//   reportWebVitals(console.log)
// }
