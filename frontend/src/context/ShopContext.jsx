import { createContext,useEffect,useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
export const ShopContext =createContext()

const ShopContextProvider =({children})=>{
    const currency ='$'
    const deliveryFee =10
    const[search,setSearch]=useState('')
    const[showSearch,setShowSearch]=useState(false)

    const [cartItem,setCartItem]=useState({})
    const navigate=useNavigate()


    const addToCart = async(itemId,size)=>{
        if(!size){
            toast.error('Select Product Size')
            return;
        }

        let cartData=structuredClone(cartItem)
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }
            else{
                cartData[itemId][size]=1
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        setCartItem(cartData)
    }
    
const getCartCount=()=>{
    let totalCount = 0
    for(const items in cartItem){
        for(const item in cartItem[items]){
            try {
                if(cartItem[items][item]>0){
                    totalCount+=cartItem[items][item]
                }
            } catch (error) {
                console.log(error);
                
            }
        }
    }
    return totalCount
}

const updateQuantity =async(itemId,size,quantity)=>{
    let cartData=structuredClone(cartItem)
    cartData[itemId][size]=quantity
    setCartItem(cartData)
}
const getCartAmount =()=>{
    let totalAmount=0
    for(const items in cartItem){
        let itemInfo=products.find((product)=> product._id===items)
        for(const item in cartItem[items]){
            try {
                if(cartItem[items][item]>0){
                    totalAmount+=itemInfo.price*cartItem[items][item]
                }
            } catch (error) {
                console.log(error);
                
            }
        }
    }
    return totalAmount
}


const value={
        products,currency,deliveryFee,updateQuantity,getCartAmount,navigate,
        search,setSearch,showSearch,setShowSearch,cartItem,addToCart,getCartCount
    }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
} 

export default ShopContextProvider;
