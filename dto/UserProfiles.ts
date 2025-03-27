export class UserProfiles {
  profileId: string | null;
  profileName: string | null;
  profileEmail: string | null;
  profilePhoneNumber: string | null;
  profileType: string | null;
  isDefaultProfile: boolean | null;

  constructor(profileId: string | null, profileName: string | null, profileEmail: string | null, profilePhoneNumber: string | null, profileType: string | null, isDefaultProfile: boolean | null) {
    this.profileId = profileId;
    this.profileName = profileName;
    this.profileEmail = profileEmail;
    this.profilePhoneNumber = profilePhoneNumber;
    this.profileType = profileType;
    this.isDefaultProfile = isDefaultProfile;
  }
}
