import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import FullPageLoader from "./components/ui/FullPageLoader";
import { Toaster } from "react-hot-toast";
function App() {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
  if (loading || !data) {
    return <FullPageLoader />;
  }
  const isAuthenticated = Boolean(data.authUser);
  return (
    <>
      {isAuthenticated && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <HomePage profilePicture={data.authUser.profilePicture} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUpPage />}
        />
        <Route
          path="/transaction/:id"
          element={
            isAuthenticated ? <TransactionPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}
export default App;
