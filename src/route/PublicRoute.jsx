import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContex';

import Loader from '../components/Loader';

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader />

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default PublicRoute;
