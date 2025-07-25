import wretch from "wretch";
import { url } from "./server";

// First, define your core user types
interface TelegramUserCore {
  id: number; // This matches what Telegram provides
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

// Response from your backend API
interface TelegramUserResponse extends TelegramUserCore {
  telegram_id: number; // Your backend uses this field name
  avatar: string;
  points?: number;
  streak?: number;
  time_spent?: number;
}

// Request payload for creating/updating users
interface CreateUserRequest {
  user: TelegramUserCore; // What Telegram provides
}

export const api = wretch(url).url("/api");

export const createOrUpdateUser = (data: CreateUserRequest) => {
  return api
    .url("/telusers/")
    .json({
      user: {
        ...data.user,
        telegram_id: data.user.id,
      },
    })
    .post()
    .json<TelegramUserResponse>()
    .catch((error) => {
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
    .json<TelegramUserResponse>(); // Use the new interface
};

export const fetcher = <T>(endpoint: string): Promise<T> => {
  return api.get(endpoint).json<T>();
};
