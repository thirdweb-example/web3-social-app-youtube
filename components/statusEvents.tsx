import { useContract, useContractEvents } from "@thirdweb-dev/react"
import { STATUS_CONTRACT_ADDRESS } from "../constants/addresses";
import EventCard from "./eventCard";
import styles from "../styles/Home.module.css";
import Lottie from "lottie-react";
import loadingLottie from "../public/loadingLottie.json";
import { useEffect, useState } from "react";

export default function StatusEvents() {
    const [isLoading, setIsLoading] = useState(true);
    
    const {
        contract
    } = useContract(STATUS_CONTRACT_ADDRESS);

    const {
        data: statusEvents,
        isLoading: isStatusEventsLoading,
    } = useContractEvents(
        contract, 
        "StatusUpdated",
    {
        subscribe: true,
    }
    );

    useEffect(() => {
        // Set a timeout for 2 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        // Cleanup the timer when the component is unmounted
        return () => clearTimeout(timer);
    }, []);
    
    if(isLoading) {
        return (
            <div className={styles.sectionLoading}>
                <Lottie
                    animationData={loadingLottie}
                    loop={true}
                />
            </div>
        );
    };

    return (
        <div>
            {!isStatusEventsLoading && statusEvents && (
                statusEvents.slice(0, 30).map((event, index) => (
                    <EventCard
                        key={index}
                        walletAddress={event.data.user}
                        newStatus={event.data.newStatus}
                        timeStamp={event.data.timestamp}
                    />
                ))
            )}
        </div>
    )
};