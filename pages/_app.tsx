import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { NavItem, NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import React from "react";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

const WEBSITE_NAME = "Ultra Music Practice"

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
];

function getPageTitle(route: string) {
  for (let item of NAV_ITEMS) {
    for (let child of item.children ?? []) {
      if (child.href === route) {
        return WEBSITE_NAME + ' - ' + child.label
      }
    }
  }
  return WEBSITE_NAME
}

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <PayPalScriptProvider options={{
      "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
    }}>
      <ChakraProvider>
        <Head>
          <title>{getPageTitle(router.route)}</title>
          <link rel="shortcut icon" href="/icon-64x64.png" />
        </Head>
        <NavBar
          title={WEBSITE_NAME}
          items={NAV_ITEMS}
          height={'60px'}
          rightButton={
            {
              text: 'Login'
            }
          }
        />
        <Box mt={'60px'}>
          <Component {...pageProps} />
          <Footer/>
        </Box>
      </ChakraProvider>
    </PayPalScriptProvider>
  )
}

export default MyApp
