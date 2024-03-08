import React, { useState, useEffect } from 'react'
import Carousel from '@/components/myProduct/productcarousel'
import FavIcon from '@/components/myProduct/heart-icon'
import QuantityButton from '@/components/myProduct/quantitybutton'
import ProductFigure from '@/components/myProduct/productfigure'
import products from '@/data/myProduct.json'

export default function Detail() {
  const [displayedProducts, setDisplayedProducts] = useState([])
  const formatPrice = (price) => {
    const numericPrice = parseFloat(price)
    return numericPrice.toLocaleString()
  }
  useEffect(() => {
    // 設定要顯示的商品資料，這裡僅顯示前六個商品
    setDisplayedProducts(products.slice(0, 6))
  }, [])
  return (
    <>
      <div className="row mt-5">
        {/* <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              所有鋼筆
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              MONTBLANC
            </li>
          </ol>
        </nav> */}
        <div className="col-lg-7 my-3">
          <div className="position-sticky" style={{ top: '2rem' }}>
            <Carousel products={products} />
          </div>
        </div>
        <div className="col-lg-5 my-3">
          <div className="position-sticky" style={{ top: '2rem' }}>
            {/* <div className="text-h4">萬寶龍</div> */}
            <h1 className="text-h2 py-3">{products[0].name}</h1>
            <h3 className="text-h3 text-my-notice">
              NT ${Number(products[0].price).toLocaleString()}
            </h3>

            <div className="mt-4 mx-2 my-text-contents-CH">
              <div>
                系列
                <span className="ms-5 text-my-secondary">
                  萬寶龍大師傑作（大班）
                </span>
              </div>

              <div>
                材質
                <span className="ms-5 text-my-secondary">
                  {products[0].material}
                </span>
              </div>

              <div>
                顏色
                <span className="ms-5 text-my-secondary">
                  {products[0].color}
                </span>
              </div>

              <div>
                筆尖
                <span className="ms-5 text-my-secondary">
                  {products[0].nib}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <div
                className="d-flex justify-content-between align-items-center m-3"
                style={{ flexWrap: 'wrap' }}
              >
                <QuantityButton />
                <span className="my-3">
                  <FavIcon />
                  <span className="ms-2 text-h4">加入收藏</span>
                </span>
              </div>
              <button className="btn btn-primary w-100 mb-3 rounded-pill">
                加入購物車
              </button>
              <button className="btn btn-outline-primary w-100 mb-4 rounded-pill">
                立即購買
              </button>
              <div
                className="accordion accordion-flush m-2"
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-controls="panelsStayOpen-collapseOne"
                      style={{ borderBottom: '1px solid #929292' }}
                    >
                      支付方式
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body p-3">
                      官網提供信用卡金流（支援VISA/MASTER/JCB等發卡組織）、超商貨到付款，金流系統為「綠界科技Ecpay」支援。
                      <br />
                      <br />
                      免息3期付款
                      官網提供信用卡免息分期付款，免息期數為3期，可以參閱指定銀行名單。
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="accordion accordion-flush m-2"
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-controls="panelsStayOpen-collapseTwo"
                      style={{ borderBottom: '1px solid #929292' }}
                    >
                      配送方式與運費
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body p-3">
                      順豐配送 (滿NT1000免費送貨，未滿須付NT80） •
                      出貨後1-2天內可送達
                      <br />
                      <br />
                      超商取貨付款/不付款(滿NT1000免費送貨，未滿須付NT80） •
                      出貨後2至3天後抵達指定超商門市 •
                      超商取貨訂單於送達指定門市後將有7天取貨期限
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-12">
          <div className="product-info my-5">
            <div className="text-h2">產品介紹</div>
            <p className="my-text-contents-CH ms-3 my-5">
              {products[0].description}
            </p>
          </div>
        </div>
      </div>
      <div className="text-h2 my-5">其他人還看了</div>
      <div
        className="row mb-5 overflow-x-auto"
        style={{ whiteSpace: 'nowrap' }}
      >
        <div className="col-12 mb-4">
          <div className="d-inline-flex">
            {displayedProducts.slice(0, 6).map((product) => (
              <div
                className="col"
                key={product.id}
                style={{ width: '250px', marginRight: '10px' }}
              >
                <ProductFigure
                  key={product.id}
                  image={`/images/myProduct/${product.image}`}
                  brand={product.brand}
                  name={product.name}
                  price={formatPrice(product.price)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          height: 3px; /* 滚动条宽度 */
        }

        /* 滚动条轨道 */
        ::-webkit-scrollbar-track {
          background: #f3f3f3; /* 轨道背景颜色 */
        }

        /* 滚动条滑块 */
        ::-webkit-scrollbar-thumb {
          background: #ff69b4; /* 滑块颜色 */
          border-radius: 4px; /* 滑块圆角 */
        }

        /* 滚动条滑块悬停状态 */
        ::-webkit-scrollbar-thumb:hover {
          background: #ff1493; /* 滑块悬停时的颜色 */
        }
      `}</style>
    </>
  )
}
