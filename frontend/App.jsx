import {AppProvider} from "@shopify/polaris"
import transication from "@shopify/polaris/locales/ja.json"
import {BrowserRouter} from "react-router-dom"
import Routes from "./Routes.jsx"
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from "react-query";

function App({children}) {
  const pages = import.meta.globEager("./pages/**/*.([jt]sx)");
  const client = new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  });
  return (
    <AppProvider i18n={transication}>
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <Routes pages={pages} />
        </QueryClientProvider>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
