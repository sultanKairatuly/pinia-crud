<script setup lang="ts">
import { ref } from "vue";
import { useProducts } from "./store";
import type { Product } from "./types";

const name = ref("");
const amount = ref(0);
const store = useProducts();
const editing = ref(false);
const disabledIs = computed(
  () => name.value.length === 0 || amount.value === 0
);

store.getProducts();
async function createProduct() {
  const product = {
    product_name: name.value,
    product_amount: Number(amount.value),
  };

  store.create(product);
  name.value = "";
  amount.value = 0;
}

const editingProduct = ref<Product>({
  product_name: "",
  product_amount: 0,
  id: 0,
});

function startUpdateProduct(product: Product) {
  editing.value = true;
  editingProduct.value = { ...product };
}

function cancelUpdation() {
  editingProduct.value = {
    product_name: "",
    product_amount: 0,
    id: 0,
  };
  editing.value = false;
}

function updateProduct() {
  store.update({ ...editingProduct.value });
  cancelUpdation();
}
</script>

<template>
  <div>
    <div class="controls">
      <input placeholder="Название" class="input" type="text" v-model="name" />
      <input
        placeholder="Количество"
        type="number"
        class="input"
        v-model="amount"
      />
      <button @click="createProduct" :disabled="disabledIs" class="button">
        Создать
      </button>
    </div>

    <div class="products">
      <div v-for="product in store.sortedProducts" :key="product.id" class="product">
        <div v-if="editingProduct.id === product.id">
          <div>
            <input
              placeholder="Название"
              class="input"
              style="margin-bottom: 30px"
              type="text"
              v-model="editingProduct.product_name"
            />
          </div>
          <div>
            <input
              placeholder="Количество"
              type="number"
              class="input"
              v-model="editingProduct.product_amount"
            />
          </div>
        </div>
        <div v-else>
          <div class="name">{{ product.product_name }}</div>
          <div class="quantity">{{ product.product_amount }} шт.</div>
        </div>

        <div class="buttons" v-if="!editing">
          <button class="button update" @click="startUpdateProduct(product)">
            Изменить
          </button>
          <button class="button remove" @click="store.remove(product)">
            Удалить
          </button>
        </div>
        <div class="buttons" v-if="editing && editingProduct.id === product.id">
          <button class="button update" @click="updateProduct">
            Сохранить
          </button>
          <button class="button remove" @click="cancelUpdation">
            Отменить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  box-sizing: border-box;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  justify-content: center;
}

.name {
  font-size: 26px;
  margin-bottom: 20px;
}

.quantity {
  font-size: 20px;
  color: gray;
}

.button {
  width: 100px;
  background-color: teal;
  transition: 0.2s ease-in-out;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
}

.product {
  margin-top: 30px;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  max-width: 1000px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  gap: 20px;
}

.update {
  background-color: blue;
}

.remove {
  background-color: red;
}

.input {
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
}

.button:hover {
  background-color: rgb(0, 184, 184);
}

.products {
  margin-top: 40px;
}
</style>
