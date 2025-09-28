import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Configuración inicial de la aplicación
    console.log('⚽ Organizador de Fútbol - App iniciada correctamente')
  }, [])

  return <Component {...pageProps} />
}