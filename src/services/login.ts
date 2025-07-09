import { apiClient } from "./apiClient";

export const login = async (loginData: { username: string; password: string }) => {
  const response = await apiClient.post("/auth/login", loginData);
  return response.data;
};
