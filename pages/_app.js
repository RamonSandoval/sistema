import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import { NotificationsProvider } from '@mantine/notifications';



function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  return(
    <>
    <NotificationsProvider position="top">
    <Component {...pageProps} />
    {/* <SessionProvider session={session}>
     
    </SessionProvider> */}
    </NotificationsProvider>
    </>
  ); 
}

export default MyApp
