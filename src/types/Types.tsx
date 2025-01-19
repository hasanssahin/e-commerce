export interface UserType {
  username: string
  password: string
  balance: number
}

export interface LoginType {
  username: string
  password: string
}

export interface ProductType {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  count?: number
  rating: RatingType
}

export interface RatingType {
  rate: number
  count: number
}
