import "../styles/globals.css";
import type { AppProps } from "next/app";

import Layout from "../components/Layout";
import AuthProvider from "../context/AuthenticationContext/AuthProvider";
import UserProvider from "../context/UserContext/UserProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp;
