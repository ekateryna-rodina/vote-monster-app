import Login from "../pages/Login";
import Vote from "../pages/Vote";

export enum RouteNames {
  Login = "/login",
  Vote = "/",
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
    path: RouteNames.Vote,
    exact: true,
    component: <Vote />,
  },
];
