import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Img from "react-cool-img";

import Badge from "@mui/material/Badge";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LockIcon from "@mui/icons-material/Lock";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { RootState } from "store/Store";

import { 
    changeTickets, 
    changeTicketsGroup, 
    changeTicketsFiltered,
    changeActiveButtonFilter,
    changeTotalTickets,
    changeTotalAvailableTickets,
    changeTotalLockedTickets,
    changeTotalBuyedTickets
} from "reducers/TicketsReducer";

import TicketSearch from "components/TicketSearch/TicketSearch";
import BoxLotteryGroup from "components/BoxLotteryGroup/BoxLotteryGroup";

import useTicket from "hooks/ticket/useTicket";

import "views/AdminPage/AdminPage.scss";

const AdminPage = () => {
    // Global states
    const { 
        tickets, 
        activeButtonFilter, 
        totalTickets,
        totalAvailableTickets,
        totalLockedTickets,
        totalBuyedTickets 
    } = useSelector((state: RootState) => state.tickets);
    // Hooks
    const dispatch = useDispatch();
    // Custom hooks
    const { getAllTickets } = useTicket();
    // Handler methods
    const handleClickIndicators = (indicatorValue) => {
        if(tickets.length !== 0 && activeButtonFilter !== indicatorValue) {
            switch(indicatorValue) {
                case "all":
                    dispatch(changeActiveButtonFilter("all"));
                    dispatch(changeTicketsGroup(tickets));
                    dispatch(changeTicketsFiltered(tickets));
                    break;
                case "available":
                    let ticketFilterByAvailables = tickets.filter(ticket => ticket.status === "available");
                    dispatch(changeActiveButtonFilter("available"));
                    dispatch(changeTicketsGroup(ticketFilterByAvailables));
                    dispatch(changeTicketsFiltered(ticketFilterByAvailables));
                    break;
                case "lock":
                    let ticketFilterByLockers = tickets.filter(ticket => ticket.status === "lock");
                    dispatch(changeActiveButtonFilter("lock"));
                    dispatch(changeTicketsGroup(ticketFilterByLockers));
                    dispatch(changeTicketsFiltered(ticketFilterByLockers));
                    break;
                case "buyed":
                    let ticketFilterBySellers = tickets.filter(ticket => ticket.status === "buyed");
                    dispatch(changeActiveButtonFilter("buyed"));
                    dispatch(changeTicketsGroup(ticketFilterBySellers));
                    dispatch(changeTicketsFiltered(ticketFilterBySellers));
                    break;
                default: 
                    break;
            }
        }
    }
    // Effects
    useEffect(() => {
        const fetchAllTickets = async (): Promise <void> => {
            let response = await getAllTickets();
            if(response.tickets.length !== 0 && response.tickets !== undefined && response.tickets !== null) {
                dispatch(changeTickets(response.tickets));
                dispatch(changeTicketsGroup(response.tickets));
                dispatch(changeTicketsFiltered(response.tickets));
            }
        };
        fetchAllTickets();
    }, []);
    useEffect(() => {
        let ticketFilteredByAvailable = tickets.filter(ticket => ticket.status === "available");
        let ticketFilteredByLock = tickets.filter(ticket => ticket.status === "lock");
        let ticketFilteredByBuyed = tickets.filter(ticket => ticket.status === "buyed");
        if(tickets.length !== 0 && tickets !== undefined && tickets !== null) {
            dispatch(changeTotalTickets(tickets.length));
            dispatch(changeTotalAvailableTickets(ticketFilteredByAvailable.length));
            dispatch(changeTotalLockedTickets(ticketFilteredByLock.length));
            dispatch(changeTotalBuyedTickets(ticketFilteredByBuyed.length));
        }
    }, [tickets]);
    // Rendering
    return(
        <>
            <div className="admin-page">
                <div className="admin-page-header">
                    <Link
                        to="/event"
                    >
                        <Img 
                            className="admin-page-header-brand"
                            src="/assets/icons/icon-512x512.png"
                            alt="Logo"
                            debounce={1000}
                            cache={true}
                            lazy={true}
                            width="100px" 
                        />
                    </Link>
                    <h2 className="admin-page-header-title">
                        Juntos Por Nairobis
                    </h2>
                </div>
                <div className="admin-page-controls">
                    <TicketSearch />
                </div>
                <div className="admin-page-indicators">
                    <div className="admin-page-indicator">
                        <button 
                            className="admin-page-indicators-btn"
                            onClick={() => {handleClickIndicators("all")}}
                        >
                            <Badge 
                                badgeContent={totalTickets} 
                                max={999}
                                color="primary"
                            >
                                <BookOnlineIcon 
                                    style={{
                                        color: '#333333'
                                    }} 
                                />
                            </Badge>
                        </button>
                        <div className="admin-page-indicators-title">
                            Todos
                        </div>
                    </div>
                    <div className="admin-page-indicator">
                        <button 
                            className="admin-page-indicators-btn"
                            onClick={() => {handleClickIndicators("available")}}
                        >
                            <Badge 
                                badgeContent={totalAvailableTickets} 
                                color="warning"
                            >
                                <CardGiftcardIcon 
                                    style={{
                                        color: '#333333'
                                    }} 
                                />
                            </Badge>
                        </button>
                        <div className="admin-page-indicators-title">
                            Disponibles
                        </div>
                    </div>
                    <div className="admin-page-indicator">
                        <button 
                            className="admin-page-indicators-btn"
                            onClick={() => {handleClickIndicators("lock")}}
                        >
                            <Badge 
                                badgeContent={totalLockedTickets} 
                                color="error"
                            >
                                <LockIcon 
                                    style={{
                                        color: '#333333'
                                    }} 
                                />
                            </Badge>
                        </button>
                        <div className="admin-page-indicators-title">
                            Apartados
                        </div>
                    </div>
                    <div className="admin-page-indicator">
                        <button 
                            className="admin-page-indicators-btn" 
                            onClick={() => {handleClickIndicators("buyed")}}
                        >
                            <Badge 
                                badgeContent={totalBuyedTickets} 
                                color="success"
                            >
                                <ShoppingBagIcon 
                                    style={{
                                        color: '#333333'
                                    }} 
                                />
                            </Badge>
                        </button>
                        <div className="admin-page-indicators-title">
                            Vendidos
                        </div>
                    </div>
                </div>
                <main className="admin-page-main">
                    <BoxLotteryGroup />
                </main>
            </div>
        </>
    );
};

export default AdminPage;