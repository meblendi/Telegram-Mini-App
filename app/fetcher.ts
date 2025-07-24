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

interface UpdateAvatarRequest {
  telegram_id: number;
  avatar: string;
}

export const api = wretch(url + "api/");

export const createOrUpdateUser = (data: CreateUserRequest) => {
  return api
    .url("/telusers/")
    .json(data)
    .post()
    .json();
};

export const updateUserAvatar = (telegram_id: number, avatar: string) => {
  return api
    .url("/telusers/avatar/")
    .json({ telegram_id, avatar })
    .post()
    .json();
};

// Optional: Add this if you need a generic fetcher
export const fetcher = (endpoint: string): Promise<any> => {
  return api.get(endpoint).json();
};