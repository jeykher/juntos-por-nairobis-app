import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import Store from "store/Store";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import reportWebVitals from "./reportWebVitals";

import App from "app/App";

const appContainer: any = document.getElementById("root");

const Root = createRoot(appContainer);

Root.render(
    <StrictMode>
        <Provider
            store={Store}
        >
            <App />
        </Provider>
    </StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
