import wretch from "wretch";
import { url } from "./server"; 

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

interface CreateUserRequest {
  user: UserData;
}

// Remove unused UpdateAvatarRequest since we're using inline typing below

export const api = wretch(url + "api/");

export const createOrUpdateUser = (data: CreateUserRequest) => {
  return api
    .url("telusers/")
    .json(data)
    .post()
    .json<{ status: string; user?: UserData; error?: string }>();
};

export const updateUserAvatar = (telegram_id: number, avatar: string) => {
  return api
    .url("telusers/avatar/")
    .json({ telegram_id, avatar })
    .post()
    .json<{ status: string; error?: string }>();
};

export const fetcher = <T>(endpoint: string): Promise<T> => {
  return api.get(endpoint).json<T>();
};