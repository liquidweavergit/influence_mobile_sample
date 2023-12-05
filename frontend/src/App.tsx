import React from 'react';
import TopMenu from "./features/menus/TopMenu";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PrivateRoute from "./features/routes/PrivateRoute";
import Dashboard from "./features/dashboard/Dashboard";
import Logout from "./features/session/Logout";
import UpdateUser from "./features/session/UpdateUser";
import PublicOnlyRoute from "./features/routes/PublicOnlyRoute";
import Login from "./features/session/Login";
import Register from "./features/session/Register";

function App() {
  return (
    <div>
      <Router>
        <header>
          <TopMenu />
        </header>
        <main>
          <Routes>
            <Route path={'/'} element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }/>
            <Route path={'/logout'} element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }/>
            <Route path={'/update-profile'} element={
              <PrivateRoute>
                <UpdateUser />
              </PrivateRoute>
            }/>
            <Route path={'/login'} element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }/>
            <Route path={'/register'} element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            }/>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
