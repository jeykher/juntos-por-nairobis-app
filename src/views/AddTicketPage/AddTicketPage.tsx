import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import TicketAddForm from "components/TicketAddForm/TicketAddForm";

import useTicket from "hooks/ticket/useTicket";

import "views/AddTicketPage/AddTicketPage.scss";

const AddTicketPage = () => {
    // States
    const [activeClient, setActiveClient] = useState(null);
    // Hooks
    const params = useParams();
    const { getTicketByNumber } = useTicket();
    // Effects
    useEffect(() => {
        const fetchTicketByNumber = async () => {
            let response = await getTicketByNumber(params.ticketNumber);
            setActiveClient(response);
        };
        fetchTicketByNumber();
    }, []);
    // Rendering
    return(
        <>
            <div className="add-ticket-page">
                <div className="add-ticket-page-form">
                    <div className="add-ticket-page-header">
                        Agregar Nuevo Ticket
                    </div>
                    {
                        activeClient && (
                            <>                            
                                <TicketAddForm 
                                    ticketId={params.id}
                                    ticketNumber={params.ticketNumber}
                                    activeClient={activeClient}
                                />
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default AddTicketPage;
