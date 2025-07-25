import wretch from "wretch";
import { url } from "./server"; 

export interface TelegramUserResponse {
    telegram_id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code: string;
    is_premium?: boolean;
    avatar: string;
    points?: number;
    streak?: number;
    time_spent?: number;
}

interface CreateUserRequest {
  user: TelegramUserResponse;
}

// Remove unused UpdateAvatarRequest since we're using inline typing below

export const api = wretch(url).url("/api");

export const createOrUpdateUser = (data: CreateUserRequest) => {
  return api
    .url("/telusers/")
    .json(data)
    .post()
    .json<TelegramUserResponse>()
    .catch(error => {
      console.error("API Error:", error);
      throw error;
    });
};

export const updateUserAvatar = (telegram_id: number, avatar: string) => {
  return api
    .url("/telusers/avatar/")
    .json({ telegram_id, avatar })
    .post()
    .json<{ status: string; error?: string }>();
};

export const getUser = (telegram_id: number) => {
  return api
    .url(`/telusers/${telegram_id}/`)
    .get()
    .json<TelegramUserResponse>();  // Use the new interface
};

export const fetcher = <T>(endpoint: string): Promise<T> => {
  return api.get(endpoint).json<T>();
};
