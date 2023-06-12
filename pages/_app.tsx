import { SWRConfig } from 'swr'
import '../styles/globals.css'
import axiosClient from '../api-client/axios-client'
import { EmptyLayout } from '../components/layout'
import { AppPropsWithLayout } from '../models'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const Layout = Component.Layout ?? EmptyLayout
  return (
    <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}
export default MyApp
