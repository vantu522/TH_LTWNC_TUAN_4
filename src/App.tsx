import { useCallback, useEffect, useState } from "react";
import type { Product } from "./types/product";
import ProductCard from "./components/ProductCard";
import FavouritesList from "./components/FavouritesList";
import Toast from "./components/Toast";
import "./App.css";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "add" | "remove" }>({
    visible: false,
    message: "",
    type: "add",
  });

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=9")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const showToast = useCallback((product: Product, action: "add" | "remove") => {
    const message =
      action === "add"
        ? `Đã thêm "${product.title}" vào yêu thích!`
        : `Đã xoá "${product.title}" khỏi yêu thích.`;
    setToast({ visible: true, message, type: action });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛍️ Cửa hàng Zustand</h1>
        <p className="subtitle">Quản lý yêu thích với Zustand Store</p>
      </header>

      <main className="app-main">
        <FavouritesList />

        <section className="products-section">
          <h2>📦 Danh sách sản phẩm</h2>
          {loading ? (
            <p className="loading">Đang tải sản phẩm...</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onShowPopup={showToast}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Toast
        message={toast.message}
        visible={toast.visible}
        type={toast.type}
        onHide={hideToast}
      />
    </div>
  );
}

export default App;
