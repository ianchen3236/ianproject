import React, { useEffect, useState } from 'react'

import ProductCart from '@/components/myCart/productCart'
import CourseCart from '@/components/myCart/courseCart'
import OrderSummary from '@/components/myCart/orderSummary'
import CartCouppon from '@/components/myCart/cartCoupon'
import ShippingRule from '@/components/myCart/shippingRule'
import Link from 'next/link'
import { useRouter } from 'next/router'

//勾子context
import { useCart } from '@/hooks/user-cart'

export default function CartIndex() {
  /* cart */
  //   const [cart, setCart] = useState([])

  //   //初始化 localstorage資料提取到cart 若無資料就是 []
  //   useEffect(() => {
  //     if (localStorage.getItem('cart')) {
  //       const clientCart = JSON.parse(localStorage.getItem('cart'))
  //       setCart(clientCart)
  //     }
  //   }, [])

  //   //cart狀態改變 同步更新到localstorage的cart
  //   useEffect(() => {
  //     localStorage.setItem('cart', JSON.stringify(cart))
  //   }, [cart])

  //   // general datas
  //   const cartGeneral = cart.filter((v) => v.type === 'general')

  //   // course datas
  //   const cartCourse = cart.filter((v) => v.type === 'course')

  //   //購物車的某item數量增加
  //   const increment = (id) => {
  //     const newCart = cart.map((v, i) => {
  //       if (v.id === id) return { ...v, qty: v.qty + 1 }
  //       else return v
  //     })
  //     setCart(newCart)
  //   }

  //   //購物車的某item數量減少
  //   const decrement = (id) => {
  //     const newCart = cart.map((v, i) => {
  //       if (v.id === id) return { ...v, qty: v.qty - 1 }
  //       else return v
  //     })
  //     setCart(newCart)
  //   }

  //   // 新增項目到購物車 (old version)
  //   const addCartItem = (item) => {
  //     if (item.type === 'general') {
  //       const index = cart.findIndex((v, i) => v.id === item.id)
  //       if (index > -1) {
  //         increment(item.id)
  //         return false
  //       }
  //       // 擴充item數量屬性
  //       const newItem = { ...item, qty: 1 }
  //       const newCart = [...cart, newItem]
  //       setCart(newCart)
  //     } else {
  //       // 只有單一數量的商品 例如課程
  //       const index = cart.findIndex((v, i) => v.id === item.id)
  //       if (index > -1) {
  //         alert(`已經添加過【${item.name}】到購物車`)
  //         return false
  //       }
  //       // 擴充item數量屬性
  //       const newItem = { ...item, qty: 1 }
  //       const newCart = [...cart, newItem]
  //       setCart(newCart)
  //     }
  //   }

  //   //刪除購物車的項目
  //   const removeCartItem = (item) => {
  //     const newCart = cart.filter((v, i) => v.id !== item.id)
  //     setCart(newCart)
  //   }

  //   //計算總商品數量 以品項計算
  //   const totalItems = cart.length

  //   //計算總小記
  //   const rawTotalPrice = cart.reduce((acc, v) => acc + v.qty * v.price, 0)

  // //計算總金額 （扣掉優惠卷與運費） -未完成優惠卷邏輯
  // const totalPrice =cart.reduce((acc, v) => acc + v.qty * v.price, 0)

  /*  處理優惠卷 */
  //   const [selectedCouponID, setSelectedCouponID] = useState('none')
  //   const [coupons,setCoupons]=useState([])
  //   const [selectCoupon, setSelectCoupon] = useState({
  //     CouponID: 'none',
  //     Description: '無',
  //     ValidFrom: '',
  //     ValidTo: '',
  //     MinimumSpend: 0,
  //     DiscountType: '',
  //     DiscountValue: 0,
  //     UsageLimit: 0,
  //     UsedCount: 0,
  //   })

  //   coupons

  // useEffect(()=>{
  //   const newcouponsData= couponsData
  //   if(newcouponsData){
  //     setCoupons(newcouponsData)
  //   }
  // },[])

  //   useEffect(() => {
  //     handleSelectCoupon(coupons,selectedCouponID)
  //   }, [coupons,selectedCouponID])

  //   const handleSelectCoupon = (couponArray,coupon_code) => {
  //     const [newSelectCoupon] = couponArray.filter(
  //       (v) => coupon_code === v.coupon_code
  //     )

  //     if (newSelectCoupon) {
  //       setSelectCoupon(newSelectCoupon)
  //     } else {
  //       setSelectCoupon([{
  //         CouponID: 'none',
  //         Description: '無',
  //         ValidFrom: '',
  //         ValidTo: '',
  //         MinimumSpend: 0,
  //         DiscountType: '',
  //         DiscountValue: 0,
  //         UsageLimit: 0,
  //         UsedCount: 0,
  //       }])
  //     }
  //   }

  //   //回調函數 從子元件傳過來選擇的優惠卷id
  //   const handleRadioChange = (e) => {
  //     setSelectedCouponID(e.target.value)
  //   }

  const {
    // 購物車
    cart,
    cartGeneral,
    increment,
    decrement,
    removeCartItem,
    cartCourse,
    rawTotalPrice,
    totalPrice,
    formatPrice,
    // 優惠卷
    coupons,
    selectCoupon,
    selectedCouponID,
    handleRadioChange,
  } = useCart()

  const router = useRouter()

  const handleNextSteap = () => {
    if (cart.length < 1) {
      alert('購物車中沒有任何商品')
      return false
    }
    router.push('/cart/checkout')
  }

  return (
    <>
      <div className="row">
        {/* 左邊 */}
        <div className="col-lg-7">
          <ProductCart
            cartGeneral={cartGeneral}
            increment={increment}
            decrement={decrement}
            removeCartItem={removeCartItem}
          />
          <CourseCart cartCourse={cartCourse} removeCartItem={removeCartItem} />
        </div>
        {/* 右邊 */}
        <div className="col-lg-1 "></div>
        <div className="col-lg-4  mt-5">
          <OrderSummary
            rawTotalPrice={rawTotalPrice}
            totalPrice={totalPrice}
            checkoutPath={'/cart/checkout'}
            formatPrice={formatPrice}
            handleNextSteap={handleNextSteap}
          />
          <CartCouppon
            coupons={coupons}
            selectedCouponID={selectedCouponID}
            handleRadioChange={handleRadioChange}
          />
          <ShippingRule />

          <div
            onClick={() => {
              handleNextSteap()
            }}
            className="col-lg-8  my-button1 my-5 mx-auto rwd-button"
          >
            下一步
          </div>
        </div>
      </div>
      <style jsx>{`
        .rwd-button {
          display: none;
        }
        @media (max-width: 991px) {
          .OrderSummary-container {
            position: static;
            top: 0&;
            left: 0;
          }
          .rwd-button {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}
