import { useSelector, useDispatch } from "react-redux";

import { RootState } from "store/Store";

import { changeTicketsFiltered, changeTicketSearched } from "reducers/TicketsReducer"; 

import "components/TicketSearch/TicketSearch.scss";

const TicketSearch = () => {
    // Global states
    const { ticketsGroup } = useSelector((state: RootState) => state.tickets);
    // Hooks
    const dispatch = useDispatch();
    // Handler methods
    const handleChangeSearch = (e) => {
        dispatch(changeTicketSearched(e.target.value));
        let ticketFiltered = ticketsGroup.filter(ticket => ticket.ticketNumber === parseInt(e.target.value))
        if(ticketFiltered.length !== 0) {
            dispatch(changeTicketsFiltered(ticketFiltered));
        }
        else {
            dispatch(changeTicketsFiltered(ticketsGroup));
        }
    };
    // Rendering
    return(
        <>
            <div className="component-ticket-search">
                <input 
                    className="component-ticket-search-input" 
                    type="text" 
                    placeholder="Buscar..." 
                    onChange={handleChangeSearch} 
                />
            </div>
        </>
    );
};

export default TicketSearch;
