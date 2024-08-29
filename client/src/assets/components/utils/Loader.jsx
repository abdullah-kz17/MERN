const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader">
        <div className="w-16 h-16 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
      </div>
      <style>{`
        .loader {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Loader;
