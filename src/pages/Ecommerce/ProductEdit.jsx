import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../config/motion";
import Loading from "../../components/Loading";
import { CustomButton } from "../../custom";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setIsLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(
      `https://fakestoreapi.com/products/${id}`,
      { method: "PUT", body: product }
    );
    navigate("/products/product_list");
  };

  {
    isLoading && <Loading />;
  }

  return (
    <motion.div {...fadeAnimation}>
      <div className="md:col-span-3 col-span-12 card">
        <div className="col-span-3 card">
          <input
            type="file"
            id="file"
            hidden
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
              title="Update"
              onClick={handleUpdate}
            />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductEdit;
