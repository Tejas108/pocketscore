import { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=MuseoModerno"></link>
        <link href="https://fonts.googleapis.com/css2?family=MuseoModerno:ital,wght@0,400;1,300&display=swap" rel="stylesheet"></link>
        <script async src="https://www.googletagmanager.com/gtag/js?id=GTM-PN8G48X"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
