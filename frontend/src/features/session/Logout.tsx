import React, {Fragment, useEffect} from "react";
import userStore from "../../stores/userStore";
import {useNavigate} from "react-router-dom";

interface LogoutProps {

}

const Logout: React.FC<LogoutProps> = () => {
  const logout = userStore((state) => state.logout);
  const user = userStore((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    if (!user.id || user.id === 0) {
      navigate('/login');
    }
  }, [user.id]);

  return (
    <Fragment>
      <p>Logging out...</p>
    </Fragment>
  )
}

export default Logout;