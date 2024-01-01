import React, { useEffect, useState } from "react";
import { CustomButton } from "../../custom";
import { BiShow, BiSolidEyedropper, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../config/motion";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((p) => p.id !== id));
  };
  const thead = ["Id", "Product Name", "Price", "Actions"];
  return (
    <motion.div {...fadeAnimation}>
      <div className="m-4 card relative overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-primary-100 text-white text-left">
            <tr>
              {thead.map((th) => (
                <th className="p-4" key={th}>
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover">
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2 flex gap-2">
                  <CustomButton
                    title={<BiShow />}
                    variant="btn-success"
                    onClick={() => navigate(`/products/${product.id}`)}
                  />
                  <CustomButton
                    title={<BiSolidEyedropper />}
                    variant="btn-warning"
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                  />
                  <CustomButton
                    title={<BiTrash />}
                    variant="btn-danger"
                    onClick={() => handleDelete(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductList;
