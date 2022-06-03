import React from "react";

import "layouts/MainLayout/MainLayout.scss";

const MainLayout = ({ children }) => {
    // Rendering
    return(
        <>
            <div className="main-layout">
                {children}
            </div>
        </>
    );
};

export default MainLayout;
