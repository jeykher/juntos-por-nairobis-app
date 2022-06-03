import { useSelector } from "react-redux";

import { RootState } from "store/Store";

import BoxLottery from "components/BoxLottery/BoxLottery";

const BoxLotteryGroup = () => {
    // Hooks
    const { ticketsFiltered } = useSelector((state: RootState) => state.tickets)
    // Rendering
    return(
        <>
            {
               ticketsFiltered.map((ticket) => {
                   // Destructuring
                   const { _id, ticketNumber, gender, firstname, lastname, status, active } = ticket;
                   // Rendering
                   return(
                       <div
                            key={ticketNumber}
                       >
                            {
                                active === true && (
                                    <BoxLottery 
                                        id={_id}
                                        number={ticketNumber}
                                        firstname={firstname}
                                        lastname={lastname}
                                        status={status}
                                        imagePath={
                                            status === "available"
                                            ? "/assets/images/box.png"
                                            : status === "lock"
                                            ? "/assets/images/lock.png"
                                            : status === "buyed" && gender === "hombre"
                                            ? "/assets/images/man.png"
                                            : "/assets/images/woman.png" 
                                        }
                                    /> 
                                )
                            }
                       </div>
                   );
               }) 
            }
        </>
    );
};

export default BoxLotteryGroup;
