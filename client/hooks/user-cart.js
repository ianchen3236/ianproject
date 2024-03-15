import { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

/* 資料庫資料 */
//優惠卷
import couponsData from '@/data/coupon.json'

//地區資料
import { countries, townships, postcodes } from '@/data/data-townships'

//1.建立與導出
export const CartContext = createContext(null)
// 協助全站(_app.js)裡套用Provider的元件，集中要使用的狀態
export function CartProvider({ children }) {
  // 共享用狀態(state)
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  //初始化 localstorage資料提取到cart
  useEffect(() => {
    if (localStorage.getItem('cart')) {
      const clientCart = JSON.parse(localStorage.getItem('cart'))
      setCart(clientCart)
    }
  }, [])

  //cart狀態改變 同步更新到localstorage的cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // general datas
  const cartGeneral = cart.filter((v) => v.type === 'general')

  // course datas
  const cartCourse = cart.filter((v) => v.type === 'course')

  //購物車的某item數量增加
  const increment = (id) => {
    const newCart = cart.map((v, i) => {
      if (v.id === id) return { ...v, qty: v.qty + 1 }
      else return v
    })
    setCart(newCart)
  }

  //購物車的某item數量減少
  const decrement = (id) => {
    const newCart = cart.map((v, i) => {
      if (v.id === id) return { ...v, qty: v.qty - 1 }
      else return v
    })
    setCart(newCart)
  }

  // 新增項目到購物車 (old version)
  const addCartItem = (item) => {
    if (item.type === 'general') {
      const index = cart.findIndex((v, i) => v.id === item.id)
      if (index > -1) {
        increment(item.id)
        return false
      }
      // 擴充item數量屬性
      const newItem = { ...item, qty: 1 }
      const newCart = [...cart, newItem]
      setCart(newCart)
    } else {
      // 只有單一數量的商品 例如課程
      const index = cart.findIndex((v, i) => v.id === item.id)
      if (index > -1) {
        alert(`已經添加過【${item.name}】到購物車`)
        return false
      }
      // 擴充item數量屬性
      const newItem = { ...item, qty: 1 }
      const newCart = [...cart, newItem]
      setCart(newCart)
    }
  }

  //刪除購物車的項目
  const removeCartItem = (item) => {
    const newCart = cart.filter((v, i) => v.id !== item.id)
    setCart(newCart)
  }

  //計算總商品數量 以品項計算
  const totalItems = cart.length

  //計算總小記
  const rawTotalPrice = cart.reduce((acc, v) => acc + v.qty * v.price, 0)

  // 轉換金額格式為$99,999
  function formatPrice(price) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
    })
    return formatter.format(price)
  }

  /* 處理優惠卷 */

  const [coupons, setCoupons] = useState([])
  const [selectedCouponID, setSelectedCouponID] = useState('none')
  const [selectCoupon, setSelectCoupon] = useState({})

  //處理資料庫過來的優惠卷資料
  useEffect(() => {
    const fetchData = async () => {
      const newcouponsData = await couponsData
      if (newcouponsData) {
        setCoupons(newcouponsData)
      }
    }
    fetchData()
  }, [])

  //初始化 localstorage資料提取到selectCoupon
  useEffect(() => {
    if (localStorage.getItem('selectedCouponID')) {
      const clientSelectedCouponID =
        localStorage.getItem('selectedCouponID') || 'none'
      setSelectedCouponID(clientSelectedCouponID)
    }
  }, [])

  useEffect(() => {
    handleSelectCoupon(coupons, selectedCouponID)
  }, [selectedCouponID, coupons])

  const handleSelectCoupon = (coupponsArray, coupon_code) => {
    const [newSelectCoupon] = coupponsArray.filter(
      (v) => coupon_code === v.coupon_code
    )

    if (newSelectCoupon) {
      setSelectCoupon(newSelectCoupon)
    } else {
      setSelectCoupon({
        coupon_code: 'none',
        coupon_name: '無',
        ValidFrom: '',
        ValidTo: '',
        MinimumSpend: 0,
        DiscountType: '',
        DiscountValue: 0,
        UsageLimit: 0,
        UsedCount: 0,
      })
    }
  }

  const handleRadioChange = (e) => {
    // 更新选中的优惠券ID状态，并保存到localStorage
    const newSelectedCouponID = e.target.value
    setSelectedCouponID(newSelectedCouponID)
    localStorage.setItem('selectedCouponID', newSelectedCouponID)
  }
  /* formData */
  const router = useRouter()
  const [formData, setFormData] = useState({
    shipping: '宅配', //默認宅配,後續新增7-11物流
    shippingFee: '200',
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    // 宅配信息
    country: '',
    township: '',
    postcode: '',
    address: '',
    // 門市自取信息
    storeID: '',
    storeType: '',
    storeName: '',
    storeAddress: '',
    // 共用信息
    invoiceType: '2', //1非營業人電子發票 ２捐贈（默認）  3手機條碼
    mobileBarcode: '', //手機載具 當invoiceType為3時,才會有資料
    payType: 'LinePay', //支付類型
  })

  useEffect(() => {
    const clientCheckoutInfo =
      JSON.parse(localStorage.getItem('checkout_info')) || {}
    setFormData(clientCheckoutInfo)
  }, [])

  //將資料存到localstorage 保存
  useEffect(() => {
    localStorage.setItem('checkout_info', JSON.stringify(formData))
  }, [formData])

  //由於postcode是設置onlyread 導致onchange無法監聽 因此透過依賴變數方式去改變FormData.postcode
  useEffect(() => {
    if (formData.country && formData.township) {
      const countryIndex = countries.indexOf(formData.country)
      const townshipIndex = townships[countryIndex].indexOf(formData.township)
      const newPostcode = postcodes[countryIndex][townshipIndex]

      setFormData((prevFormData) => ({
        ...prevFormData,
        postcode: newPostcode,
      }))
    }
  }, [formData.country, formData.township])

  //處理門市資料
  useEffect(() => {
    // 確保組件加載完成後再讀取查詢參數
    if (router.isReady) {
      const { storeType, storeID, storeName, storeAddress } = router.query

      // 設置門市資訊到狀態，同時保留其他已有的狀態資料
      setFormData((currentFormData) => ({
        ...currentFormData, // 保留原有資料
        shipping: storeType || currentFormData.shipping, // 更新storeID，如果不存在則保留原有值
        storeID: storeID || currentFormData.storeID, // 更新storeID，如果不存在則保留原有值
        storeName: storeName || currentFormData.storeName, // 更新storeName，如果不存在則保留原有值
        storeAddress: storeAddress || currentFormData.storeAddress, // 更新storeAddress，如果不存在則保留原有值
      }))
    }
  }, [router.isReady, router.query]) // 監聽router.query的變化

  const handleChange = (e) => {
    const { name, value } = e.target

    //當country選取時重置township&postcode
    if (name === 'country') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        township: '',
        postcode: '',
      }))
    }

    //當門市重新選取時重置
    if (name === 'shipping') {
      const isNotHomeDelivery = value !== '宅配'
      const newShippingFee = isNotHomeDelivery ? '80' : '200'

      setFormData((prevFormData) => ({
        ...prevFormData,
        // 當更改運送方式時，根據選擇重置或保持門市資料
        storeType: isNotHomeDelivery ? '' : prevFormData.storeType,
        storeID: isNotHomeDelivery ? '' : prevFormData.storeID,
        storeName: isNotHomeDelivery ? '' : prevFormData.storeName,
        storeAddress: isNotHomeDelivery ? '' : prevFormData.storeAddress,
        // 更新shipping值和運費
        [name]: value,
        shippingFee: newShippingFee,
      }))
    }
    if (name === 'invoiceType') {
      // 檢查是否正在更改發票類型
      // 如果發票類型不是3，則將手機載具的資料設為空值
      const mobileBarcodeValue = value === '3' ? formData.mobileBarcode : ''
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        mobileBarcode: mobileBarcodeValue,
      }))
    } else {
      // 對於其他情況，正常更新表單資料
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 必填所有表格欄位
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobilePhone
    ) {
      alert('請填寫所有資料')
      return // 阻止提交
    }

    if (formData.invoiceType === '3' && !formData.mobileBarcode) {
      alert('請填寫手機條碼')
      return // 阻止提交
    }

    console.log(formData) // 處理表單數據...
    router.push('/cart/confirmation')
  }

  //計算總金額 （扣掉優惠卷與運費） -未完成優惠卷邏輯

  useEffect(() => {
    const numericShippingFee = Number(formData.shippingFee)
    let discountAmount = 0
    if (selectCoupon && selectCoupon.DiscountType === 'Amount') {
      discountAmount = selectCoupon.DiscountValue
    } else if (selectCoupon && selectCoupon.DiscountType === 'Percent') {
      discountAmount =
        cart.reduce((acc, v) => acc + v.qty * v.price, 0) *
        (selectCoupon.DiscountValue / 100)
    }

    const newTotalPrice =
      cart.reduce((acc, v) => acc + v.qty * v.price, 0) +
      numericShippingFee -
      discountAmount
    // 假设你有一个状态来存储最终的总金额
    setTotalPrice(newTotalPrice)
  }, [cart, formData.shippingFee, selectCoupon])

  /* confirmation */

  useEffect(() => {
    // 監聽 selectCoupon 的變化，僅更新優惠券資訊，同時保留其他 formData 資訊
    setFormData((prevFormData) => ({
      ...prevFormData,
      coupon_id: selectCoupon.id || null,
      coupon_name: selectCoupon.coupon_name || '無',
    }))
  }, [selectCoupon])

  return (
    <CartContext.Provider
      value={{
        // 購物車
        cart,
        removeCartItem,
        increment,
        decrement,
        addCartItem,
        formatPrice,
        rawTotalPrice,
        totalPrice,
        cartCourse,
        cartGeneral,
        totalItems,
        // 優惠卷
        coupons,
        selectedCouponID,
        selectCoupon,
        handleSelectCoupon,
        handleRadioChange,
        // formData
        handleChange,
        handleSubmit,
        formData,
        countries,
        townships,
        postcodes,
      }}
      //用value屬性傳入共享用狀態(state)
    >
      {children}
    </CartContext.Provider>
  )
}
// 給消費者們(consumers)，包裝好專用於此context的勾子名稱
export const useCart = () => useContext(CartContext)
