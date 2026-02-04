// @ts-nocheck
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  unstable_HistoryRouter as BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PageWrapper } from "./components/ui/page-wrapper";
import { routers } from "./configs/routers";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
// @ts-ignore
window._WEAPPS_HISTORY = history;

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter history={history}>
            <Routes>
              {/* Default root: go to configured home route */}
              <Route
                path="/"
                element={
                  <Navigate
                    to={`/${
                      routers.find((item) => item.isHome)?.id || routers[0].id
                    }`}
                    replace
                  />
                }
              />

              {/* Country entry shortcuts */}
              <Route path="/us" element={<Navigate to="/us/home" replace />} />
              <Route path="/cn" element={<Navigate to="/cn/home" replace />} />

              {/* Actual pages */}
              {routers.map((item) => {
                return (
                  <Route
                    key={item.id}
                    path={`/${item.id}`}
                    element={<PageWrapper id={item.id} Page={item.component} />}
                  />
                );
              })}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
