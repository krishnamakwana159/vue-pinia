export class ProductModel {
  id: number
  name: string
  price: number | null
  category: string

  constructor(id: number, name: string, price: number, category: string) {
    this.id = id
    this.name = name
    this.price = price
    this.category = category
  }
}
