import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../custom";
import { fadeAnimation } from "../../config/motion";
import { motion } from "framer-motion";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = () => {
    navigate('/products/product_list')
  }

  return (
    <motion.div {...fadeAnimation}>
      <div className="grid grid-cols-12 m-4">
        <div className="md:col-span-3 col-span-12 card">
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="" />
            ) : (
              <img src={product.image} alt="" />
            )}
          </label>
        </div>
        <div className="md:col-span-9 col-span-12 card">
          <form action="" className="flex flex-col gap-2">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              className="input w-full"
              name="title"
              placeholder="Title"
              value={product.title}
              onChange={handleChange}
            />
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              className="input w-full"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              rows={10}
              id="description"
              className="input w-full"
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
            />
            <CustomButton
              variant="btn-success"
              title="Add Product"
              onClick={handleAdd}
            />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductAdd;
