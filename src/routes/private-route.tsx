import { RootState } from "@redux/store";
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
interface PrivateRouteProps {
  children: JSX.Element;
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;