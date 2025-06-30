import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

interface PrivateRouteProps {
  component: ReactElement;
  isAuthenticated: boolean;
  redirectTo?: string;
}

const PrivateRoute = ({
  component,
  isAuthenticated,
  redirectTo = "/",
}: PrivateRouteProps) => {
  return isAuthenticated ? component : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
