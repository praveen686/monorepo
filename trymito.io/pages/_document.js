/*
    This is a Custom Document. A custom Document is commonly used to 
    augment your application's <html> and <body> tags. This is necessary 
    because Next.js pages skip the definition of the surrounding document's markup.

    See full explanation here: https://nextjs.org/docs/advanced-features/custom-document
*/

import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
            {/* TODO: The favicon doesn't look too good, we should make some with the */}
            <link rel="icon" href="/favicons/favicon.ico" />

            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link
                rel="preload"
                href="/fonts/Graphik/GraphikRegular.otf"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/Graphik/GraphikMedium.otf"
                as="font"
                crossOrigin=""
            />
        </Head> 
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
