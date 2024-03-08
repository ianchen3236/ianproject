import React, { useState, useEffect } from 'react'
import CartFlow from '@/components/myCart/cartFlow'
import OrderSummary from '@/components/myCart/orderSummary'
import SmallProductCart from '@/components/myCart/smallProductCart'
import SmallCourseCart from '@/components/myCart/smallCourseCart'
import OrderConfirmList from '@/components/myCart/orderConfirmList'
import ShippingRule from '@/components/myCart/shippingRule'
import Link from 'next/link'

// //勾子context
import { useCart } from '@/hooks/user-cart'

export default function Confirmation() {
  const {
    cart,
    rawTotalPrice,
    totalPrice,
    cartCourse,
    cartGeneral,
    formatPrice,
    selectCoupon,
  } = useCart()

  const [formData, setFormData] = useState({})

  //linePay資料使用
  const [linePayOrder, setLinePayOrder] = useState({})
  console.log(linePayOrder)

  useEffect(() => {
    // 從 localStorage 中恢復結帳資訊，這保證了代碼只在客戶端執行
    const clientCheckoutInfo =
      JSON.parse(localStorage.getItem('checkout_info')) || {}
    setFormData(clientCheckoutInfo)
  }, [])

  useEffect(() => {
    // 監聽 selectCoupon 的變化，僅更新優惠券資訊，同時保留其他 formData 資訊
    setFormData((prevFormData) => ({
      ...prevFormData,
      coupon_id: selectCoupon.id || '',
      coupon_name: selectCoupon.coupon_name || '無',
    }))
  }, [selectCoupon])

  useEffect(() => {
    // 當 formData 更新時，將其保存到 localStorage
    localStorage.setItem('checkout_info', JSON.stringify(formData))
  }, [formData])

  /* 後端請求建立訂單 建立訂單到server,packages與order id由server產生 */
  const creatOrder = async () => {
    // products將會組合在packages屬性之下
    try {
      const res = await fetch(
        'http://localhost:3005/api/line-pay-first/creatOrder',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: cart.reduce((acc, v) => acc + v.qty * v.price, 0),
            products: cart.map((v) => ({
              id: v.id,
              name: v.name,
              quantity: v.qty,
              price: v.price,
            })),
            formData,
            cart,
          }),
        }
      )

      const data = await res.json() //解析回傳的json檔案
      console.log(data) // /訂單物件格式(line-pay專用)
      if (data.status === 'success') {
        setLinePayOrder(data.data.order)
        // toast.success('已成功建立訂單')
      }
      return data // 返回数据以便进一步处理
    } catch (error) {
      console.error('創建訂單失敗', error)
      return { status: 'error' } //明確返回一個錯誤狀態,好讓付款函數可以透過狀態判定才去執行,解決延遲問題
    }
  }

  /* 向後端請求付款  導向至LINE Pay付款頁面 (未完成!)*/

  const goLinePay = async (orderId) => {
    if (window.confirm('請確認導向至LINE PAY進行付款嗎？')) {
      window.location.href = `http://localhost:3005/api/line-pay-first/reserve?orderId=${orderId}`
    }
  }

  const creatOrderAndPay = async () => {
    const orderResponse = await creatOrder()
    if (orderResponse.status === 'success') {
      console.log(orderResponse.data.order.orderId)
      goLinePay(orderResponse.data.order.orderId)
    } else {
      alert('訂單創建失敗,請稍後再重試')
    }
  }

  return (
    <>
      <div className="row">
        {/* 左邊 */}
        <div className="col-lg-7">
          <div className="mt-5">
            <OrderConfirmList formData={formData} selectCoupon={selectCoupon} />
            <Link href={'/cart/checkout?checkout_info=true'}>
              <div className="back-button col-lg-4 ms-auto mt-5">
                返回資料修改
              </div>
            </Link>
          </div>
        </div>
        {/* 右邊 */}
        <div className="col-lg-1 "></div>
        <div className="col-lg-4 mt-5">
          <div className="OrderSummary-container mb-5">
            <OrderSummary
              text="付款"
              boolean={true}
              totalPrice={totalPrice}
              rawTotalPrice={rawTotalPrice}
              formatPrice={formatPrice}
            />
          </div>
          <div className="text-h4 mb-4">我的購物車</div>
          <SmallProductCart
            cartGeneral={cartGeneral}
            formatPrice={formatPrice}
          />
          <SmallCourseCart cartCourse={cartCourse} formatPrice={formatPrice} />
          <div className="my-5">
            <ShippingRule />
          </div>
          <div
            onClick={creatOrderAndPay}
            className="my-button1 my-3 rwd-button"
          >
            付款
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
        .back-button {
          display: flex;

          padding: 8.25px 0px 9.25px 0px;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          border-radius: 37.5px;
          border: 1.125px solid var(--my-primary);
          font-size: $h6;
          font-weight: 400;
          color: var(--my-primary);
          cursor: pointer;

          &:hover {
            background-color: var(--my-gray);
            border-radius: 37.5px;
            color: var(--my-white);
          }
        }
      `}</style>
    </>
  )
}
