import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
//Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
//Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Auth
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 bg-gray-50">
              <Routes>
                <Route
                  path="/login"
                  element={
                    <AuthWrapper redirectIfLoggedIn>
                      <Login />
                    </AuthWrapper>
                  }
                />

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Catch All (redirect to home if no match) */}
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </main>
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;

// Helper component to redirect logged-in users away from /login or /register
function AuthWrapper({ children, redirectIfLoggedIn = false }) {
  const { user } = useAuth();

  if (redirectIfLoggedIn && user) {
    return <Navigate to="/home" />;
  }

  return children;
}
