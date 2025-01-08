import { ProductType } from "../types/Types"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

interface ProductCardProps {
  product: ProductType
}

export const ProductCard = (props: ProductCardProps) => {
  const { id, title, price, description, category, image, rating } = props.product
  return (
    <div>
      <Card
        sx={{
          cursor: "pointer",
          boxShadow: "1px 5px 5px lightgrey",
          width: "330px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "30px 0px",
        }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={image} height={230} width={230} />
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              {title.slice(0, 20)}...
            </Typography>
            <Typography variant='body2' sx={{ color: "text.secondary" }}>
              {description.slice(0, 200)}...
            </Typography>
          </CardContent>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontWeight: "bold" }}>{price}$</span>
          <CardActions>
            <Button size='small' color='info' variant='outlined'>
              Detay
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  )
}
