import { UserProfiles } from "./UserProfiles";

export class User {
  jwtToken: string | null;
  email: string | null;
  userId: string | null;
  profiles: UserProfiles[] | null;
  currentProfileId: string;

  constructor(userId: string | null, email: string | null, jwtToken: string | null, profiles: UserProfiles[] | null, currentProfileId: string) {
    this.userId = userId;
    this.email = email;
    this.jwtToken = jwtToken;
    this.profiles = profiles;
    this.currentProfileId = currentProfileId;
  }
}
