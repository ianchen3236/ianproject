import React, { useState, useEffect } from 'react'
import Carousel from '@/components/myProduct/productcarousel'
import QuantityButton from '@/components/myProduct/quantitybutton'
import ProductFigure from '@/components/myProduct/productfigure'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsGlobe } from 'react-icons/bs'
import { IoIosLock, IoMdCheckmarkCircleOutline } from 'react-icons/io'

export default function Detail() {
  const [products, setProducts] = useState([])
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { pid } = router.query

  useEffect(() => {
    fetch('http://localhost:3005/api/myProduct')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products)
        setLoading(false)
      })
      .catch((error) => console.error('Error:', error))
  }, [])

  useEffect(() => {
    if (pid && products.length > 0) {
      const selectedProduct = products.find(
        (product) => product.product_id === parseInt(pid)
      )

      if (selectedProduct) {
        const currentProductBrand = selectedProduct.brand_name // 根據選擇的產品ID取得品牌名稱
        const sameBrandProducts = products.filter(
          (product) => product.brand_name === currentProductBrand
        ) // 過濾出相同品牌的商品
        const shuffledProducts = shuffleArray(sameBrandProducts) // 洗牌後的商品陣列
        const randomProducts = shuffledProducts.slice(0, 6) // 取得洗牌後的前六個商品
        setDisplayedProducts(randomProducts) // 設定顯示的商品
        setSelectedProduct(selectedProduct) // 設定選擇的產品
      }
    }
  }, [pid, products])

  // 洗牌函式
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    if (pid && products.length > 0) {
      const product = products.find(
        (product) => product.product_id === parseInt(pid)
      )
      setSelectedProduct(product)
    }
  }, [pid, products])

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price)
    return numericPrice.toLocaleString()
  }

  if (loading) {
    return <div id="loading">Loading . . .</div>
  }
  const maxLength = 11
  window.addEventListener('popstate', () => {
    window.location.reload()
  })

  return (
    <>
      {selectedProduct && (
        <>
          <div className="row mt-5">
            <div className="col-lg-7 my-3">
              <div className="position-sticky" style={{ top: '2rem' }}>
                <Carousel products={products} pid={pid} />
              </div>
            </div>
            <div className="col-lg-5 my-3">
              <div className="position-sticky" style={{ top: '2rem' }}>
                <h1 className="text-h2 py-3">{selectedProduct.name}</h1>
                <h3 className="text-h3 text-my-notice">
                  NT ${Number(selectedProduct.price).toLocaleString()}
                </h3>
                <div className="mt-4">
                  <BsGlobe className="mx-3" />
                  Worldwide shipping <br />
                  <IoIosLock className="mx-3" />
                  Secure payments <br />
                  <IoMdCheckmarkCircleOutline className="mx-3" />
                  Authentic products <br />
                </div>
                <div className="mt-4 mx-2 my-text-contents-CH">
                  <div>
                    系列
                    <span className="ms-5 text-my-secondary">
                      {selectedProduct.series}
                    </span>
                  </div>

                  <div>
                    材質
                    <span className="ms-5 text-my-secondary">
                      {selectedProduct.material_name}
                    </span>
                  </div>

                  <div>
                    顏色
                    <span className="ms-5 text-my-secondary">
                      {selectedProduct.color_name}
                    </span>
                  </div>

                  <div>
                    筆尖
                    <span className="ms-5 text-my-secondary">
                      {selectedProduct.nib_name}
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  <QuantityButton products={products} pid={pid} />

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
                  {selectedProduct.description}
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
                {displayedProducts.map((product) => (
                  <div
                    className="col"
                    key={product.product_id}
                    style={{ width: '250px', marginRight: '10px' }}
                  >
                    <Link
                      href={`/product/${product.product_id}`}
                      as={`/product/${product.product_id}`}
                      style={{ textDecoration: `none` }}
                    >
                      <ProductFigure
                        key={product.product_id}
                        image={`/images/myProduct/${product.image}`}
                        brand={product.brand_name}
                        name={
                          product.name.length > maxLength
                            ? `${product.name.substring(0, maxLength)}...`
                            : product.name
                        }
                        price={formatPrice(product.price)}
                      />
                    </Link>
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
      )}
    </>
  )
}
