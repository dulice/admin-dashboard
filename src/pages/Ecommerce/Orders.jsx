import React, { useEffect, useState } from "react";
import { CustomButton } from "../../custom";
import { HiTrash, HiTruck } from 'react-icons/hi'
import { motion } from "framer-motion";
import { orders } from "../../data/product/orders";
import { fadeAnimation } from "../../config/motion";

const Orders = () => {
  const [products, setProducts] = useState(orders);
  useEffect(() => {
    setProducts(orders);
  }, []);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (id) => {
    const updateProduct = products.map(product => {
        if(product.id === id) {
            product.status = "shipped"
        }
        return product;
    })
    setProducts(updateProduct);
  }
  const thead = ["order_id", "Customer Name", "Amount", "Order Date", "Status", "Actions"];
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
              <tr
                key={product.id}
                className="hover"
              >
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.customer_name}</td>
                <td className="px-4 py-2">${product.amount}</td>
                <td className="px-4 py-2">{product.created_at.toLocaleDateString()}</td>
                <td>
                  <span
                    className={`
                      text-xs text-white rounded-sm p-1
                      ${
                        product.status === "pending"
                          ? "bg-danger-100"
                          : "bg-success-100"
                      }
                    `}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <CustomButton
                    title={<HiTruck />}
                    variant="btn-warning"
                    onClick={() => handleEdit(product.id)}
                  />
                  <CustomButton
                    title={<HiTrash />}
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

export default Orders;
