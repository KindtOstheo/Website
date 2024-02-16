import { GoogleTagManager } from "@next/third-parties/google";
import "../styles.scss";
import gtag from "../content/global/index.json"

const App = ({ Component, pageProps }) => {
  return(
    <>
      <Component {...pageProps} />
      <GoogleTagManager gtmId={gtag.gtag} />
    </>
)};

export default App;
