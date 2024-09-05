import React from "react";

const AutLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="h-full flex items-center justify-center bg-gradient-to-t">{children}</div>;
};

export default AutLayout;
