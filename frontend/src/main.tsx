// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AuthUserProvider from "./auth/AuthUserProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    //     <AuthUserProvider>
    //         <App />
    //     </AuthUserProvider>
    // </React.StrictMode>
    <AuthUserProvider>
        <App />
    </AuthUserProvider>
);
