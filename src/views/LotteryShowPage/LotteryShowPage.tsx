import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Img from "react-cool-img";

import { RootState } from "store/Store";

import { 
    changeTickets
} from "reducers/TicketsReducer";

import useTicket from "hooks/ticket/useTicket";

import "views/LotteryShowPage/LotteryShowPage.scss";

const LotteryShowPage = () => {
    // Global state
    const { tickets } = useSelector((state: RootState) => state.tickets);
    // States
    const [ticketsToPlay, setTicketsToPlay] = useState([]);
    const [btnActive, setBtnActive] = useState(false);
    const [btnDynamicClass, setBtnDynamicClass] = useState("");
    const [btnStopAnimationDisabled, setBtnStopAnimationDisabled] = useState(true);
    const [bucleShow, setBucleShow] = useState(null);
    const [showNumber, setShowNumber] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [eventLock, setEventLock] = useState(false);
    const [eventLockDynamicClass, setEventLockDynamicClass] = useState("");
    const [winner, setWinner] = useState("Go!");
    const [showInvalidTicket, setShowInvalidTicket] = useState(false);
    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Custom hooks
    const { getAllTickets, updateWinner } = useTicket();
    // Handler methods
    const handleClickStartShow = () => {
        setShowInvalidTicket(false);
        setShowNumber(true);
        setBtnActive(true);
        setBtnDynamicClass("active");
        setTrigger(!trigger);
    };
    const handleClickStopShow = async () => {
        setBtnActive(false);
        setBtnStopAnimationDisabled(false);
        clearInterval(bucleShow);
        setBucleShow(null);
        if(eventLock) {
            let ticketIsValid = ticketsToPlay.find(ticket => ticket.toString() === winner.toString());
            console.log(ticketsToPlay)
            console.log(ticketIsValid)
            if(ticketIsValid !== undefined && ticketIsValid !== null) {
                let ticketWinner = tickets.filter(ticket => ticket.ticketNumber.toString() === winner.toString());
                let response = await updateWinner({
                    eventShow: 1,
                    ticketNumber: ticketWinner[0].ticketNumber,
                    typeid: ticketWinner[0].typeid,
                    numid: ticketWinner[0].numid,
                    gender: ticketWinner[0].gender,
                    firstname: ticketWinner[0].firstname,
                    lastname: ticketWinner[0].lastname
                });
                console.log(tickets);
                console.log(winner);
                console.log(ticketWinner);
                console.log(response);
                setTimeout(() => {
                    navigate("/winner");
                }, 1500);
            }
            else {
                setShowInvalidTicket(true);
            }
        }
    }
    const handleSaileEvent = () => {
        setEventLock(!eventLock);
        if(!eventLock) {
            setEventLockDynamicClass("active");
        }
        else {
            setEventLockDynamicClass("");
        }
    }
     // Effects 
    useEffect(()=> {
        const fetchAllTickets = async (): Promise <void> => {
            let response = await getAllTickets();
            if(response.tickets.length !== 0 && response.tickets !== undefined && response.tickets !== null) {
                dispatch(changeTickets(response.tickets));
                let ticketsFilteredToPlay = response.tickets.filter(ticket => ticket.status === "buyed");
                let ticketsNumberFilteredToPlay = ticketsFilteredToPlay.map((ticket, index) => {
                    return ticket.ticketNumber
                });
                setTicketsToPlay(ticketsNumberFilteredToPlay);
            }
        };
        fetchAllTickets();
    }, []);
    useEffect(() => {
        if(btnActive) {
            let interval = setInterval(() => {
                let winnerChoosen = Math.floor(Math.random() * 100);
                let finalWinner = winnerChoosen+1;
                setWinner(finalWinner.toString());
                // let finalTicketValid = ticketsToPlay.find(ticket => ticket === finalWinner);
                // if(finalTicketValid !== null && finalTicketValid !== undefined) {
                //     setWinner(finalWinner.toString());
                // }
            }, 50);
            setBucleShow(interval);
        }
    }, [trigger]);
    // Rendering
    return(
        <div className="lottery-show-page">
            <div 
                className="lottery-show-page-header"
            >
                <Img 
                    className={`lottery-show-page-header-brand ${eventLockDynamicClass}`}
                    src="/assets/icons/icon-512x512.png"
                    alt="Logo"
                    debounce={1000}
                    cache={true}
                    lazy={true}
                    width="100px"
                    onClick={handleSaileEvent} 
                />
                <h2 className="lottery-show-page-header-title">
                    { 
                        !showInvalidTicket ? "Juntos Por Nairobis" : "Ticket Invalido!"
                    }
                </h2>
            </div>
            <main className="lottery-show-main-container">
                {
                    showNumber && (
                        <>
                            <motion.div 
                                className="lottery-show-ticket-number-container"
                                animate={{
                                    opacity: 1,
                                    rotate: 720,
                                    scale: 1.2
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0,
                                    ease: "easeInOut"
                                }}
                            >                                
                                <h1 className="lottery-show-ticket-number neon-light">
                                    {winner}
                                </h1>
                            </motion.div>
                        </>
                    )
                } 
                {
                    btnActive 
                    ? (
                        <>
                            <motion.div 
                                className={"lottery-show-ticket-btn-stop-container"}
                                animate={{ 
                                    padding: 0 
                                }}
                                transition={{ 
                                    duration: 0.5,
                                    delay: 0.1,
                                    ease: "easeInOut" 
                                }}
                                initial={btnStopAnimationDisabled}
                            >                      
                                <button
                                    className="lottery-show-ticket-btn-stop"
                                    onClick={handleClickStopShow}
                                >
                                    Stop
                                </button>                                
                            </motion.div> 
                        </>
                    )
                    : (
                        <>                        
                            <div 
                                className={`lottery-show-ticket-btn-start-container ${btnDynamicClass}`}
                            >                      
                                <button
                                    className="lottery-show-ticket-btn-start"
                                    onClick={handleClickStartShow}
                                >
                                    Start
                                </button>                                
                            </div>                      
                        </>
                    )
                }                                   
            </main>
        </div>
    );
};

export default LotteryShowPage;
