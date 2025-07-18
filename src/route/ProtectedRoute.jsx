import { useAuth } from "../context/AuthContex";
import { Navigate } from "react-router-dom";

import Loader from "../components/Loader";

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <Loader />

    if (!user) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
}

export default ProtectedRoute;
