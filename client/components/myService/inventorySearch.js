import React from 'react'

export default function InventorySearch() {
  return (
    <>
      <a
        id="a1"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        分店庫存查詢
      </a>
      <div className="container">
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header row me-2">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body row">
            {/* 設計200*200 */}
            <div className="img-div col-sm-6 col-12 mx-auto">
              <img src="/images/myService/56407.jpg" alt="" />
            </div>
            <div className="ps-4 col-sm-6 flex-grow-1">
              <h3>PILOT 百樂 Capless按鍵鋼筆</h3>
              <div className="mb-1">品牌:PILOT</div>
              <div className="mb-1">價錢:7900</div>
              <div className="mb-1">顏色:銀灰</div>
              <div className="mb-1">筆尖:F</div>
              <div className="mb-1">
                <i className="fa-regular fa-heart" />
              </div>
            </div>
          </div>
          <div className="offcanvas-body row my-1 product-describe">
            <h5 className="m-0">商品敘述</h5>
            <p>
              PILOT(CAPLESS)系列是世界首創的按鍵式鋼筆,1963年開使販售後,一直名列於暢銷榜上,CAPLESS系列如同原子筆一般,只要按鍵按壓一下,就能輕鬆書寫.
            </p>
          </div>
          <div className="offcanvas-body row mt-2">
            <ul>
              <li className="d-flex justify-content-between">
                <div>
                  <a>
                    <i className="fa-solid fa-location-dot" />
                  </a>
                  台北士林店
                </div>
                <div>
                  庫存充足
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 767.98px) {
          .offcanvas.show {
            width: 100%;
          }
        }

        @media (min-width: 768px) {
          .offcanvas {
            width: 50vw;
          }
        }

        .img-div {
          width: 30%;
          height: auto;
          overflow: hidden;

          & img {
            width: 100%;
            height: auto;
          }
        }

        .offcanvas-body {
          padding-block: 0px;
        }

        .offcanvas-body ul {
          list-style: none;

          & li {
            border-bottom: 1px solid black;
          }
        }

        @media screen and (max-width: 391px) {
          .img-div {
            width: 70%;
            height: auto;
            overflow: hidden;
            margin-bottom: 5px;

            & img {
              width: 100%;
              height: auto;
            }
          }

          .product-describe {
            display: none;
          }
        }
        #a1{
          color:#ff0083
        }
      `}</style>
    </>
  )
}
