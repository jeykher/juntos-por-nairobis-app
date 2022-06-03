import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Img from "react-cool-img";

import { 
    changeTickets, 
    changeTicketsGroup, 
    changeTicketsFiltered
} from "reducers/TicketsReducer";

import TicketSearch from "components/TicketSearch/TicketSearch";
import BoxLotteryMainGroup from "components/BoxLotteryMainGroup/BoxLotteryMainGroup";

import useTicket from "hooks/ticket/useTicket";

import "views/HomePage/HomePage.scss";

const HomePage = () => {
    // Hooks
    const dispatch = useDispatch();
    // Custom hooks
    const { getAllTickets } = useTicket();
    // Effects
    useEffect(() => {
        const fetchAllTickets = async (): Promise <void> => {
            let response = await getAllTickets();
            if(response.tickets.length !== 0 && response.tickets !== undefined && response.tickets !== null) {
                let finalTickets = response.tickets.filter(ticket => ticket.status === "buyed");
                console.log(finalTickets);
                dispatch(changeTickets(finalTickets));
                dispatch(changeTicketsGroup(finalTickets));
                dispatch(changeTicketsFiltered(finalTickets));
            }
        };
        fetchAllTickets();
    }, []);
    // Rendering
    return(
        <>
            <div className="admin-page">
                <div className="admin-page-header">
                    <Img 
                        className="home-page-header-brand"
                        src="/assets/icons/icon-512x512.png"
                        alt="Logo"
                        debounce={1000}
                        cache={true}
                        lazy={true}
                        width="100px" 
                    />
                    <h2 className="admin-page-header-title">
                        Juntos Por Nairobis
                    </h2>
                </div>
                <div className="admin-page-controls">
                    <TicketSearch />
                </div>
                <main className="admin-page-main">
                    <BoxLotteryMainGroup />
                </main>
            </div>
        </>
    );
};

export default HomePage;
