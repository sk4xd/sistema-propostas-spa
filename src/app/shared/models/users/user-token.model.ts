export interface UserToken {
  user: {
    email: string;
    name: string;
  };
  token?: string;
  refresh_token?: string;
}
