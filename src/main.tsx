import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./styles.css";
import { RootLayout, NotFoundPage, RouteErrorPage } from "./routes/root";
import { LandingPage } from "./routes/index";
import { SignInPage } from "./routes/auth";
import { SignUpPage } from "./routes/signup";
import { AuthenticatedLayout } from "./routes/AuthenticatedLayout";
import { DashboardPage } from "./routes/app";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/auth", element: <SignInPage /> },
      { path: "/signup", element: <SignUpPage /> },
      {
        element: <AuthenticatedLayout />,
        children: [{ path: "/app", element: <DashboardPage /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
