import { AuthProvider } from './auth'
import { AppRouter } from './router'

export function HeroesApp() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
