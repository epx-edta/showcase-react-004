import { useContext } from "react"
import { AppContext } from "../AppContext"

export const PageWelcome = () => {
	const { message } = useContext(AppContext);

	return (
		<>
		<p>{message}</p>
		<p className="mt-3">TODO:</p>
		<ul className="list-disc ml-6">
			<li>page with twmerge()</li>
			<li><a href="https://prismic.io/blog/css-scroll-effects" className="underline" target="_blank" rel="noreferrer">Implement scroll effects like in this Prismic blog post</a></li>
		</ul>
		
		</>
	)
}