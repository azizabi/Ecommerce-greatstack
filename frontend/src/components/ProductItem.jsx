import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, name, price, image }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
      <div className='overflow-hidden'>
        <img
          className='hover:scale-110 ease-in-out duration-300'
          src={image?.[0] || 'default-image-path.jpg'} 
          alt={name}
        />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
