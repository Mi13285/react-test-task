import React, { useMemo, useState } from "react";
import { Product, Size } from "../../../services/api";
type ProductCartProps = {
  product: Product;
  sizes: Size[];
};
export function ProductCart({
  product: { colors, id, name },
  sizes,
}: ProductCartProps) {
  const [currentColor, setCurrentColor] = useState<number | null>(
    () => colors[0]?.id ?? null
  );
  console.log("productcart rerender");
  const currentColorData =
    colors.find((color) => color.id === currentColor) ?? null;

  const sizesHashMap = useMemo(() => {
    console.log("hashmap");
    if (sizes === null) return {} as Record<number, Size>;
    const map: Record<number, Size> = {};
    sizes.map((size) => (map[size.id] = size));
    return map;
  }, [sizes]);

  console.log(sizesHashMap);
  return (
    <div>
      <div> Название товара :{name}</div>
      <ul>
        {colors.map((color) => (
          <li key={color.id}>
            <button
              style={{
                backgroundColor: currentColor === color.id ? "red" : "grey",
              }}
              onClick={() => setCurrentColor(color.id)}
            >
              {color.name}
            </button>
          </li>
        ))}
      </ul>
      {currentColorData && (
        <div>
          <div>
            front:{" "}
            <img
              style={{ width: "180px", height: "180px" }}
              src={currentColorData.images[0]}
            ></img>
          </div>
          <div>
            back:{" "}
            <img
              style={{ width: "180px", height: "180px" }}
              src={currentColorData.images[1]}
            ></img>
          </div>
          <div>{currentColorData.description}</div>
          <div>{currentColorData.price}</div>
          <ul>
            {currentColorData.sizes.map((sizeId) => (
              <li key={sizeId}>
                {sizesHashMap[sizeId]?.label || "нет данных по размеру"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
