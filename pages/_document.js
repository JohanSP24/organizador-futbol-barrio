import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="description" content="Aplicación para organizar partidos de fútbol en el barrio con IA" />
        <meta name="keywords" content="fútbol, deportes, organización, equipos, barrio, IA" />
        <meta name="author" content="Organizador de Fútbol" />
        
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#10b981" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Organizador Fútbol" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Organizador de Partidos de Fútbol" />
        <meta property="og:description" content="Gestiona jugadores, crea equipos balanceados y programa partidos con IA" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        
        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚽</text></svg>" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}