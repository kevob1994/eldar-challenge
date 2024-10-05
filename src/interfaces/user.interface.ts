export interface IUser {
  id: string;
  name: string;
  role: ERole;
}

export enum ERole {
  User = "user",
  Admin = "admin",
}