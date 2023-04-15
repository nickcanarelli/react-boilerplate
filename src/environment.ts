export const env: Env = {
  name: process.env.TARGET_ENV!,
}

interface Env {
  name: string
}
