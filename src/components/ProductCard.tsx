import type { Product } from "../types/product";
import { useFavoritesStore } from "../store/favouritesStore";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

interface Props {
  product: Product;
  onShowPopup: (product: Product, action: "add" | "remove") => void;
}

export default function ProductCard({ product, onShowPopup }: Props) {
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);

  const favorited = isFavorite(product.id);

  const handleToggle = () => {
    if (favorited) {
      removeFavorite(product.id);
      onShowPopup(product, "remove");
    } else {
      addFavorite(product);
      onShowPopup(product, "add");
    }
  };

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <div className="product-info">
        <h3>{product.title}</h3>
        {product.brand && <p className="brand">{product.brand}</p>}
        <p className="price">${product.price}</p>
        {product.rating && (
          <p className="rating">⭐ {product.rating.toFixed(1)}</p>
        )}
      </div>
      <button
        className={`fav-btn ${favorited ? "fav-btn--active" : ""}`}
        onClick={handleToggle}
        title={favorited ? "Xoá khỏi yêu thích" : "Thêm vào yêu thích"}
      >
        {favorited ? (
          <>
            <Favorite className="fav-icon" /> Đã yêu thích
          </>
        ) : (
          <>
            <FavoriteBorder className="fav-icon" /> Yêu thích
          </>
        )}
      </button>
    </div>
  );
}
