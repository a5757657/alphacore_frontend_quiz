import axios, { AxiosError, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
}

export const apiClient = axios.create({
  baseURL: "https://dev.tapgo.cc/test",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 動態設置 Token（登入後調用）
export function setAuthToken(token: string) {
  if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.Authorization;
  }
}

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 請求攔截器（可選）
apiClient.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>) => response,
  (error: AxiosError<ApiError>) => {
    return Promise.reject(error);
  }
);
