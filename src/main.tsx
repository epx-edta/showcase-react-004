import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./index.scss";
import { PageWelcome } from "./pages/PageWelcome.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { AppProvider } from "./AppContext.tsx";
import { PageCards1 } from "./pages/PageCards1.tsx";
import { PageCards2 } from "./pages/PageCards2.tsx";
import { PageGrid } from "./pages/PageGrid.tsx";
import { PageCards3 } from "./pages/PageCards3.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children: [
			{
				path: "/welcome",
				element: <PageWelcome />,
			},
			{
				path: "cards1",
				element: <PageCards1/>,
			},
			{
				path: "cards2",
				element: <PageCards2/>,
			},
			{
				path: "cards3",
				element: <PageCards3/>,
			},
			{
				path: "grid",
				element: <PageGrid/>,
			},
			{
				path: "/",
				element: <Navigate to="/welcome" replace />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>
);
