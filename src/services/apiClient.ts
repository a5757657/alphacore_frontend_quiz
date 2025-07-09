import axios, { AxiosError, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  path?: string;
}

export const getErrorMessage = (status: number): string => {
  switch (status) {
    case 201:
      return "創建成功";
    case 401:
      return "未授權 - 請檢查您的登入憑證";
    case 403:
      return "禁止訪問 - 您沒有權限執行此操作";
    case 404:
      return "未找到 - 請求的資源不存在";
    default:
      return "發生未知錯誤";
  }
};

export const apiClient = axios.create({
  baseURL: "https://dev.tapgo.cc/test",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
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
      config.headers.Authorization = token;
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
    if (error.response?.data.path === "/test/auth/login") {
      return Promise.reject(error);
    } else {
      alert(getErrorMessage(error.response?.status || 401));
      localStorage.clear();
      window.location.href = "/";
    }
  }
);
