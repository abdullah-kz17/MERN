const Alert = ({ variant, text, onClose }) => {
  let alertClasses =
    "alert w-80 flex items-center justify-between p-4 rounded-lg mb-4";
  let iconClasses = "h-6 w-6 shrink-0";

  switch (variant) {
    case "success":
      alertClasses += " bg-green-100 text-green-800";
      iconClasses += " stroke-green-800";
      break;
    case "error":
      alertClasses += " bg-red-100 text-red-800";
      iconClasses += " stroke-red-800";
      break;
    case "warning":
      alertClasses += " bg-yellow-100 text-yellow-800";
      iconClasses += " stroke-yellow-800";
      break;
    default:
      alertClasses += " bg-blue-100 text-blue-800";
      iconClasses += " stroke-blue-800";
  }

  return (
    <div className="flex justify-center">
      <div role="alert" className={alertClasses}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconClasses}
          fill="none"
          viewBox="0 0 24 24"
        >
          {variant === "success" ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ) : variant === "error" ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          )}
        </svg>
        <span>{text}</span>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          &times; {/* Close icon */}
        </button>
      </div>
    </div>
  );
};

export default Alert;
