import { Navigate } from "react-router-dom";

function ProtectedRoute({
    children,
    allowedPermissions = [],
    allowedRoles = [],
}) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const roleAllowed =
        allowedRoles.length === 0 ||
        allowedRoles.includes(user.role);

    const permissionAllowed =
        allowedPermissions.length === 0 ||
        allowedPermissions.includes(user.permission);

    if (!roleAllowed || !permissionAllowed) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;