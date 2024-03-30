import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ProductModel } from '../models/product.model'

export const useProductStore = defineStore('product', () => {
  const productList = ref<ProductModel[]>([new ProductModel('Product A', 499, 'Electronic')])

  const getProduct = (index: number) =>
    productList.value.find((_, currIndex) => currIndex === index)

  const addProduct = (product: ProductModel): void => {
    productList.value.push(product)
  }

  const editProduct = (product: ProductModel, index: number): void => {
    productList.value = productList.value.map((currProduct, currIndex) => {
      if (currIndex === index) return product
      return currProduct
    })
  }

  const deleteProduct = (index: number): void => {
    productList.value = productList.value.filter((_, currIndex) => currIndex !== index)
  }

  return { productList, addProduct, editProduct, deleteProduct, getProduct }
})
