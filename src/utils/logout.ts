export const Logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/";
};
