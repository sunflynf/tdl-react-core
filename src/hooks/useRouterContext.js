import { useContext } from "react";
import { RouterContext } from "../contexts/RouterContext";

export const useRouterContext = () => useContext(RouterContext);
