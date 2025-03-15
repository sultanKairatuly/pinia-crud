import { defineStore, type Store } from "pinia";
import type { Product } from "./types";

type StoreState = {
  products: Product[];
};
export const useProducts = defineStore("products", {
  state(): StoreState {
    return {
      products: [],
    };
  },
  getters: {
    sortedProducts(state) {
      return [...state.products].sort((a, b) => b.id - a.id);
    },
  },
  actions: {
    async remove(product: Product) {
      const { status } = await useFetch<{ content: { rows: Product[] } }>(
        `/api/products?id=${product.id}`,
        { method: "delete" }
      );
      console.log("remove status: ", status);

      if (status.value === "success") {
        this.products = this.products.filter((p) => p.id !== product.id);
      }
    },
    async create(product: Omit<Product, "id">) {
      const response = await useFetch("/api/products", {
        method: "POST",
        body: JSON.stringify(product),
      });
      if (response.status.value === "success") {
        this.products.unshift({
          ...product,
          id: Math.random() * 10000,
        });
      }
    },
    async update(product: Product) {
      const response = await useFetch("/api/products", {
        method: "PUT",
        body: JSON.stringify(product),
      });
      if (response.status.value === "success") {
        const idx = this.products.findIndex((p) => p.id === product.id);
        this.products[idx] = { ...product };
      }
    },
    async getProducts() {
      const { data } = await useFetch<{ content: { rows: Product[] } }>(
        "/api/products"
      );
      if (Array.isArray(data.value)) {
        this.products = data.value;
      }
    },
  },
});
