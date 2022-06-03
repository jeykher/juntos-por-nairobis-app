import { configureStore } from "@reduxjs/toolkit";

import GlobalReducer from "reducers/GlobalReducer";
import TicketsReducer from "reducers/TicketsReducer";

const Store = configureStore({
    reducer: {
        global: GlobalReducer,
        tickets: TicketsReducer
    }
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;
