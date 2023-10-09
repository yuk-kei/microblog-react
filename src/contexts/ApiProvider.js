import { createContext, useContext } from "react";
import MicroBlogApiClient from "../MicroblogApiClient";

const ApiContext = createContext();

export default function ApiProvider({children}) {
    const api = new MicroBlogApiClient();

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    return useContext(ApiContext);
}
