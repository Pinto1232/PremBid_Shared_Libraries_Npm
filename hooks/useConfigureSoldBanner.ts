import { useCallback, useState } from "react";
import { LotStatus } from "../types";

export const useConfigureSoldBanner = () => {
  const [soldBanner, setSoldBanner] = useState<any>();

  const reserveMet = (lot: any) => {
    const reservePrice = lot?.reservePrice ? Number(lot.reservePrice) : 0;

    if (lot?.overrideWinningBidAmount) {
      return Number(lot.overrideWinningBidAmount) >= reservePrice;
    }

    if (lot?.winningRegisteredProfileAmount) {
      return Number(lot.winningRegisteredProfileAmount) >= reservePrice;
    }

    return reservePrice > 0 ? false : true;
  };

  const handleShowSoldBanner = useCallback((lot: any, liveUpdates: any, status: any) => {
    const endTime = new Date(lot?.endDateTimeAt);
    if (lot?.extendedBy) {
      endTime.setTime(endTime.getTime() + lot?.extendedBy * 1000);
    }

    const hasWinningBid = lot?.winningRegisteredProfileAmount || liveUpdates?.highestBid;
    const isReserveMet = reserveMet(lot) || liveUpdates?.reserveMet;

    let showBanner = false;
    let bannerText = "";

    if (lot?.sold) {
      showBanner = true;
      bannerText = "SOLD";
    } else if (status === LotStatus.COMPLETED && hasWinningBid && isReserveMet) {
      showBanner = true;
      bannerText = lot?.stcStatus === 1 ? "SOLD STC" : "SOLD";
    }
    setSoldBanner({ showBanner, bannerText });
  }, []);

  return { handleShowSoldBanner, soldBanner };
};
