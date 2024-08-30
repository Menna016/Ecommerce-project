import { data } from "autoprefixer";
import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext();
export default function CartContextProvider(props) {

    const token = localStorage.getItem('token');
    const [cartItemNo, setCartItemNo] = useState(0)
    const headers = {
        token
    };

    //! get data of user cart fn
    function getUserCart() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers
        })
            .then(data => data)
            .catch(err => err)
    }

    //! add item to cart fn 
    function addItemTOCart(pId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId: pId
        }, {
            headers
        })
            .then(data => data)
            .catch(err => err)
    }

    //! update the quantity fn 
    function upDateTOCart(id, count) {
        return axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + id, {
            count
        }, {
            headers
        })
            .then(data =>data)
            .catch(err => err)
    }

    //!delet the item from cart fn
    function deletItem(id) {
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + id, {
            headers
        })
            .then(data => data)
            .catch(err => err)
    }

    //! clear your cart fn

    function clearYourCart() {
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/', {
            headers
        })
            .then(data => data)
            .catch(err => err)
    }

    //! number of cart item fn 
    async function NoOfCartItem() {
        const response = await getUserCart();
        if (response.data.status === "success") {
            setCartItemNo(response.data.numOfCartItems);
            console.log({ cartItemNo });

        }
    }

    //! check out fn 
    function checkOutSession(cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, {
            shippingAddress: shippingAddress,
        }, {
            headers,
        })
            .then(data => data)
            .catch(err => err)
    }

    //! get data of wish list fn
    function getWishLIst() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers
        })
            .then(data => data)
            .catch(err => err)
    }

    //! add item to wish list fn 
    function addItemTOWishList(pId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            productId: pId
        }, {
            headers
        })
            .then(data => data)
            .catch(err => err)
    }

    //!delet the item from wish list fn
    function deletItemFromWishList(id) {
        return axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + id, {
            headers
        })
            .then(data => data)
            .catch(err => err)
    }

    //! get user orders fn
    function getUserOrders(decoded) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/`+decoded.id)
            .then(data => data)
            .catch(err => err)
    }

    



    useEffect(() => {
        NoOfCartItem()
    }, [])

    return <CartContext.Provider value={{ checkOutSession, cartItemNo, setCartItemNo, getUserCart, addItemTOCart, upDateTOCart, deletItem, clearYourCart, getWishLIst, addItemTOWishList, deletItemFromWishList, getUserOrders }} >
        {props.children}
    </CartContext.Provider>
}