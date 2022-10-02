import "../styles/globals.css";
import "../assets/css/App.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../stores/authStore";
import { userService } from "../services";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../containers/layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const [hasNoFocus, setHasNoFocus] = useState(true);

  const authCheck = (url: string) => {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login", "/register", "/"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  };

  // If the user hits the 'tab' key, we want to add outlines back to focused elements for accessibility.
  const handleTabKeyPress = (evt: KeyboardEvent) => {
    if (evt.key === "Tab") setHasNoFocus(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleTabKeyPress, false);
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // run auth check on route change
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      document.removeEventListener("keydown", handleTabKeyPress, false);
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
