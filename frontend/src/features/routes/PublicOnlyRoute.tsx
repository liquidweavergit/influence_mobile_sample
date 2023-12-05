import React from "react";
import userStore from "../../stores/userStore";
import {Navigate, useLocation} from "react-router-dom";

interface PublicOnlyRouteProps {
  children: any,
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const getAccessToken = userStore((state) => state.getAccessToken);
  const loading = userStore((state) => state.loading);
  const location = useLocation();

  const accessToken = getAccessToken();

  if (!loading && !accessToken) {
    return children;
  } else if (loading) {
    return <p>Loading...</p>;
  } else if (!loading && accessToken) {
    return <Navigate to={'/'} state={{from: location}}/>;
  } else {
    return <p>Something went wrong</p>
  }
};

export default PublicOnlyRoute;
