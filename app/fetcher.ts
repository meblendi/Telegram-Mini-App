import wretch from "wretch";
import { url } from "./server";

export const api = wretch(url + "api/"); // Note the added "api/"

export const createOrUpdateUser = (userData: any) => {
  return api
    .url("/telusers/")
    .json(userData)
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