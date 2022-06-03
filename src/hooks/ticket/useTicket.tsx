import axios from "axios";

const useTicket = () => {
    const getAllTickets = async (): Promise <any> => {
        try {
            let service = "https://juntos-por-nairobis-deployment-hnzxrouuz.vercel.app/ticket/getAll";
            let response = await axios.get(service);
            if(response.status === 200 && response.data.data.data.tickets.length !== 0) {
                return response.data.data.data;
            }
            else {
                throw new Error("Tickets have not been obtained. Request has failed!");
            }
        }
        catch(error) {
            console.log(error);
        }    
    };
    const getTicketByNumber = async (ticketNumber): Promise <any> => {
        try {
            let service = "https://juntos-por-nairobis-deployment-hnzxrouuz.vercel.app/ticket/getOneByNumber";
            let params = {
                ticketNumber: parseInt(ticketNumber)
            };
            let response = await axios.post(service, params);
            if(response.status === 200 && response.data.data.data.ticket) {
                return response.data.data.data.ticket;
            }
            else {
                throw new Error("Tickets have not been obtained. Request has failed!");
            }
        }
        catch(error) {
            console.log(error);
        }
    };
    const getWinner = async () => {
        try {
            let service = "https://juntos-por-nairobis-deployment-hnzxrouuz.vercel.app/winner/getAll";
            let response = await axios.get(service);
            if(response.status === 200 && response.data.data.data.winners.length !== 0) {
                return response.data.data.data.winners;
            }
            else {
                throw new Error("Winner has not been obtained. Request has failed!");
            }
        }
        catch(error) {
            console.log(error);
        }  
    };
    const updateTicket = async (params) => {
        try {
            let service = "https://juntos-por-nairobis-deployment-hnzxrouuz.vercel.app/ticket/update/1";
            let response = await axios.put(service, params);
            if(response.status === 200 && response.data.data.data.ticketUpdated) {
                return response.data.data.data.ticketUpdated;
            }
            else {
                throw new Error("Tickets have not been updated. Request has failed!");
            }
        }
        catch(error) {
            console.log(error);
        }
    };
    const updateWinner = async (params) => {
        try {
            let service = "https://juntos-por-nairobis-deployment-hnzxrouuz.vercel.app/winner/update";
            let response = await axios.put(service, params);
            if(response.status === 200 && response.data.data.data.winnerUpdated) {
                return response.data.data.data.winnerUpdated;
            }
            else {
                throw new Error("Winner has not been updated. Request has failed!")
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    return {
        getAllTickets,
        getTicketByNumber,
        getWinner,
        updateTicket,
        updateWinner
    }
};

export default useTicket;
