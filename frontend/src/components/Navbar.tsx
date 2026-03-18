import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav("/");
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Career App</h1>

      <div>
        {token ? (
          <>
            <Link to="/profile" className="mx-2">
              Profile
            </Link>
            <Link to="/quiz" className="mx-2">
              Assessment
            </Link>
            <Link to="/result" className="mx-2">
              Dashboard
            </Link>
            <button onClick={onLogout} className="mx-2 underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="mx-2">
              Login
            </Link>
            <Link to="/register" className="mx-2">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}