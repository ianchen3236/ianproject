import React from 'react'
import Link from 'next/link'

export default function UsedCoupon({
  couponKey,
  coupon_name,
  discount,
  limit_time,
  end_time,
}) {
  console.log(couponKey)
  return (
    <>
      <div className="col-xl-4 col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
        <div className="coupon-background" Key={couponKey}>
          {/* <img src="/images/myCoupon/coupon_background_02.png" alt="" /> */}
          <div className="text-container">
            <h3>
              {/* 歡慶鋼筆盛典！ */}
              {coupon_name}
            </h3>
            <p className="discount m-0">
              {/* 85折優惠！ */}
              {discount}
            </p>
            <p className="expiration m-0">
              {/* 有效期限：2024.12.31 */}
              {limit_time.split('T')[0]}
           <b>~</b> 
              {/* 有效期限：2024.12.31 */}
              {end_time.split('T')[0]}
            </p>
            <a className='rule_link' href="">使用規則</a> 
            <a href={`/product/list`} className="button">
              已領取
            </a>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .coupon-background {
            background: url('/images/myCoupon/coupon_background_02.png')
              repeat-x center center;
            background-size: cover;
            text-align: center;
            width: 70%;
            height: 200px;
            margin: 10px 0;

            display: flex; /* 使用 Flexbox */
            position: relative;
            justify-content: center; /* 水平置中 */
            align-items: center; /* 垂直置中 */
            filter:drop-shadow(0px 0px 4px #9c9d9d) ;
            & img {
              position: absolute;
              width: 100%;
              object-fit: cover;
            }
            &::after {
              content: '';
              display: block;
              background: url('/images/myCoupon/coupon_background_03.png')
                no-repeat center center;
              background-size: contain;
              position: absolute;
              right: -76px;
              width: 100px;
              height: 200px;
              z-index: 999;
            }
            &::before {
              content: '';
              display: block;
              background: url('/images/myCoupon/coupon_background_01.png')
                no-repeat center center;
              background-size: contain;
              position: absolute;
              left: -77px;
              width: 100px;
              height: 200px;
              z-index: 999;
              
            }
            &:hover{
              filter:drop-shadow(0px 0px 3px rgb(230 40 124 / 80%)) ;
            }
          }
          .text-container {
            position: absolute;
            padding: 10px;
            width: 100%;
            object-fit: cover;

            h1 {
              font-size: 24px;
              color: #333;
              
            }
            h3{
                white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            }
            p {
              color: #555;
              margin-bottom: 10px;
            }
            b{
              margin:0 5px;
            }
            .rule_link{
              display:block;
              color:#600;
              
              &:hover{
                text-decoration: underline;
                color:#f00;
              }
            }
            .discount {
              color: #e44d26;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .expiration {
              color: #777;
              line-height: 16px;
              padding:8px 0 4px;
            }
            .button {
              background: #e44d26;
              display: inline-block;
              padding: 3px 10px;
              border: 1.5px #fff solid;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              &:hover{ 
                border: 1.5px #e44d26 solid;
                color: #e44d26; 
                background:#fff;
                }
                
            }
          }
          @media (max-width: 991px) {
            .coupon-background {
              background-size: contain;
            }
          }
          @media (max-width: 500px) {
            .coupon-background {
              background-size: cover;
              
            }
          }
        `}
      </style>
    </>
  )
}
