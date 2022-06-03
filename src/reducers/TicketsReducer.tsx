import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import ticketsInitState from "states/ticketsInitState";

const TicketsReducer = createSlice({
    name: 'tickets',
    initialState: ticketsInitState,
    reducers: {
        changeTickets: (state, action: PayloadAction<any>) => {
            state.tickets = action.payload;
        },
        changeTicketsGroup: (state, action: PayloadAction<any>) => {
            state.ticketsGroup = action.payload;
        },
        changeTicketsFiltered: (state, action: PayloadAction<any>) => {
            state.ticketsFiltered = action.payload;
        },
        changeActiveButtonFilter: (state, action: PayloadAction<any>) => {
            state.activeButtonFilter = action.payload;
        },
        changeTicketSearched: (state, action: PayloadAction<any>) => {
            state.ticketSearched = action.payload;
        },
        changeTotalTickets: (state, action: PayloadAction<any>) => {
            state.totalTickets = action.payload;
        },
        changeTotalAvailableTickets: (state, action: PayloadAction<any>) => {
            state.totalAvailableTickets = action.payload;
        },
        changeTotalLockedTickets: (state, action: PayloadAction<any>) => {
            state.totalLockedTickets = action.payload;
        },
        changeTotalBuyedTickets: (state, action: PayloadAction<any>) => {
            state.totalBuyedTickets = action.payload;
        }
    }
});

export const {
    changeTickets,
    changeTicketsGroup,
    changeTicketsFiltered,
    changeActiveButtonFilter,
    changeTicketSearched,
    changeTotalTickets,
    changeTotalAvailableTickets,
    changeTotalLockedTickets,
    changeTotalBuyedTickets
} = TicketsReducer.actions;

export default TicketsReducer.reducer;