import InitialSelection from "../pages/InitialSelection";
import Login from "../pages/Login";
import Result from "../pages/Result";
import Vote from "../pages/Vote";

export enum RouteNames {
  Login = "/login",
  InitialSelection = "/",
  Vote = "/vote",
  Result = "/result",
}

export interface IRoute {
  path: string;
  exact?: boolean;
  component: React.ReactNode;
}
export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.Login,
    exact: true,
    component: <Login />,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.InitialSelection,
    exact: true,
    component: <InitialSelection />,
  },
  {
    path: RouteNames.Vote,
    component: <Vote />,
  },
  {
    path: RouteNames.Result,
    component: <Result />,
  },
];
