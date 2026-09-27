import { useEffect } from "react";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

interface ToastProps {
  message: string;
  visible: boolean;
  type: "add" | "remove";
  onHide: () => void;
}

export default function Toast({ message, visible, type, onHide }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onHide, 3000);
    return () => clearTimeout(timer);
  }, [visible, onHide]);

  const isAdd = type === "add";

  return (
    <div className={`toast ${isAdd ? "toast--add" : "toast--remove"} ${visible ? "toast--show" : ""}`}>
      <span className="toast-icon-wrap">
        {isAdd ? (
          <Favorite className="toast-heart" />
        ) : (
          <FavoriteBorder className="toast-heart-outline" />
        )}
        {isAdd ? (
          <CheckCircleOutlineOutlinedIcon className="toast-check toast-check--green" />
        ) : (
          <RemoveCircleOutlineOutlinedIcon className="toast-check toast-check--gray" />
        )}
      </span>
      <span className="toast-msg">{message}</span>
    </div>
  );
}
