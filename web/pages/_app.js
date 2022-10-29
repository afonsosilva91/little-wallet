import Layout from '../components/Layout/Layout'
import { SessionContextProvider } from '../context/SessionContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SessionContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}

export default MyApp
