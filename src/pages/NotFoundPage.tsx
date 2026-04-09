import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full">
        {/* 404 Number */}
        <h1 className="text-7xl font-extrabold text-gray-800">404</h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>

        {/* Dynamic Path */}
        <p className="mt-2 text-sm text-gray-500 break-all">
          The path <span className="font-medium text-red-500">{location.pathname}</span> does not exist.
        </p>

        {/* Countdown */}
        <p className="mt-4 text-sm text-gray-600">
          Redirecting to home in{" "}
          <span className="font-semibold">{countdown}s</span>...
        </p>

        {/* Actions */}
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;