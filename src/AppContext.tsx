import { createContext, useState } from "react";

interface IAppContext {
	message: string
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [message] = useState("This site is an environment to test out React features before they are implemented in other projects.");

	return (
		<AppContext.Provider
			value={{
				message
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
