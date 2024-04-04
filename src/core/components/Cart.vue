<template>
    <br><br>
    <div class="cart-container">
        <h2>Your Cart</h2>
        <ul class="cart-items" v-if="cartItems.length > 0">
            <li v-for="(item, index) in cartItems" :key="item.id">
                <div class="cart-item-details">
                    <div class="product-name">{{ item.name }}</div>
                    <div class="product-category">{{ item.category }}</div>
                    <div class="product-quantity-wrapper">
                        <span>Quantity:</span>
                        <button data-test="btnDecrementQuntity" @click="cartStore.decrementQuantity(item.id)">-</button>
                        <span class="quantity-value">{{ item.quantity }}</span>
                        <button data-test="btnIncrementQuntity" @click="cartStore.incrementQuantity(item.id)">+</button>
                    </div>
                    <div class="div-product-price">
                        <label>Price: </label>
                        <label class="product-price"> {{ item.price.toFixed(2) }} </label>
                    </div>
                    <div class="product-subtotal">Subtotal: {{ (item.price * item.quantity).toFixed(2) }}</div>
                    <button data-test="btnRemove" @click="removeFromCart(item.id)">Remove</button>
                </div>
            </li>
            <li class="cart-total">
                <strong>Total: {{ cartStore.cartTotal.toFixed(2) }}</strong>
            </li>
        </ul>
        <p v-else class="empty-cart">Your cart is empty.</p>
 
        <!-- <ul id="cart-items" v-if="cartItems.length > 0">
            <li v-for="(item, index) in cartItems" :key="index">
                <div class="cart-item">
                    <div class="product-details">
                        <p id="cart-product-detail">{{ item.name }}, {{ item.category }} (x{{ item.quantity }})</p>
                        <span class="price">{{ item.price * item.quantity }}</span>
                    </div>
                    <div class="quantity-controls">
                        <button data-test="btnIncrementQuntity" @click="cartStore.incrementQuantity(item.id)">+</button>
                        <span class="quantity">{{ item.quantity }}</span>
                        <button data-test="btnDecrementQuntity" @click="decrementQuantity(item.id)">-</button>
                    </div>
                    <button data-test="btnRemove" @click="removeFromCart(item.id)">Remove</button>
                </div>
            </li>
            <li class="cart-total">
                <strong>Total: {{ cartStore.cartTotal }}</strong>
            </li>
        </ul> -->
        <!-- <ul id="cart-items" v-if="cartItems.length > 0">
            <li v-for="(item, index) in cartItems" :key="index">
                <p id="cart-product-detail">{{ item.name }}, {{ item.category }} (x{{ item.quantity }}) - {{ item.price * item.quantity }}</p>
                <button data-test="btnIncrementQuntity" @click="cartStore.incrementQuantity(item.id)">Plus</button>
        
                <button data-test="btnRemove" @click="removeFromCart(item.id)">Remove</button>
                <button data-test="btnDecrementQuntity" @click="decrementQuantity(item.id)">Minus</button>

                <br><br>
            </li>
            <li class="cart-total">
                <strong>Total: {{ cartStore.cartTotal }}</strong>
            </li>
        </ul> -->
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/core/store/cart';
import { onMounted } from 'vue'
//import { storeToRefs } from 'pinia'
const cartStore = useCartStore();

const cartItems = cartStore.items; //storeToRefs(cartStore).items;//computed(() => cartStore.items);
const cartTotal = cartStore.cartTotal; //computed(() => cartStore.cartTotal);

onMounted(() => {
    console.log(cartItems, cartTotal)
})

const removeFromCart = (productId: number) => {
    cartStore.removeFromCart(productId);
};

// const incrementQuantity = (productId: number) => {
//     cartStore.incrementQuantity(productId);
// }

// const decrementQuantity = (productId: number) => {
//     cartStore.decrementQuantity(productId);
// }
</script>

<style scoped>
.cart-container {
    color: white;
}

ul#cart-items {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cart-item-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
}

.product-name, 
.div-product-price,
.product-category,
.product-price,
.product-subtotal {
    flex: 1;
}
/* font-weight: bold; */

.product-quantity-wrapper {
    display: flex;
    align-items: center;
}

.quantity-value {
    margin: 0 5px;
}

.cart-total {
    text-align: right;
    font-size: 1.2rem;
    padding: 1rem;
    font-weight: bold;
}

button {
    border: 1px solid white;
    padding: 5px;
    cursor: pointer;
}

.empty-cart {
    text-align: center;
}
/* 
.cart-container {
    background-color: white;
    color: white;
}

.cart-total {
    font-weight: bold;
}



button{
    margin: 10px;
    border: 1px solid white;
} */
</style>