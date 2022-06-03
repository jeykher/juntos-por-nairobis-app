import Img from "react-cool-img";

import "components/BoxLotteryMain/BoxLotteryMain.scss";

interface IBoxLottery {
    id: number | string;
    number: number | string;
    firstname: any;
    lastname: any;
    status: string;
    imagePath: string;
};

const BoxLotteryMain = ({
    id,
    number,
    firstname,
    lastname,
    status,
    imagePath
}: IBoxLottery) => {
    // Rendering
    return(
        <>
            <div className="component-box-lottery">
                <div className="component-box-lottery-label-container">
                    <button 
                        className="component-box-lottery-main-btn"
                        // onClick={handleClickTicketButton}
                    >
                        <span className="component-box-lottery-label">{number}</span>
                    </button> 
                    {/* <>
                        {
                            status === "buyed"
                            ? (
                                <div className="component-box-lottery-number-container">
                                    <span className="component-box-lottery-number">{number}</span>
                                </div>
                            )
                            : (                                    
                                <button 
                                    className="component-box-lottery-btn"
                                    onClick={handleClickTicketButton}
                                >
                                    <span className="component-box-lottery-label">{number}</span>
                                </button>                 
                            )
                        }
                    </> */}
                </div>
                <div className="component-box-lottery-image-container">
                    <Img 
                        className="component-box-lottery-image"
                        src={imagePath} 
                        alt="box lottery"
                        debounce={1000}
                        cache={true}
                        lazy={true} 
                    />
                </div>
                <div className="component-box-lottery-title-container">
                    {
                        status === "buyed" || status === "lock" 
                        ? 
                            <div className="component-box-lottery-title">
                                <div>
                                    <span>{firstname}</span>
                                </div>
                                <div>
                                    <span>{lastname}</span>
                                </div>    
                            </div>
                        // : status === "lock"
                        // ? <span className="component-box-lottery-title">Reserved</span>
                        : <span className="component-box-lottery-title">Disponible</span>
                    }
                </div>
            </div>
        </>
    );
};

export default BoxLotteryMain;
