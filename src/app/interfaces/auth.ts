export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  value: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
