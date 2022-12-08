import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ptBR } from 'date-fns/locale'
import { setDefaultOptions } from 'date-fns'

setDefaultOptions({ locale: ptBR })

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
