import { useEffect } from "react";
import type { Product } from "../types/product";
import Favorite from "@mui/icons-material/Favorite";
import Close from "@mui/icons-material/Close";
import Star from "@mui/icons-material/Star";
import LocalOffer from "@mui/icons-material/LocalOffer";
import StorefrontOutlined from "@mui/icons-material/StorefrontOutlined";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function FavouritePopup({ product, onClose }: Props) {
  // Đóng bằng phím Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!product) return null;

  return (
    <>
      {/* Overlay mờ */}
      <div className="popup-overlay" onClick={onClose} />

      {/* Popup card */}
      <div className="popup-card" role="dialog" aria-modal="true">
        {/* Nút đóng */}
        <button className="popup-close" onClick={onClose} title="Đóng">
          <Close />
        </button>

        {/* Badge */}
        <div className="popup-badge">
          <Favorite className="popup-badge-icon" /> Đã thêm vào yêu thích!
        </div>

        {/* Ảnh */}
        <div className="popup-img-wrap">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        {/* Thông tin */}
        <div className="popup-body">
          <h3 className="popup-title">{product.title}</h3>

          {product.brand && (
            <p className="popup-meta">
              <StorefrontOutlined className="popup-meta-icon" />
              {product.brand}
            </p>
          )}

          <div className="popup-row">
            <span className="popup-price">
              <LocalOffer className="popup-meta-icon" />${product.price}
            </span>
            {product.rating && (
              <span className="popup-rating">
                <Star className="popup-meta-icon star" />
                {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          {product.description && (
            <p className="popup-desc">{product.description}</p>
          )}
        </div>
      </div>
    </>
  );
}
