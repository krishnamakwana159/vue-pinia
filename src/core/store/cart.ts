import { defineStore } from 'pinia'
import { ref, reactive, provide, inject } from 'vue'
import { ProductModel } from '../models/product.model'

export const useCartStore = defineStore('cart', () => {
  const items = reactive([])
  const cartTotal = ref(0)

  const addToCart = (product: ProductModel) => {
    //console.log(items, product)
    const existingItemIndex = items.findIndex((item) => item.id === product.id);

    // If the product already exists in the cart, increment its quantity
  if (existingItemIndex !== -1) {
    items[existingItemIndex].quantity++;
  } else {
    // If the product doesn't exist in the cart, add it with a quantity of 1
    items.push({ ...product, quantity: 1 });
  }

    // const existingItem = items.find((item) => item.id === product.id)
    // console.log(existingItem)
    // if (existingItem) {
    //   items.value = items.value.map((item) =>
    //     item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    //   );
    //   //existingItem.quantity++
    // } else {
    //   items.push({ ...product, quantity: 1 })
    // }
    // const updatedItems = items.map((item) =>
    //   item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    // )

    // // Update the reactive items state with the modified array
    // items.splice(0, items.length, ...updatedItems) // Efficiently replace all items

    updateCartTotal()
  }

  const incrementQuantity = (productId: number) => {
    const itemIndex = items.findIndex((item) => item.id === productId);
    if (itemIndex > -1) {
      items[itemIndex].quantity++;
      updateCartTotal();
    }
  }

  const decrementQuantity = (productId: number) => {
    const itemIndex = items.findIndex((item) => item.id === productId);
    if (itemIndex > -1) {
      if (items[itemIndex].quantity > 1) {
        items[itemIndex].quantity--;
      } else {
        // Optionally handle the case where quantity reaches 0 (e.g., remove item)
        removeFromCart(productId);
      }
      updateCartTotal();
    }
  }
  const removeFromCart = (productId: number) => {
    const itemIndex = items.findIndex((item) => item.id === productId)
    if (itemIndex > -1) {
      items.splice(itemIndex, 1)
      updateCartTotal()
    }
  }

  const clearCart = () => {
    items.splice(0, items.length)
    cartTotal.value = 0
  }

  
  const updateCartTotal = () => {
    cartTotal.value = items.reduce((total, item) => total + item.price * item.quantity, 0)
    //console.log(cartTotal.value, items)
  }
  

  return { items, cartTotal, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }
})


// Provide the store
export const provideCartStore = () => {
  provide('cartStore', useCartStore());
};

// Inject the store
export const useInjectCartStore = () => {
  const store = inject('cartStore');
  if (!store) {
    throw new Error('Error: useInjectCartStore() must be used within a component');
  }
  return store;
};


// provide('cartStore', cartStore);

// export default CartProvider;