import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref<string[]>(['Electronic', 'Furniture', 'Clothing'])

  const addCategory = (category: string): void => {
    categoryList.value.push(category)
  }

  const editCategory = (category: string, index: number): void => {
    categoryList.value = categoryList.value.map((currCategory, currIndex) => {
      if (currIndex === index) return category
      return currCategory
    })
  }

  const deleteCategory = (index: number): void => {
    categoryList.value = categoryList.value.filter((_, currIndex) => currIndex !== index)
  }

  return { categoryList, addCategory, editCategory, deleteCategory }
})
