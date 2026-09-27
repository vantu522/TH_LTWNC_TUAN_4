import { create } from "zustand";
import type { Product } from "../types/product";

interface FavoritesState {
  favorites: Product[];

  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  addFavorite: (product) =>
    set((state) => ({
      favorites: [...state.favorites, product],
    })),

  removeFavorite: (productId) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (product) => product.id !== productId
      ),
    })),

  isFavorite: (productId) =>
    get().favorites.some((product) => product.id === productId),
}));

// Zustand không cần tạo slice, action, reducer hay sử dụng dispatch như Redux Toolkit.
// State và các hàm xử lý được đặt trực tiếp trong một store riêng, giúp code ngắn gọn và dễ theo dõi.
// Tuy nhiên, Zustand có ít quy tắc và cấu trúc hơn Redux Toolkit nên với ứng dụng rất lớn, việc tổ chức store cần được quản lý cẩn thận.
// So với Redux Toolkit, Zustand phù hợp với những state cần chia sẻ nhưng logic không quá phức tạp.
// Redux Toolkit có hệ sinh thái và cấu trúc chặt chẽ hơn, đặc biệt hữu ích khi ứng dụng có nhiều logic state phức tạp.