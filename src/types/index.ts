// Common types
export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  message?: string;
  data?: T;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Auth related types
export interface Theme {
  floorColor: string;
  wallColor: string;
  weather: "sunny" | "raining" | "cloudy" | "snowing" | "night" | "sunset";
}

export interface OnboardingResponse {
  question: string;
  answer: string;
}

export interface AIAnalysis {
  choice: number;
  reason: string;
  theme: string;
  analyzedAt: Date;
  responses: OnboardingResponse[];
}

export interface JWTPayload {
  id: string;
  email: string;
  name?: string;
}

export interface UserPayload extends JWTPayload {
  theme: Theme;
  invitation?: string;
  objectIds: any[];
  modifiedObjectIds: any[];
  onboardingResponses?: OnboardingResponse[];
  onboardingCompleted?: boolean;
  onboardingCompletedAt?: Date;
  aiAnalysis?: AIAnalysis;
  createdAt: Date;
  questionIndex: number;
}

// Extend Express namespace
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface User extends UserPayload {}
    interface Request {
      user?: User;
      files?:
        | Express.Multer.File[]
        | { [fieldname: string]: Express.Multer.File[] };
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */
