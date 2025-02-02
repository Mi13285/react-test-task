import { Link, useParams } from "react-router-dom";
import { getProduct, getSizes, Product, Size } from "../../services/api";
import styles from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import { ProductCart } from "./ProductCart/ProductCart";
export function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [fetchProductError, setFetchProductError] = useState(null);
  const [sizes, setSizes] = useState<Size[] | null>(null);
  const [fetchSizesError, setFetchSizesError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    const actualId = Number.parseInt(id);
    getProduct(actualId)
      .then((res) => setProduct(res))
      .catch((error) => setFetchProductError(error));
    getSizes()
      .then((res) => setSizes(res))
      .catch((error) => setFetchSizesError(error));
  }, [id]);
  console.log(sizes);
  return (
    <div className={styles.Product}>
      <Link to="/">Назад к списку товаров</Link>
      {product && sizes && <ProductCart product={product} sizes={sizes} />}
      {fetchProductError && <div> не удалось получить данные о продукте</div>}
      {fetchSizesError && <div> не удалось получить данные о размерах</div>}
    </div>
  );
}
