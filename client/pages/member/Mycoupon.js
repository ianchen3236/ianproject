import React from 'react'
import UserCoupon from '@/components/myCoupon/UserCoupon'
// import couponData from '@/data/ianCoupon.json'
import { useState,useEffect } from 'react'

const CouponPage = () => {
  // const [coupon, setCoupon] = useState(couponData)
  // console.log(coupon)

  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/coupon/')
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
    console.log('data', data)
  }, [])

  return (
    <>
      <div className="coupon-container">
        <div className="coupon-content">
          <div className="coupon-content__title">我的優惠劵</div>
          <div className="coupon-content__list">
            {/* 可以使用 map 遍歷渲染 */}
            <div className="coupon-content__item">
              <div className="container">
                <div className="row row-cols-lg-3">
                 
                    {data.map((v, i) => {
                      const { coupon_name, end_at, discount_title } = v

                      return (
                        <UserCoupon
                          key={v.id}
                          coupon_name={coupon_name}
                          discount={discount_title}
                          limit_time={end_at}
                        />
                      )
                    })}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .coupon-container {
          background-color: #f6f5f3;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 60px;
        }
        @media (max-width: 991px) {
          .coupon-container {
            padding: 0 20px;
          }
        }
        .coupon-content {
          display: flex;
          margin-top: 26px;
          width: 100%;
          max-width: 1200px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .coupon-content {
            max-width: 100%;
          }
        }
        .coupon-content__title {
          border-bottom: 1px solid #eae8e4;
          color: #19110b;
          white-space: nowrap;
          text-transform: uppercase;
          padding: 5px 0 31px;
          font: 700 26px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .coupon-content__title {
            max-width: 100%;
            white-space: initial;
          }
        }
        .coupon-content__list {
          justify-content: center;
          background-color: #fff;
          display: flex;
          margin-top: 42px;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .coupon-content__list {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .coupon-content__item {
          background-color: #fff;
        }
        .col {
          display: flex;
          justify-content: center;
        }
        @media (max-width: 991px) {
          .coupon-content__item {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  )
}

export default CouponPage
