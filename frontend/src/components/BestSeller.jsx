import { useContext, useEffect, useState } from "react";
import { ShopContext } from '../context/ShopContext'
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    console.log("Products:", products);

    if (Array.isArray(products) && products.length > 0) {
      const sortedProducts = [...products].sort((a, b) => {
        if (a.bestSeller && !b.bestSeller) return -1;
        if (!a.bestSeller && b.bestSeller) return 1;
        return 0;
      });

      console.log("Sorted Products:", sortedProducts);
      const topBestSellers = sortedProducts.slice(0, 5);
      setBestSeller(topBestSellers);
    } else {
      console.log("No products available or invalid data");
      setBestSeller([]); 
    }
  }, [products]);
   
  

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          There is no one who loves pain itself, who seeks after it and wants to
          have it, simply because it is pain...
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
                {
                    bestSeller.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                    ))
                }
        </div>
    </div>
  );
};

export default BestSeller;
