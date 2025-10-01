import CreateUrl from "./Components/CreateUrl";
import Dashboard from "./Components/Dashboard.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Utils/protectedRoute.util.jsx";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import Layout from "./Components/Layout.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "./Store/Slices/authSlice";
import Cookies from 'js-cookie';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
  const token = Cookies.get("token");
  const user = Cookies.get("user");

  if (token && user) {
    const parsedUser = JSON.parse(user);
    dispatch(loginSuccess(parsedUser));
  }
}, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CreateUrl />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
