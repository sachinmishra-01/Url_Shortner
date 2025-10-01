import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // or useContext, depending on your auth setup
import { useEffect, useState } from 'react';
import { loginSuccess, loginFailure } from '../Store/Slices/authSlice';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/auth/me', {
                withCredentials: true, // ✅ important for sending cookies
            });
            dispatch(loginSuccess(data.user));
        } catch (error) {
            console.log("Not authenticated:", error?.response?.data?.message);
            dispatch(loginFailure());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
