import styles from "./HomePage.module.css";
import { getProducts, Product } from "../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type ProductView = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
};

const productListTransform = (productList: Product[]): ProductView[] => {
  return productList.map(({ colors, id, name }) => {
    const firstProductColor = colors[0];
    const image = firstProductColor?.images[0] ?? "";
    const price = firstProductColor?.price ?? "цена не указана";
    return {
      id,
      name,
      description: firstProductColor?.description ?? "описание не найдено",
      image,
      price,
    };
  });
};

export function HomePage() {
  const [productList, setProductList] = useState<Product[]>([]);
  console.log("rerender", productList);
  useEffect(() => {
    getProducts().then((res) => setProductList(res));
  }, []);

  const vewProductList = productListTransform(productList);
  return (
    <div className={styles.HomePage}>
      {vewProductList.map((product) => (
        <div key={product.id}>
          <div>{product.name} </div>
          <div>{product.description}</div>
          <div>{product.price}</div>
          <img
            style={{ width: "180px", height: "350px" }}
            src={product.image}
          />
          <Link to={`/product/${product.id}`}>
            <button>перейти к товару {product.name}</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
