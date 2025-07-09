"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { AxiosError } from "axios";

import { getErrorMessage } from "@/services/apiClient";
import { login } from "@/services/login";

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<{ username: string; password: string }>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      setDisabled(true);
      const res = await login(data);
      localStorage.setItem("authToken", res.token);
      router.push("/table");
    } catch (error: unknown) {
      setDisabled(false);
      setOpen(true);
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      setErrorMessage(status ? getErrorMessage(status) : "登入失敗，請稍後再試");
    }
  };
  return (
    <>
      <div className="pt-20">
        <Paper
          onSubmit={handleSubmit(handleLogin)}
          component="form"
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
            margin: "0 auto"
          }}
        >
          <TextField
            placeholder="用戶名稱"
            label="用戶名稱"
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }
            }}
            {...register("username", {
              required: {
                value: true,
                message: "用戶名稱為必填"
              }
            })}
          />
          <TextField
            placeholder="密碼"
            label="密碼"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    sx={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                    position="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </InputAdornment>
                )
              }
            }}
            {...register("password", {
              required: {
                value: true,
                message: "密碼為必填"
              }
            })}
          />
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid size={6}>
              <Button
                disabled={disabled}
                onClick={() => reset()}
                fullWidth
                type="button"
                variant="contained"
                color="secondary"
              >
                重置
              </Button>
            </Grid>
            <Grid size={6}>
              <Button
                disabled={disabled}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                登入
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  );
}
