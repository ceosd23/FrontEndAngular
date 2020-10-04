export interface LoginResponse
{
  authenticateToken: string;
  username: string;
  refreshToken: string;
  expiresAt: Date;
}
