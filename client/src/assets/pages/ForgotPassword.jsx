import { useState } from "react";
import Loader from "../components/utils/Loader";
import Alert from "../components/utils/AlertSuccess";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:4000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok) {
        setAlert({ variant: "success", text: "Email Sent Successfully" });
        setEmail("");
      } else {
        const errorData = await res.json();
        setAlert({
          variant: "error",
          text: errorData.message || "Failed to send email.",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
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
          <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
          >
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
