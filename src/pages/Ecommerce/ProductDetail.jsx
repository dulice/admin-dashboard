import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading';
import { motion } from "framer-motion";
import { fadeAnimation } from "../../config/motion";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setIsLoading(false);
    }
    fetchProduct();
  }, [id])

  {isLoading && <Loading />}
  
  return (
    <motion.div {...fadeAnimation}>
      <div className="grid grid-cols-12 m-4">
        <div className="col-span-3 card">
          <img src={product.image} alt="" />
        </div>
        <div className="col-span-9 card">
          <h1 className='text-xl font-bold'>{product.title}</h1>
          <p className='text-primary-100 text-3xl'>${product.price}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductDetail