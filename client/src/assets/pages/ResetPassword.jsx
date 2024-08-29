import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you are using react-router
import Loader from "../components/utils/Loader";
import Alert from "../components/utils/AlertSuccess";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await res.json(); // Parse the response as JSON

      if (res.ok) {
        setAlert({
          variant: "success",
          text: data.message || "Password has been reset successfully!",
        });
        setNewPassword("");
      } else {
        setAlert({
          variant: "error",
          text: data.message || "Failed to reset password.",
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setAlert({ variant: "error", text: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };
  const handleCloseAlert = () => {
    setAlert(null);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {alert && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4">
          <Alert
            variant={alert.variant}
            text={alert.text}
            onClose={handleCloseAlert}
          />
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
