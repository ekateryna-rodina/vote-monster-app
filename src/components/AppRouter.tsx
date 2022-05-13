import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import {
  IRoute,
  privateRoutes,
  publicRoutes,
  RouteNames,
} from "../routes/index";

const AppRouter = () => {
  const { isConnected } = useAppSelector((state) => state.auth);
  return (
    <Routes>
      {isConnected ? (
        <>
          {privateRoutes.map((r: IRoute) => (
            <Route key={r.path} path={r.path} element={r.component} />
          ))}
          <Route path="*" element={<Navigate to={RouteNames.Dashboard} />} />
        </>
      ) : (
        <>
          {publicRoutes.map((r: IRoute) => (
            <Route key={r.path} path={r.path} element={r.component} />
          ))}
          <Route path="*" element={<Navigate to={RouteNames.Login} />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
