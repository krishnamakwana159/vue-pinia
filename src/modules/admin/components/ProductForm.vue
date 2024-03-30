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
  price: 0,
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
  <form @submit.prevent="handleSubmit">
    <h4>{{ !productIndex ? 'Add' : 'Edit' }} Product Form</h4>

    <div>
      <label>
        Name
        <input
          type="text"
          placeholder="Enter Product Name... "
          v-model="productForm.name"
          @blur="v$.name.$touch"
        />
        <div v-for="error of v$.name.$errors" :key="error.$message.toString()">
          <p>{{ error.$message }}</p>
        </div>
      </label>
    </div>

    <div>
      <label>
        Price
        <input
          type="number"
          placeholder="Enter Product Price... "
          v-model="productForm.price"
          @blur="v$.price.$touch"
        />

        <div v-for="error of v$.price.$errors" :key="error.$message.toString()">
          <p>{{ error.$message }}</p>
        </div>
      </label>
    </div>

    <div>
      <label>
        Category
        <select v-model="productForm.category" @blur="v$.category.$touch">
          <option selected disabled value="">Select Category</option>
          <option
            v-for="(category, index) of categoryList"
            :key="`${index}-${category}`"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <div v-for="error of v$.category.$errors" :key="error.$message.toString()">
          <p>{{ error.$message }}</p>
        </div>
      </label>
    </div>

    <div>
      <input
        type="submit"
        :value="`${!productIndex ? 'Add' : 'Edit'} Product`"
        :disabled="v$.$invalid"
      />
    </div>
  </form>
</template>
