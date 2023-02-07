import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

const queClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
