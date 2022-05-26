import Layout from '../comps/Layout'
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={'2PFjVkvkWv1Nrt5GFWWAT1P1yPx8wjgmaiaWEl1c'}
      serverUrl={'https://dducvwrvinpy.usemoralis.com:2053/server'}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoralisProvider >

  )
}

export default MyApp
