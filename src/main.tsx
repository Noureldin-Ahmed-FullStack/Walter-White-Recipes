import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CenteredPage from './CenteredPage.tsx';
import RecipeList from './RecipeList.tsx';
import NotFoundPage from './Components/NotFoundPage.tsx';
import MyContextProvider from './Components/ContextProvider.tsx';
import Test from './Test.tsx';
import RecipeDetails from './Components/RecipeDetails.tsx';
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <RecipeList /> },
      { path: "/walter-white-recipes", element: <RecipeList /> },
      { path: "/home", element: <RecipeList /> },
      { path: "/recipes", element: <RecipeList /> },
      { path: "/recipes/:RecipeId", element: <RecipeDetails /> },
      { path: "/test", element: <Test /> },
      { path: "*", element: <CenteredPage><NotFoundPage /></CenteredPage> },
    ]
  }
])
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

      <MyContextProvider>
        <RouterProvider router={router} />
      </MyContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
