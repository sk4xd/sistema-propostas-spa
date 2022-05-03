export interface UserToken {
  user: {
    email: string;
    name: string;
    isAdmin: boolean;
  };
  token?: string;
  refresh_token?: string;
}
