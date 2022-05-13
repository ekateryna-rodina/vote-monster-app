import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

export enum RouteNames {
  Login = "/login",
  Dashboard = "/",
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
    path: RouteNames.Dashboard,
    exact: true,
    component: <Dashboard />,
  },
];
