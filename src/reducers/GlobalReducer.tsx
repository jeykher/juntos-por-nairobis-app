import { createSlice } from "@reduxjs/toolkit";

import globalInitState from "states/globalInitState";

const GlobalReducer = createSlice({
    name: 'global',
    initialState: globalInitState,
    reducers: {}
});

export const {} = GlobalReducer.actions;

export default GlobalReducer.reducer;
