import { React, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = user?.name.split(" ")[0];
  const isLoggedIn = !!localStorage.getItem("user"); // basic check
  const isLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    setShowModal(false);
    navigate("/login");
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/home" className="text-2xl font-bold text-blue-600">
        Dental Office Online Scheduling System
      </Link>

      <div className="flex items-center gap-4">
        {!isLoggedIn && location.pathname === "/login" ? (
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        ) : (
          ""
        )}

        {!isLoggedIn && location.pathname === "/register" ? (
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        ) : (
          ""
        )}
        {isLoggedIn && !isLoginPage && (
          <div className="flex items-center gap-2 px-4">
            <h1 className="text-2xl font-bold text-blue-600">{`Welcome ${firstName}!`}</h1>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50"
              onClick={() => setShowModal(true)}
            >
              <HiArrowRightOnRectangle size={20} /> Logout
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
