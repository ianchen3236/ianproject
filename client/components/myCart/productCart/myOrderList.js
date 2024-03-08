import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import SmallCourseCart from '../smallCourseCart'
import SmallProductCart from '../smallProductCart'

export default function MyOrderList({ cName = '' }) {
  const orders = [
    { id: 1, content: '内容 1' },
    { id: 2, content: '内容 2' },
    { id: 3, content: '内容 2' },
    // 可以继续添加更多订单...
  ]

  const [openId, setOpenId] = useState(null)

  const toggleOpen = (id) => {
    setOpenId((currentOpenId) => (currentOpenId === id ? null : id))
  }

  return (
    <div className="container py-4">
      <h2 className="text-h3">{cName}</h2>
      <div className="text-h6">
        {orders.map((order) => (
          <React.Fragment key={order.id}>
            <div className="container-myOrderList  mb-3 shadow-sm">
              <div className="d-flex justify-content-between align-items-center ">
                <div className="order-head  ">
                  <h5 className="mb-0 text-h4 me-5 ">
                    訂單編號:{' '}
                    <span className="text-h4 text-my-black">{order.id}</span>
                  </h5>
                  <p className="mb-0 text-muted  me-5 text-h5 text-my-black">
                    日期: 20/02/2024
                  </p>
                  <p className="mb-0 text-success  me-5 text-h5 text-my-black">
                    付款狀態
                  </p>
                  <p className="mb-0 text-h5 text-my-black">
                    價格:{' '}
                    <span className="font-weight-bold  me-5 text-h4 text-my-notice">
                      $8888
                    </span>
                  </p>
                </div>

                <Button
                  variant=" bg-my-primary text-my-white rounded-5 text-h6 "
                  onClick={() => toggleOpen(order.id)}
                  aria-controls={`collapse-text-${order.id}`}
                  aria-expanded={openId === order.id}
                >
                  更多細節
                </Button>
              </div>
              <Collapse in={openId === order.id}>
                <div id={`collapse-text-${order.id}`} className="mt-3">
                  <div className="order-body d-flex justify-content-around my-5  py-4">
                    <div className="text-h6 ">
                      <h4 className="text-h3">顧客資訊</h4>
                      <div className="firstName">
                        王 <span className="lastName">小明</span>
                      </div>
                      <div className="email">test@example.com</div>
                      <div className="mobliePhone">0987654321</div>
                    </div>
                    <div className="text-h6">
                      <h4 className="text-h3">運送資訊</h4>
                      <div className="firstName">
                        王 <span className="lastName">小明</span>
                      </div>
                      <div className="email">test@example.com</div>
                      <div className="mobliePhone">0987654321</div>
                    </div>{' '}
                    <div className="text-h6">
                      <h4 className="text-h3">支付資訊</h4>
                      <div className="payType">LINEPAY</div>
                      <div className="payStatus">尚未付款</div>
                    </div>
                  </div>
                  <div className="">
                    <SmallProductCart />
                    <SmallCourseCart />
                  </div>
                </div>
              </Collapse>
            </div>
          </React.Fragment>
        ))}
      </div>
      <style jsx>{`
        .container-myOrderList {
          padding: 20px;
          background-color: ;
          border: 1px solid #dee2e6;
          border-radius: 5px;
        }
        .order-body {
          display:flex
          justify-content:space-around;
          border-block: 1px solid var(--my-white);
         
        }
        @media (max-width: 991px) {
          .order-body {
            flex-direction: column;
            align-items: start;
            &>div {
            margin-bottom:20px;
          }
          }
        }
        .order-head {
          display: flex;
          align-items: center;
        }
        @media (max-width: 991px) {
          .order-head {
            flex-direction: column;
            align-items: start;
          }
        }
      `}</style>
    </div>
  )
}
