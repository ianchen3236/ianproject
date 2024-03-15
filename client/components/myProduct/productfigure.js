import React from 'react'

const ProductFigure = ({ image, brand, name, price }) => {
  // 格式化价格，添加千位分隔符
  const formattedPrice = price.toLocaleString()

  return (
    <div className="card m-2 border-0 shadow" style={{ width: '100%' }}>
      <img
        src={image}
        className="card-img-top"
        alt={name}
        style={{ width: 'auto', height: '300px', objectFit: 'cover' }}
      />
      <div className="card-body no-space-x ">
        <p className="text-p ">{brand}</p>
        <p className="text-h4 ">{name}</p>
        <span className="text-my-notice text-h5 ">${formattedPrice}</span>
        <div style={{ position: 'absolute', top: '3%', right: '5%' }}></div>
      </div>
    </div>
  )
}

export default ProductFigure
