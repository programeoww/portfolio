import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Helmet } from "react-helmet";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Helmet
        htmlAttributes={{ lang: "en" }}
        title="Portfolio | @programeoww"
        meta={[
          {
            name: "description",
            content: "Portfolio of Hieu Ngo Minh",
          },
          {
            name: "keywords",
            content: "Portfolio, Hieu Ngo Minh, programeoww",
          },
          {
            name: "author",
            content: "@programeoww",
          },
          {
            name: "og:title",
            content: "Portfolio | @programeoww",
          },
          {
            name: "og:description",
            content: "Portfolio of Hieu Ngo Minh",
          },
          {
            name: "og:type",
            content: "website",
          },
          {
            name: "og:url",
            content: "https://programeoww.github.io/",
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}
