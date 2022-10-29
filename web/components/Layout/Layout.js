import { Fragment } from 'react'
import Head from 'next/head'
import { DM_Sans } from '@next/font/google'
const dmSans = DM_Sans({
  weight: '400',
  variable: '--primary-font'
})

function Layout(props) {
    return (
        <Fragment>
            <Head>
                <title>Little Wallet</title>
                <meta name="description" content="Little Wallet for finance education on younger people (ETHLisbon Hackaton 2022)" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Header /> */}
            
            <main className={`page-wrapper px-8 ${dmSans.className}`}>{props.children}</main>
        </Fragment>
    )
}

export default Layout