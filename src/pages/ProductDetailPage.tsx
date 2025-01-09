import { Button, Container } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { setLoading } from "../redux/appSlice"
import { toast } from "react-toastify"
import productService from "../services/ProductService"
import { ProductType } from "../types/Types"
import { FaCirclePlus } from "react-icons/fa6"
import { FaCircleMinus } from "react-icons/fa6"
export const ProductDetailPage = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState<ProductType | null>()
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    getProduct(Number(productId))
  }, [])

  const getProduct = async (productId: number) => {
    try {
      dispatch(setLoading(true))
      const response: ProductType = await productService.getProductById(productId)
      setProduct(response)
    } catch (error) {
      toast.error("Ürün detayları getirilirken bir hata oluştu")
    } finally {
      dispatch(setLoading(false))
    }
  }
  return (
    <Container maxWidth='lg'>
      {product && (
        <>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", marginTop: 60 }}>
            <div>
              <img src={product.image} height={350} width={300} />
            </div>
            <div style={{ marginLeft: "60px", marginTop: "60px" }}>
              <div style={{ fontFamily: "arial", fontSize: "20px", fontWeight: "bold" }}>{product.title}</div>
              <div style={{ fontFamily: "arial", fontSize: "16px", marginTop: "25px", height: "100px" }}>{product.description}</div>
              <div style={{ fontFamily: "arial", fontSize: "25px", fontWeight: "bold" }}>{product.price}$</div>
              <div style={{ marginTop: "30px" }}>
                <FaCirclePlus onClick={() => setCount(count + 1)} style={{ fontSize: "20px", cursor: "pointer", marginRight: "10px", color: "#342823" }} />
                <span style={{ fontSize: "30px" }}>{count}</span>
                <FaCircleMinus onClick={() => setCount(count - 1)} style={{ fontSize: "20px", cursor: "pointer", marginLeft: "10px", color: "#342823" }} />
              </div>
              <div>
                <Button size='small' variant='contained' style={{ marginTop: "20px", backgroundColor: "#A3897A", color: "#342823", textTransform: "none", fontWeight: "bold" }}>
                  Sepete Ekle
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  )
}
