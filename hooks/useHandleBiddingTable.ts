import { useReducer, useRef, useEffect, useState } from "react";
import { sortBy } from "lodash";
import { useHandleLoadLotData } from "../networking";

type TableRowData = {
  bidId?: string;
  paddleNumber: string;
  amount: number;
};

enum BidTableAction {
  Clear = "clear",
  Replace = "replace",
  Upsert = "upsert",
  RemoveBid = "removeBid",
  UpdateBidAmount = "updateBidAmount",
}

type useHandleBiddingTableArgs = {
  messageService: any;
  auctionId: string;
  lotId: string;
  currentUserProfileId?: string | null;
};

type TopBidderState = {
  amount: number;
  bidder: string;
};

const defaultBidder = "None";

const defaultTopBidderState = { amount: 0, bidder: defaultBidder };

export const useHandleBiddingTable = ({ messageService, auctionId, lotId, currentUserProfileId }: useHandleBiddingTableArgs) => {
  const subscriptionRef = useRef<any>();
  const [topBidder, setTopBidder] = useState<TopBidderState>(defaultTopBidderState);

  const [tableRowData, setTableRowData] = useReducer((state: TableRowData[], action: any): TableRowData[] => {
    switch (action.type) {
      case BidTableAction.Clear:
        return [];
      case BidTableAction.Replace:
        // when screen is opened.
        return sortBy(action.data, ["amount"]).reverse().slice(0, 15);
      case BidTableAction.Upsert:
        // when a bid is created and added to the table in real time.
        const newState = [...state];
        const { amount: incomingAmount, paddleNumber: incomingPaddleNumber } = action.data;
        const incomingAmountAsNumber = Number(incomingAmount);
        const indexMatchedEntry = newState.findIndex(({ amount, paddleNumber }) => amount === incomingAmountAsNumber && paddleNumber === incomingPaddleNumber);

        if (indexMatchedEntry !== -1) {
          newState[indexMatchedEntry] = { ...action.data, amount: incomingAmountAsNumber };
        } else {
          newState.push({ ...action.data, amount: incomingAmountAsNumber });
        }

        return sortBy(newState, ["amount"]).reverse().slice(0, 15);
      case BidTableAction.RemoveBid:
        return state.filter(({ bidId }) => bidId !== action.data.bidId);
      case BidTableAction.UpdateBidAmount:
        return state.map((tableRow) => {
          if (tableRow.bidId === action.data.bidId) {
            return { ...tableRow, ...action.data, amount: Number(action.data.amount) };
          }
          return tableRow;
        });
      default:
        return [...state];
    }
  }, []);

  const {
    data: remoteLotData,
    refetch: refetchRemoteLotData,
    ...restHandleLoadLotData
  } = useHandleLoadLotData(
    {
      queryParams: {
        auctionId,
        lotId,
        profileId: currentUserProfileId,
      },
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (remoteLotData) {
      const bidsArr: any[] = [];

      remoteLotData?.bids?.map((bid) => {
        if (!bidsArr.find((f) => f.amount === bid.amount && f.paddleNumber === bid.registeredProfile?.paddleNumber)) {
          bidsArr.push({
            bidId: bid.id,
            amount: bid.amount,
            paddleNumber: bid.registeredProfile.paddleNumber,
          });
        }
      });

      setTableRowData({ type: BidTableAction.Replace, data: bidsArr });
    }
  }, [remoteLotData]);

  useEffect(() => {
    const { amount, paddleNumber: bidder } = tableRowData[0] ?? {};

    if (amount && bidder) {
      setTopBidder({
        amount,
        bidder,
      });
    } else {
      setTopBidder(defaultTopBidderState);
    }
  }, [tableRowData]);

  useEffect(() => {
    if (subscriptionRef.current) subscriptionRef.current.unsubscribe();

    subscriptionRef.current = messageService.onMessage().subscribe((message: unknown) => {
      if (message) {
        const payload = (message as any).text;

        const {
          messageSubject,
          entityId, // lotId - lock/release of this lot has taken place
          lotId: notificationLotId,
          auctionId: notificationAuctionId,
          amount,
          topBidder: notificationTopBidder,
          bidAmount, // bid amount updated for specific lot,
          deleted, // bid deleted from specific lot
          bidId,
        } = payload.data;

        const isNotificationThisLot = entityId === lotId || notificationLotId === lotId;
        const isNotificationThisAuction = notificationAuctionId === auctionId;
        const mayAddBid = amount !== undefined && amount !== "" && notificationTopBidder !== undefined && notificationTopBidder !== "";

        try {
          if (isNotificationThisLot) {
            if (messageSubject === "BidUpdated") {
              if (deleted) {
                setTableRowData({
                  type: BidTableAction.RemoveBid,
                  data: {
                    bidId,
                  },
                });
              }

              if (bidAmount) {
                setTableRowData({
                  type: BidTableAction.UpdateBidAmount,
                  data: {
                    bidId,
                    amount: bidAmount,
                  },
                });
              }
            }
          }

          if (isNotificationThisAuction && isNotificationThisLot) {
            if (messageSubject === "CreateBid") {
              if (mayAddBid) {
                setTableRowData({
                  type: BidTableAction.Upsert,
                  data: {
                    bidId,
                    amount: amount,
                    paddleNumber: notificationTopBidder,
                  },
                });
              }
            }
          }
        } catch (e) {
          //TODO: may handle this error in the future
        }
      }
    });

    return function cleanup() {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = undefined;
    };
  }, [auctionId, lotId, messageService]);

  return {
    tableRowData,
    setTableRowData,
    topBidder,
    remoteLotData,
    refetchRemoteLotData,
    ...restHandleLoadLotData,
  };
};
