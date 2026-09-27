import { useFavoritesStore } from "../store/favouritesStore";
import Favorite from "@mui/icons-material/Favorite";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function FavouritesList() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  return (
    <div className="favourites-section">
      <h2>
        <Favorite className="section-icon" /> Sản phẩm yêu thích ({favorites.length})
      </h2>

      {favorites.length === 0 ? (
        <p className="empty-msg">Bạn chưa có sản phẩm yêu thích nào.</p>
      ) : (
        <ul className="favourites-list">
          {favorites.map((product) => (
            <li key={product.id} className="favourite-item">
              <img src={product.thumbnail} alt={product.title} />
              <div className="favourite-info">
                <span>{product.title}</span>
                <span className="price">${product.price}</span>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFavorite(product.id)}
                title="Xoá khỏi yêu thích"
              >
                <DeleteOutlineOutlinedIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
