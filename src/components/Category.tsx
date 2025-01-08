import { ChangeEvent, useEffect, useState } from "react"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import categoryService from "../services/CategoryService"
import { useDispatch } from "react-redux"
import { setLoading, setProducts } from "../redux/appSlice"
import { toast } from "react-toastify"
import { ProductType } from "../types/Types"
import productService from "../services/ProductService"

export const Category = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState<string[]>()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  useEffect(() => {
    getAllCategories()
  }, [])

  const getAllCategories = async () => {
    try {
      dispatch(setLoading(true))
      const response: string[] = await categoryService.getCategories()
      if (response) {
        setCategories(response)
      }
    } catch (error) {
      toast.error("Failed to fetch categories")
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleCategoryChange = async (checked: boolean, categoryName: string) => {
    let updatedCategories = [...selectedCategories]
    if (checked) {
      updatedCategories.push(categoryName)
    } else {
      updatedCategories = updatedCategories.filter((cat) => cat !== categoryName)
    }
    setSelectedCategories(updatedCategories)

    try {
      dispatch(setLoading(true))
      if (updatedCategories.length > 0) {
        const productPromises = updatedCategories.map((category) => categoryService.getProductsByCategory(category))
        const productsArray: ProductType[][] = await Promise.all(productPromises)
        const mergedProducts = productsArray.flat()
        dispatch(setProducts(mergedProducts))
      } else {
        const allProducts: ProductType[] = await productService.getAllProducts()
        dispatch(setProducts(allProducts))
      }
    } catch (error) {
      toast.error("Failed to fetch products")
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div style={{ marginTop: "50px", marginLeft: "20px" }}>
      <FormGroup>
        {categories &&
          categories.map((category, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox onChange={(e: ChangeEvent<HTMLInputElement>) => handleCategoryChange(e.target.checked, category)} />}
              label={category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
            />
          ))}
      </FormGroup>
    </div>
  )
}
