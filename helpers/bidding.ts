export const isReserveMet = (reservePrice = 0, topBid = 0) => {
  return reservePrice === 0 ? true : Number(topBid) >= Number(reservePrice);
};
