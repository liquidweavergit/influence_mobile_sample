import userStore from "../../stores/userStore";
import {Navigate, useLocation} from "react-router-dom";
import React from "react";

interface PrivateRouteProps {
  children: any,
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const getAccessToken = userStore((state) => state.getAccessToken);
  const loading = userStore((state) => state.loading);
  const location = useLocation();
  const fromLocation = (location.state as any)?.from;
  const previousLocation = location.state ? fromLocation : { pathname: '/login' };

  const accessToken = getAccessToken();

  if (accessToken) {
    return children;
  } else if (loading) {
    return <p>Loading...</p>
  } else if (!loading && !accessToken) {
    return <Navigate to={previousLocation} state={{from: location}}/>;
  } else {
    return <p>Something went wrong</p>
  }
};

export default PrivateRoute;
