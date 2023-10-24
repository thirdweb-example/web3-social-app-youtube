import Link from "next/link";
import styles from "../styles/Home.module.css";
import { truncateAddress } from "../utils/truncateAddress";
import { BigNumber } from "ethers";

type EventCardProps = {
    walletAddress: string;
    newStatus: string;
    timeStamp: BigNumber;
};

export default function EventCard(props: EventCardProps) {
    const date = new Date(props.timeStamp.toNumber() * 1000);

    return (
        <div className={styles.eventCard}>
            <div className={styles.eventHeader}>
                <Link href={`account/${props.walletAddress}`} style={{ color: "white" }}>
                    <p className={styles.connectedAddress}>{truncateAddress(props.walletAddress)}</p>
                </Link>
                <p style={{ fontSize: "0.75rem" }}>{date.toLocaleString()}</p>
            </div>
            <p style={{ fontSize: "16px"}}>{props.newStatus}</p>
        </div>
    );
};