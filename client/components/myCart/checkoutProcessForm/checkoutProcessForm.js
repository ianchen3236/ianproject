import React, { useEffect, useState } from 'react'
import { Form, Container, Collapse } from 'react-bootstrap'
import styles from './checkoutProcessForm.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { countries, townships, postcodes } from '@/data/data-townships'

// icon
import { IoIosArrowRoundBack, IoIosFiling } from 'react-icons/io'

import {
  MdLocalShipping,
  MdPerson,
  MdReceiptLong,
  MdOutlinePayments,
} from 'react-icons/md'

export default function CheckoutProcessForm() {
  const router = useRouter()
  //用來判定是從cart到checkout 還是 confirmation到checkout
  const { checkout_info } = router.query

  const [formData, setFormData] = useState({
    shipping: '宅配', //默認宅配,後續新增7-11物流
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    country: '',
    township: '',
    postcode: '',
    address: '',
    invoiceType: '2', //1非營業人電子發票 ２捐贈（默認）  3手機條碼
    mobileBarcode: '', //手機載具 當invoiceType為3時,才會有資料
    payType: 'LinePay', //支付類型
  })

  useEffect(() => {
    // 從localStorage中取出之前保存的資料
    if (checkout_info) {
      const storedData = JSON.parse(localStorage.getItem('checkout_info'))
      if (storedData) {
        setFormData(storedData)
      }
    }
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

    // 檢查是否正在更改發票類型
    if (name === 'invoiceType') {
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
      !formData.mobilePhone ||
      !formData.country ||
      !formData.township ||
      !formData.address
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

  return (
    <>
      <Container className="my-5 ">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-h4 text-my-black mb-3 mt-5 d-flex align-items-center">
              <IoIosFiling className="me-2 text-my-black" size="24px" />
              收貨方式
            </h2>
            <Link href="/cart">
              <div className="d-flex align-items-center back-to-product-list ">
                <IoIosArrowRoundBack className="" size="18px" />
                返回購物車
              </div>
            </Link>
          </div>
          <Form.Group>
            <div className="icon-box d-flex mt-4">
              <Form.Check
                className={`text-h5 text-my-black ${styles['form-check']} `}
                label="宅配"
                type="radio"
                name="shipping"
                id="shippingType1"
                value="宅配"
                onChange={handleChange}
                checked={formData.shipping === '宅配'}
              />
            </div>
            <div className="icon-box d-flex mt-4">
              <Form.Check
                className={`text-h5 text-my-black ${styles['form-check']} `}
                label="7-11物流"
                type="radio"
                name="shipping"
                id="shippingType2"
                value="7-11"
                onChange={handleChange}
                checked={formData.payType === '7-11'}
              />
            </div>
          </Form.Group>
        </div>
        <h2 className="text-h4 text-my-black my-3 d-flex align-items-center">
          <MdPerson className="me-2 text-my-black  " size="24px" />
          收件人資料
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label className="text-h5 text-my-black">姓</Form.Label>
            <Form.Control
              className={`${styles['form-control']}`}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="請輸入姓氏"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label className="text-h5 text-my-black">名</Form.Label>
            <Form.Control
              className={`${styles['form-control']}`}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="請輸入名字"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-h5 text-my-black">電子郵箱</Form.Label>
            <Form.Control
              className={`${styles['form-control']}`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="請輸入您的電子郵箱"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMobilePhone">
            <Form.Label className="text-h5 text-my-black">行動電話</Form.Label>
            <Form.Control
              className={`${styles['form-control']}`}
              type="tel"
              name="mobilePhone"
              value={formData.mobilePhone}
              onChange={handleChange}
              placeholder="請輸入便於聯繫的行動電話"
            />
          </Form.Group>

          <h2 className="text-h4 text-my-black mb-3 mt-5 d-flex align-items-center">
            <MdLocalShipping className="me-2 text-my-black" size="24px" />
            運送資料
          </h2>
          <Form.Group controlId="formCountry">
            <Form.Label className="text-h5 text-my-black">城市</Form.Label>
            <Form.Select
              className={` ${styles['option-placeholder']}`}
              as="select"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="" disabled>
                請選擇城市
              </option>
              {countries.map((v, i) => (
                <option key={i} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formTownship">
            <Form.Label className="text-h5 text-my-black">鄉鎮區</Form.Label>
            <Form.Select
              className={`${styles['form-control']} ${styles['option-placeholder']}`}
              name="township"
              value={formData.township}
              onChange={handleChange}
            >
              <option value="" disabled>
                請選擇鄉鎮區
              </option>
              {formData.country !== '' &&
                townships[countries.indexOf(formData.country)].map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formPostcode">
            <Form.Label className="text-h5 text-my-black">郵遞區號</Form.Label>
            <Form.Control
              className={styles['form-control']}
              type="text"
              name="postcode"
              value={
                formData.country && formData.township
                  ? postcodes[countries.indexOf(formData.country)][
                      townships[countries.indexOf(formData.country)].indexOf(
                        formData.township
                      )
                    ]
                  : ''
              }
              onChange={handleChange}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label className="text-h5 text-my-black">地址</Form.Label>
            <Form.Control
              className={styles['form-control']}
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="請輸入地址"
            />
          </Form.Group>
          <div>
            <h2 className="text-h4 text-my-black mb-3 mt-5 d-flex align-items-center">
              <MdReceiptLong className="me-2 text-my-black" size="24px" />
              發票類型
            </h2>
            <Form.Group>
              <Form.Check
                className={`text-h5 text-my-black ${styles['form-check']} `}
                type="radio"
                label="非營業人電子發票"
                name="invoiceType"
                id="invoiceType1"
                value="1"
                onChange={handleChange}
                checked={formData.invoiceType === '1'}
              />
              <Form.Check
                className={`text-h5 text-my-black ${styles['form-check']} `}
                type="radio"
                label="雲端發票-捐贈"
                name="invoiceType"
                id="invoiceType2"
                value="2"
                onChange={handleChange}
                checked={formData.invoiceType === '2'}
              />
              <Form.Check
                className={`text-h5 text-my-black ${styles['form-check']} `}
                type="radio"
                label="雲端發票-手機條碼"
                name="invoiceType"
                id="invoiceType3"
                value="3"
                onChange={handleChange}
                checked={formData.invoiceType === '3'}
              />
            </Form.Group>

            <Collapse in={formData.invoiceType === '3'}>
              <Form.Group className="mb-3" controlId="formMobileBarcode">
                <Form.Control
                  className={`${styles['form-control']}`}
                  type="text"
                  name="mobileBarcode"
                  value={formData.mobileBarcode}
                  onChange={handleChange}
                  placeholder="請輸入手機載具 ex:/545142S"
                />
              </Form.Group>
            </Collapse>
          </div>
          <div>
            <h2 className="text-h4 text-my-black mb-3 mt-5 d-flex align-items-center">
              <MdOutlinePayments className="me-2 text-my-black" size="24px" />
              支付方式
            </h2>
            <Form.Group className="">
              <div className="icon-box d-flex mt-4">
                <Form.Check
                  className={`text-h5 text-my-black ${styles['form-check']} `}
                  type="radio"
                  name="payType"
                  id="payType1"
                  value="LinePay"
                  onChange={handleChange}
                  checked={formData.payType === 'LinePay'}
                />
                <img
                  label="LINEPAY"
                  src="/images/paylogo/linepay.png"
                  alt="linepay"
                  className="object-fit-cover ps-3"
                />
              </div>
              <div className="icon-box d-flex mt-4">
                <Form.Check
                  className={`text-h5 text-my-black ${styles['form-check']} `}
                  type="radio"
                  name="payType"
                  id="payType2"
                  value="綠界Pay"
                  onChange={handleChange}
                  checked={formData.payType === '綠界Pay'}
                />
                <img
                  label="ECPAY"
                  src="/images/paylogo/ecpay2.png"
                  alt="linepay"
                  className="object-fit-cover ps-3"
                />
              </div>
              <div className="icon-box d-flex mt-4">
                <Form.Check
                  className={`text-h5 text-my-black ${styles['form-check']} `}
                  type="radio"
                  label=""
                  name="payType"
                  id="payType3"
                  value="信用卡"
                  onChange={handleChange}
                  checked={formData.payType === '信用卡'}
                />
                <img
                  label="ECPAY"
                  src="/images/paylogo/creditcard.png"
                  alt="linepay"
                  className="object-fit-cover ps-2"
                />
              </div>
            </Form.Group>
          </div>
          <div
            className="col-lg-4 ms-auto my-button1  mt-5 "
            onClick={handleSubmit}
          >
            下一步
          </div>
        </Form>
      </Container>
      <style jsx>{`
        .icon-box {
          width: 200px;
          height: 35px;
        }

        .object-fit-cover {
          weight: 100%;
          height: 100%;
          object-fit: cover;
        }
        .back-to-product-list {
          border-bottom: 1px solid var(--my-black);
        }
      `}</style>
    </>
  )
}
