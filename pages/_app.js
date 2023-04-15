import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import "../components/Template1/css/style.css"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session}>
      
        <Component {...pageProps} />
     
    </SessionProvider>
  );
}
