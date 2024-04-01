<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref, onMounted, type Ref } from 'vue'

import type { ProductModel } from '@/core/models/product.model'
import { useCategoryStore } from '@/core/store/category'
import { useProductStore } from '@/core/store/product'
import { useVuelidate } from '@vuelidate/core'
import { maxLength, minLength, minValue, required } from '@vuelidate/validators'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()
const productIndex: Ref<string | null> = ref(null)

const categoryStore = useCategoryStore()
const productStore = useProductStore()

const { categoryList } = storeToRefs(categoryStore)
const { getProduct } = productStore

const productForm = ref<ProductModel>({
  name: '',
  price: null,
  category: ''
})

const productRules = computed(() => ({
  name: { required, minLength: minLength(5), maxLength: maxLength(10) },
  price: { required, minValue: minValue(0) },
  category: { required }
}))

onMounted(() => {
  if (route.query['productId'] && typeof route.query['productId'] === 'string') {
    productIndex.value = route.query['productId']
    const product = getProduct(parseInt(productIndex.value))
    if (!product) productIndex.value = null
    else {
      productForm.value.name = product.name
      productForm.value.category = product.category
      productForm.value.price = product.price

      v$.value.$reset
    }
  }
})

const v$ = useVuelidate(productRules, productForm)

const handleSubmit = async () => {
  const isFormValid: boolean = await v$.value.$validate()
  if (isFormValid) {
    if (productIndex.value)
      productStore.editProduct(productForm.value, parseInt(productIndex.value))
    else productStore.addProduct(productForm.value)
    router.push('productList')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-sm mx-auto mt-16">
    <h4 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-xl">
      {{ !productIndex ? 'Add' : 'Edit' }} Product Form
    </h4>

    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Name
        <input type="text" id="productName"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Enter Product Name... " v-model="productForm.name" @blur="v$.name.$touch" />
        <div id="productName-error" v-for="error of v$.name.$errors" :key="error.$message.toString()"
          class="error text-red-700">
          <p>{{ error.$message }}</p>
        </div>
      </label>
    </div>

    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Price
        <input type="number" id="productPrice"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Enter Product Price... " v-model="productForm.price" @blur="v$.price.$touch" />

        <div id="productPrice-error" v-for="error of v$.price.$errors" :key="error.$message.toString()"
          class="error text-red-700">
          <p>{{ error.$message }}</p>
        </div>
      </label>
    </div>

    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Category
        <select v-model="productForm.category" @blur="v$.category.$touch" id="productCategory"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
          <option selected disabled value="">Select Category</option>
          <option v-for="(category, index) of categoryList" :key="`${index}-${category}`" :value="category">
            {{ category }}
          </option>
        </select>
        <div id="productCategory-error" v-for="error of v$.category.$errors" :key="error.$message.toString()"
          class="error text-red-700">
          <p>{{ error.$message }}</p>
        </div>
      </label>
    </div>

    <div>
      <input type="submit" :value="`${!productIndex ? 'Add' : 'Edit'} Product`" :disabled="v$.$invalid"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
    </div>
  </form>
</template>
