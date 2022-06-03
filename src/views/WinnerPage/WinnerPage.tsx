import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Img from "react-cool-img";

import useTicket from "hooks/ticket/useTicket";

import "views/WinnerPage/WinnerPage.scss";

const WinnerPage = () => {
    // States
    const [winner, setWinner] = useState(null);
    // Hooks
    const { getWinner } = useTicket();
    // Effects
    useEffect(() => {
        const fetchWinner = async (): Promise <void> => {
            let response = await getWinner();
            if(response.length !== 0) {
                setWinner(response[0]);
            }
        };
        fetchWinner();
    }, []);
    console.log(winner);
    // Rendering
    return(
        <>        
            <div className="winner-page-celebrate">
                <Img 
                    src="/assets/images/winner.png"
                    alt="Winner"
                    className="winner-page-celebrate-background"
                    debounce={1000}
                    cache={true}
                    lazy={true}
                />
            </div>
            <div className="winner-page">
                <motion.div 
                    className="winner-page-main"
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        duration: 2,
                        delay: 0.1,
                        ease: "easeInOut"
                    }}
                >
                    <Img 
                        className="winner-brand"
                        src="/assets/icons/icon-512x512.png"
                        alt="Logo"
                        debounce={1000}
                        cache={true}
                        lazy={true}
                        width="180px" 
                    />
                    <motion.h2 
                        className="winner-title"
                        animate={{
                            opacity: 1,
                            rotate: 720
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.1,
                            ease: "easeInOut"
                        }}  
                    >
                        Juntos Por Nairobis
                    </motion.h2>
                    {
                        winner !== undefined && winner !== null && (
                            <>                        
                                <h1 
                                    className="winner-ticket-number" 
                                >
                                    {winner.ticketNumber}
                                </h1>
                                <span className="winner-ticket-winner">{winner.firstname} {winner.lastname}</span>
                                <span className="winner-page-text">Felicitaciones</span>
                                <span className="winner-page-text">Has ganado!!!</span>
                            </>
                        )
                    }
                        
                </motion.div>
            </div>
        </>
    );
};

export default WinnerPage;
