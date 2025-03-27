import { User } from "../dto/User";
import { UserProfiles } from "../dto/UserProfiles";

export class PrembidLocalStorage {
  private static _keys = {
    bidding_firebase_token: "bidding_firebase_token",
    current_user: "current_user",
    configs_version: "configs_version",
    configs: "configs",
  };

  public static set currentProfile(profileId: string) {
    const userString = sessionStorage.getItem(this._keys.current_user);

    if (userString !== null) {
      const user = JSON.parse(userString) as User;
      user.currentProfileId = profileId;

      const userJson = JSON.stringify(user);
      sessionStorage.setItem(this._keys.current_user, userJson);
    }
  }

  public static get currentProfile() {
    const userString = sessionStorage.getItem(this._keys.current_user);

    if (userString === null) {
      return "";
    } else {
      const user = JSON.parse(userString) as User;
      return user.currentProfileId;
    }
  }

  public static get currentProfileName() {
    const userString = sessionStorage.getItem(this._keys.current_user);

    if (userString === null) {
      return "";
    } else {
      const user = JSON.parse(userString) as User;
      const profile = user.profiles?.filter((profile) => profile.profileId === user.currentProfileId) as UserProfiles[];

      if (profile && profile[0]) {
        return profile[0].profileName;
      } else {
        return "";
      }
    }
  }

  public static get biddingFirebaseToken() {
    return sessionStorage.getItem(this._keys.bidding_firebase_token);
  }
  public static set biddingFirebaseToken(token: string | null) {
    if (token) sessionStorage.setItem(this._keys.bidding_firebase_token, token);
  }
  public static clearBiddingFirebaseToken() {
    sessionStorage.removeItem(this._keys.bidding_firebase_token);
  }

  public static get currentUser() {
    const userString = sessionStorage.getItem(this._keys.current_user);
    if (userString === null) return null;
    const user = JSON.parse(userString) as User;
    return user;
  }
  public static set currentUser(user: User | null) {
    const userJson = JSON.stringify(user);
    if (userJson) sessionStorage.setItem(this._keys.current_user, userJson);
  }
  public static clearCurrentUser() {
    sessionStorage.removeItem(this._keys.current_user);
  }

  //public static set profileData(newProfileData: Omit<UserProfiles, 'profileType'>) {
  //    const userString = sessionStorage.getItem(this._keys.current_user);

  //    if (userString) {
  //        const user = JSON.parse(userString) as User;
  //        const profiles = user.profiles?.map(profile => {

  //            if (profile.profileId === newProfileData.profileId) {
  //                return { ...profile, ...newProfileData };
  //            }

  //            return profile;
  //        })

  //        user.profiles = profiles ?? [];
  //        sessionStorage.setItem(this._keys.current_user, JSON.stringify(user));
  //    }
  //}

  public static set defaultProfile(profileId: string) {
    const userString = sessionStorage.getItem(this._keys.current_user);

    if (userString !== null) {
      const user = JSON.parse(userString) as User;
      const profiles = user.profiles?.map((profile) => ({ ...profile, isDefaultProfile: profile.profileId === profileId }));
      const userJson = JSON.stringify({ ...user, profiles: profiles ?? [] });
      sessionStorage.setItem(this._keys.current_user, userJson);
    }
  }

  public static upsertProfileToCurrentUser(profileId: string, profileName: string, profileEmail: string, profilePhoneNumber: string, isDefaultProfile: boolean | null) {
    const user: any = this.currentUser;

    if (!user) return;

    if (isDefaultProfile) {
      user.profiles = user.profiles?.map((profile: UserProfiles) => ({ ...profile, isDefaultProfile: profile.profileId === profileId }));
    }

    const existingProfile = user.profiles?.find((profile: UserProfiles) => profile.profileId === profileId);
    if (existingProfile) {
      existingProfile.profileName = profileName;
      existingProfile.profileEmail = profileEmail;
      existingProfile.profilePhoneNumber = profilePhoneNumber;
      existingProfile.isDefaultProfile = isDefaultProfile;
    } else
      user.profiles?.push({
        profileId: profileId,
        profileName: profileName,
        profileEmail: profileEmail,
        profilePhoneNumber: profilePhoneNumber,
        isDefaultProfile: isDefaultProfile,
      } as UserProfiles);

    const userJson = JSON.stringify(user);
    if (userJson) {
      sessionStorage.setItem(this._keys.current_user, userJson);
    }
  }

  public static removeProfileFromCurrentUser(profileId: string, defaultProfileId: string | null) {
    const user: any = this.currentUser;

    if (!user) return;

    if (defaultProfileId) {
      user.profiles = user.profiles?.map((profile: UserProfiles) => ({ ...profile, isDefaultProfile: profile.profileId === defaultProfileId }));
    }

    user.profiles = user.profiles?.filter((profile: UserProfiles) => profile.profileId !== profileId) as UserProfiles[];
    const userJson = JSON.stringify(user);
    if (userJson) {
      sessionStorage.setItem(this._keys.current_user, userJson);
    }
  }

  public static removeAllData() {
    sessionStorage.clear();
  }

  //public static get configVersion() {
  //    return sessionStorage.getItem(this._keys.configs_version);
  //}
  //public static set configVersion(version: string | null) {
  //    if (version)
  //        sessionStorage.setItem(this._keys.configs_version, version);
  //}

  //public static get configs() {
  //    return sessionStorage.getItem(this._keys.configs);
  //}

  //public static set configs(configObj: any | null) {
  //    if (configObj)
  //        sessionStorage.setItem(this._keys.configs, configObj);
  //}
}
