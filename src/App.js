import React, { useEffect } from "react";
import { KeyringProvider, useKeyring } from "@w3ui/react-keyring";
import { UploaderProvider } from "@w3ui/react-uploader";
import {
  createHashRouter,
  RouterProvider,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Home from "./routes/Home";
import Upload from "./routes/Upload/Upload";
import { ProtectedRoute } from "./ProtectedRoute";
import Signin from "./routes/Signin";
import Dashboard from "./routes/Dashboard";
import Header from "./components/Header/Header.js";
import UploadNew from "./routes/Upload/UploadNew";
import UploadSuccess from "./routes/Upload/UploadSuccess";
import UploadError from "./routes/Upload/UploadError";
import Download from "./routes/Download";
import { UploadsListProvider } from "@w3ui/react-uploads-list";

function Index() {
  const [{ space }] = useKeyring();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is logged in, the default page should be the upload one.
    // But it should still be able to navigate to the user need
    if (space?.registered()) {
      navigate("/upload");
    }
  }, [space, navigate]);
  return <Home />;
}

function Root() {
  return (
    <>
      <Header
        navLinks={[
          {
            text: "Upload",
            to: "upload",
          },
          {
            text: "Your files",
            to: "dashboard",
          },
        ]}
      ></Header>
      <div className="ph3 ph5-ns">
        <Outlet />
      </div>
    </>
  );
}

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <div> Ups! Not found! Go back to homepage </div>,
      children: [
        {
          path: "/",
          element: <Index />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/download/:cid",
          element: <Download />,
        },
        {
          path: "/upload/",
          element: (
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <UploadNew /> },
            {
              path: "success/",
              element: <UploadSuccess />,
            },
            {
              path: "error/",
              element: <UploadError />,
            },
          ],
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <h1>404</h1>
        }
      ],
    },
  ],
  {
    basename:
      window.location === "https://web3-storage.github.io" ? "/file-space" : "",
  }
);

function App() {
  return (
    <KeyringProvider>
      <UploaderProvider>
        <UploadsListProvider>
          <AgentLoader>
            <RouterProvider router={router}></RouterProvider>
          </AgentLoader>
        </UploadsListProvider>
      </UploaderProvider>
    </KeyringProvider>
  );
}

function AgentLoader({ children }) {
  const [, { loadAgent }] = useKeyring();
  // eslint-disable-next-line
  useEffect(() => {
    loadAgent();
  }, [loadAgent]); // load agent - once.
  return children;
}

export default App;
