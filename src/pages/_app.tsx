import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ptBR } from 'date-fns/locale'
import { setDefaultOptions } from 'date-fns'
import { TasksProvider } from '../hooks/useTasks'

setDefaultOptions({ locale: ptBR })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TasksProvider>
      <Component {...pageProps} />
    </TasksProvider>
  )
}
