import { AuctionTypeEnum } from "../types";

export const isTender = (auctionType: AuctionTypeEnum) => Number(auctionType) === Number(AuctionTypeEnum.Tender.toString());
export const isTimed = (auctionType: AuctionTypeEnum) => Number(auctionType) === Number(AuctionTypeEnum.Timed.toString());
export const isStreamed = (auctionType: AuctionTypeEnum) => Number(auctionType) === Number(AuctionTypeEnum.Streamed.toString());

export const AuctionTypesList = (): any[] => {
  const types = [] as any;
  for (const enumMember in AuctionTypeEnum) {
    const isValueProperty = parseInt(enumMember, 10) >= 0;
    if (isValueProperty) {
      types.push({
        value: enumMember,
        label: AuctionTypeEnum[enumMember],
      });
    }
  }
  return types;
};
