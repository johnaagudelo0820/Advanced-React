import { ApolloProvider } from '@apollo/client'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import Router from 'next/router'
import Page from '../components/Page'
import { CartStateProvider } from '../lib/cartState'

import '../components/styles/nprogress.css'
import withData from '../lib/withData'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.shape({}),
  apollo: PropTypes.shape({}),
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  pageProps.query = ctx.query
  return { pageProps }
}

export default withData(MyApp)
