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
import { PageScroller } from "./pages/PageScroller.tsx";
import { PageImage1 } from "./pages/PageImage1.tsx";
import { PageExpand } from "./pages/PageExpand.tsx";
import { PageAnimatedCard } from "./pages/PageAnimatedCard";
import PageFlex001 from "./pages/PageFlex001";
import { PageExpandableText } from "./pages/PageExpandableText.tsx";
import { PageImageStack } from "./pages/PageImageStack.tsx";
import { PageImageViewer } from "./pages/PageImageViewer.tsx";
import { PageImageViewer2 } from "./pages/PageImageViewer2.tsx";

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
				path: "grid",
				element: <PageGrid/>,
			},
			{
				path: "scroller",
				element: <PageScroller/>,
			},
			{
				path: "image1",
				element: <PageImage1/>,
			},
			{
				path: "expand",
				element: <PageExpand/>,
			},
			{
				path: "animated-card",
				element: <PageAnimatedCard/>,
			},
			{
				path: "flex001",
				element: <PageFlex001/>,
			},
			{
				path: "expandable-text",
				element: <PageExpandableText/>,
			},
			{
				path: "image-stack",
				element: <PageImageStack/>
			},
			{
				path: "image-viewer",
				element: <PageImageViewer/>
			},
			{
				path: "image-viewer2",
				element: <PageImageViewer2/>
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
