import wretch from "wretch";
import { url } from "./server";

export const api = () => wretch(url);

export const fetcher = (path: string): Promise<any> => {
  return api().get(path).json();
};
