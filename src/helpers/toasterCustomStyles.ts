import type { ToastPosition } from "react-toastify";

export const toasterCustomStyles = {
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,

  style: {
    backgroundColor: "#fbfbfb",
    color: "#623f8b",
    fontSize: "16px",
    padding: "10px 40px",
    fontFamily: "var(--font)",
    borderRadius: "8px",
  },
  theme: "colored",
};

export const toastContainerStyles = {
  position: "bottom-center" as ToastPosition,
  padding: "10px",
  color: "white",
  fontFamily: "var(--font)",
  borderRadius: "8px",
  width: "400px",
};