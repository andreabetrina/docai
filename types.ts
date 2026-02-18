
export type Role = 'user' | 'ai';

export interface Message {
  id: string;
  role: Role;
  text: string;
  options?: string[];
  timestamp: Date;
}

export interface ApiResponse {
  message: string;
  suggestedOptions?: string[];
}
