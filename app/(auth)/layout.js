import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="h-[calc(100vh-5rem)] flex justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
