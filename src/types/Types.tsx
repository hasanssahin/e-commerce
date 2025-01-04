export interface UserType {
  username: string
  password: string
}

export interface AuthenticationResponse {
  accessToken: string
  refreshToken: string
}
