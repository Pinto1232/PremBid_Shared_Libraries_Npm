import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

export type HistoricNotificationsListEntry = {
  auctionId?: string;
  createdAt?: string;
  createdByUserId?: string;
  deletedAt?: string | null;
  deletedByUserId?: string | null;
  deliveryMethod?: number;
  failedToSend?: boolean;
  id?: string;
  isDelaySend?: boolean;
  isRead?: boolean;
  isSent?: boolean;
  isOnWishlist?: boolean;
  jsonData?: {
    auctionId?: string;
    destination?: string;
    lotBiddingLink?: string;
    lotId?: string;
    message?: string;
    messageSubject?: string;
    profileId?: string;
    title?: string;
  };
  modifiedAt?: string;
  modifiedByUserId?: string | null;
  notificationScope?: number;
  notificationType?: number;
  profileId?: string;
  readDateTime?: string | null;
  sendDateTime?: string | null;
  sentDateTime?: string;
  vendorId?: string;
};

export type HistoricNotifications = {
  generalUnreadCount?: number;
  list?: HistoricNotificationsListEntry[];
  pagination?: Pagination;
  unreadNotificationCount?: number;
};

export type Pagination = {
  currentPage?: number;
  pageSize?: number;
  total?: number;
};

export type ActiveLotListEntryNotification = {
  createdAt?: string;
  id?: string;
  isRead?: boolean;
  jsonData?: {
    auctionId?: string;
    destination?: string;
    lotBiddingLink?: string;
    lotId?: string;
    message?: string;
    messageSubject?: string;
    profileId?: string;
    title?: string;
  } | null;
};

export type ActiveLotListEntry = {
  imageUrl?: string;
  lotId?: string;
  name?: string;
  notifications?: ActiveLotListEntryNotification[];
  profileId?: string;
};

export type LotNotifications = {
  activeLotList?: ActiveLotListEntry[];
};

export type ClientStyles = {
  FontFileName?: string;
  OverrideBottomBarBackgroundColor?: string;
  OverrideFooterBackgroundColor?: string;
  OverrideFooterSubTextColor?: string;
  OverrideFooterSubTextHoverColor?: string;
  OverrideFooterTextColor?: string;
  OverrideHeaderSectionBackgroundColor?: string;
  OverrideHeaderSectionIconBackground?: string;
  OverrideHeaderSectionIconText?: string;
  OverrideHeaderSectionSubTextColor?: string;
  OverrideHeaderSectionTextColor?: string;
  OverrideHomeMiddleSectionBackgroundColor?: string;
  OverrideLoadingSpinnerBackgroundColor?: string;
  OverrideLoadingSpinnerColor?: string;
  OverrideLoadingSpinnerTextColor?: string;
  OverrideNavBarAvatarBackgroundColor?: string;
  OverrideNavBarAvatarTextColor?: string;
  OverrideNavBarBackgroundColor?: string;
  OverrideNavBarCallToActionColor?: string;
  OverrideNavBarTextColor?: string;
  OverridePageBackgroundColor?: string;
  OverridePageSubTextColor?: string;
  OverridePageTextColor?: string;
  OverridePagingTextColor?: string;
  OverrideSearchBarBackgroundColor?: string;
  OverrideSearchBarTextColor?: string;
  OverrideTopBarBackgroundColor?: string;
  OverrideTopBarTextColor?: string;
  OverrideSidebarBackgroundColor?: string;
  Primary?: string;
  Secondary?: string;
} & OptionalStyleProperty;

type OptionalStyleProperty = { [key: string]: string | undefined };

export type ClientConfig = {
  AboutUsUrl?: string;
  AndroidAppUrl?: string;
  AuctionName?: string;
  ClientTermsOfUse?: string;
  ContactUsUrl?: string;
  CurrencySymbol?: string;
  FacebookUrl?: string;
  GoogleMapsApiKey?: string;
  IOSAppUrl?: string;
  InstagramUrl?: string;
  LinkedInUrl?: string;
  LotName?: string;
  ProductLogoUrl?: string;
  ProductName?: string;
  ProductPrivacyPolicy?: string;
  ProductSupportEmail?: string;
  ProductTermsOfUse?: string;
  ProductWebsite?: string;
  Styles: ClientStyles;
  TwitterUrl?: string;
  VendorAddress?: string;
  VendorBannerUrl?: string;
  VendorContactNumber?: string;
  VendorDescription?: string;
  VendorEmailAddress?: string;
  VendorFaviconUrl?: string;
  VendorLogoUrl?: string;
  VendorName?: string;
  VendorSlogan?: string;
  VendorSupportEmailAddress?: string;
  VendorWebsite?: string;
};

export type Address = {
  searchString: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  longitude: number;
  latitude: number;
  id: string;
  createdByUserId: string;
  modifiedByUserId?: string;
  createdAt: string;
  modifiedAt?: string;
};

export type Venue = {
  name: string;
  description: string;
  dataCaptured: DataCaptured;
  vendorId: string;
  addressId: string;
  address: Address;
  deletedByUserId?: string;
  deletedAt?: string;
  id: string;
  createdByUserId: string;
  modifiedByUserId?: string;
  createdAt: string;
  modifiedAt?: string;
};

export type AdditionalProperty = {
  id: string;
  name: string;
  order: number;
  value: string;
  hidden: boolean;
};

export type DataCaptured = {
  additionalProperties: AdditionalProperty[];
};

export type Calculation = {
  id: string;
  type: string;
  order: number;
  amount: number;
  basedOn: string;
  description: string;
};

export type BiddingCalculation = {
  applyVat: boolean;
  calculations: Calculation[];
};

export type Lot = {
  id: string;
  vendorId: string;
  auctionId: string;
  name: string;
  description: string;
  stcStatus: number;
  reservePrice: number;
  guidePrice: number;
  number: string;
  depositAmount: number;
  startingPrice: number;
  skuNumber: string;
  defaultMinimumIncrement: number;
  defaultBidExtension: number;
  dataCaptured: DataCaptured;
  isActive: boolean;
  winningRegisteredProfileId?: string;
  winningRegisteredProfileAmount?: number | string | null;
  lotTypeId: string;
  deletedAt?: string;
  thumbnailUrl: string;
  paddleNumber?: string;
  topBid?: number;
  extendedBy: number;
  startDateTimeAt: string;
  endDateTimeAt: string;
  overrideWinningBidId?: string;
  uniqueCode: string;
  sold: boolean;
  auctionClosed: boolean;
  showReserve: boolean;
  locked: boolean;
  lockedByUserId?: string;
  incrementTableId?: string;
  incrementTableName?: string;
  incrementTableDataCaptured?: any;
  incrementTable?: string;
  biddingCalculationId?: string;
  overrideWinningBidAmount?: string | number;
  showPaddleNumber?: boolean;
  imageUrl?: string;
  commission?: number | null;
  biddingCalculation?: null | BiddingCalculation;
};

export type RegisteredProfile = {
  profileId: string;
  vendorId: string;
  auctionId: string;
  lotId?: string;
  status: number;
  reason: string;
  paddleNumber: string;
  manualRegistration: boolean;
  complianceStatus?: any;
  id: string;
  createdByUserId: string;
  modifiedByUserId: string;
  createdAt: string;
  modifiedAt: string;
};

export type Bid = {
  vendorId: string;
  auctionId: string;
  lotId: string;
  registeredProfileId: string;
  registeredProfile: RegisteredProfile;
  amount: number;
  notificationSent: boolean;
  id: string;
  createdByUserId: string;
  modifiedByUserId?: string;
  createdAt: string;
  modifiedAt?: string;
};

export type IndividualProfileDataCaptured = object;

export type CompanyProfileDataCaptured = object;

export type UploadedDocument = {
  documentUrl: string;
  documentName: string;
  documentType: string;
  documentTemplateId: string;
};

export type RegisteredAuctionUser = {
  id: string;
  vendorId: string;
  auctionId: string;
  lotId?: string;
  paddleNumber: string;
  profileId: string;
  status: number;
  reason: string;
  profileType: string;
  individualProfileIdentityUserId?: string;
  individualProfileEmail?: string;
  individualProfilePhoneNumber?: string;
  individualProfileFirstName?: string;
  individualProfileLastName?: string;
  individualProfileDataCaptured: IndividualProfileDataCaptured;
  individualProfileDeletedAt?: string;
  companyProfileIdentityUserId?: string;
  companyProfileEmail?: string;
  companyProfilePhoneNumber?: string;
  companyProfileFirstName?: string;
  companyProfileLastName?: string;
  companyProfileDataCaptured?: CompanyProfileDataCaptured;
  companyProfileCompanyName?: string;
  companyProfileTradingName?: string;
  companyProfileRegistrationNumber?: string;
  companyProfileVATNumber?: string;
  companyProfileDeletedAt?: string;
  requiredDocuments?: any;
  uploadedDocuments: UploadedDocument[];
  registrationProcessDocuments: RegistrationProcessDocument[];
  complianceStatus: string;
  modifiedAt: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  zip: string;
};

export type Note = {
  note: string;
  userId: string;
  createdAt: string;
};

export type RegistrationProcessDocument = {
  id: string;
  date: string;
  type: string;
  notes: Note[];
  status: string;
  documentUrl: string;
  documentName: string;
  documentExtension: string;
  documentTemplateId: string;
  documentTemplateName: string;
};

export enum FileExportType {
  CSV = 0,
  PDF = 1,
}

export type SendStartedNotification = {
  date: string;
  note: string;
  success: boolean;
};

export type SendStartingSoonNotification = {
  date: string;
  note: string;
  success: boolean;
};

export type ProcessingStatus = {
  sendStartedNotification: SendStartedNotification;
  sendStartingSoonNotification: SendStartingSoonNotification;
};

export type Auction = {
  name: string;
  description: string;
  depositAmount: number;
  defaultMinimumIncrement: number;
  defaultBidExtension: number;
  defaultSTCStatus: number;
  defaultCommission: number;
  startDateTimeAt: string;
  endDateTimeAt: string;
  isActive: boolean;
  auctionType: number;
  auctionStatus: number;
  streamUrl?: string;
  processingStatus: ProcessingStatus;
  vendorId: string;
  defaultLotTypeId: string;
  defaultVenueId?: string;
  defaultContactId: string;
  deletedByUserId?: string;
  deletedAt?: string;
  bankDetailsId?: string;
  defaultRollingTimerExtention?: any;
  defaultShowReserve: boolean;
  defaultShowPaddleNumber: boolean;
  defaultWatermarkImages: boolean;
  defaultIncrementTableId?: string;
  defaultBiddingCalculationId?: string;
  auctionImages?: any;
  id: string;
  createdByUserId: string;
  modifiedByUserId: string;
  createdAt: string;
  modifiedAt: string;
  userId: string;
  venue: Venue;
};

export enum DocumentTypeEnum {
  Lot = 0,
  IndividualProfile = 1,
  CompanyProfile = 2,
  Auction = 3,
}

export type DocResultValue = {
  id: string;
  documentUrl: string;
};

export type LotInstantNotification = {
  auctionId?: string;
  lotBiddingLink?: string;
  lotId?: string;
  message?: string;
  messageSubject?: string;
  profileId?: string;
  title?: string;
};

export interface UserDTO {
  currentProfile: UserProfileDTO | null;
  email: string | null;
  jwtToken: string | null;
  profiles: UserProfileDTO[] | null;
  userId: string | null;
  fbToken?: string | null;
  isLoggedIn: boolean | null;
}

export interface UserProfileDTO {
  profileId: string | null;
  profileName: string | null;
  profileType: string | null;
  profileEmail: string | null;
  profilePhoneNumber: string | null;
  isDefaultProfile: boolean | null;
}

export type HistoricMessageInstantNotification = {
  auctionId?: string;
  message?: string;
  messageSubject?: string;
  profileId?: string;
  title?: string;
};

export type RemoteInstantNotificationData = LotInstantNotification | HistoricMessageInstantNotification;

export type RemoteInstantNotification = Omit<FirebaseMessagingTypes.RemoteMessage, "data"> & {
  data?: RemoteInstantNotificationData;
};

export type AdditionalLotProperty = {
  id?: string;
  name?: string;
  order?: number;
  value?: string;
};

export enum AuctionTypeEnum {
  "Timed" = 0,
  "Streamed" = 1,
  "Tender" = 2,
}
export type CountDownTimer = {
  status?: LotStatus;
  countdownHeader?: string;
  countdownDate?: string;
  countdownKey?: LotStatus;
};

export enum LotStatus {
  AWAITING = "AWAITING",
  STARTED = "STARTED",
  COMPLETED = "COMPLETED",
}

export type LotAddress = {
  longitude?: number;
  latitude?: number;
  name?: string;
};

export type Image = {
  name?: string;
  url?: string;
  deletedByUserId?: string;
  deletedAt?: string;
  contactId?: string;
  contact?: any;
  id: string;
  createdByUserId?: string;
  modifiedByUserId?: string;
  createdAt?: string;
  modifiedAt?: string;
};

export type Contact = {
  imageId?: string;
  image?: Image;
  vendorId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  jsonData?: any;
  source?: string;
  deletedByUserId?: string;
  deletedAt?: string;
  id: string;
  createdByUserId?: string;
  modifiedByUserId?: string;
  createdAt?: string;
  modifiedAt?: string;
};

export type LotContact = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
};
