import React, { useEffect, useState } from 'react'
import { Form, Container, Collapse } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import styles from './checkoutProcessForm.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import { countries, townships, postcodes } from '@/data/data-townships'

// icon
import { IoIosArrowRoundBack, IoIosFiling } from 'react-icons/io'

import EcpayShipment from '../ecPayShippment'

import {
  MdLocalShipping,
  MdPerson,
  MdReceiptLong,
  MdOutlinePayments,
} from 'react-icons/md'

export default function CheckoutProcessForm({
  handleChange = () => {},
  // handleSubmit = () => {},
  formData = {},
  countries = [],
  townships = [],
  postcodes = [],
}) {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    },
  })

  const onSubmit = (data) => {
    console.log('data', data)
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
                label="黑貓宅急便"
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
                label="7-11店到店"
                type="radio"
                name="shipping"
                id="shippingType2"
                value="UNIMARTC2C"
                onChange={handleChange}
                checked={formData.shipping === 'UNIMARTC2C'}
              />
            </div>

            <div className="icon-box d-flex mt-4">
              <Form.Check
                className={`text-h5 text-my-black ${styles['form-check']} `}
                label="全家店到店"
                type="radio"
                name="shipping"
                id="shippingType2"
                value="FAMIC2C"
                onChange={handleChange}
                checked={formData.shipping === 'FAMIC2C'}
              />
            </div>

            <div className="icon-box d-flex mt-4">
              <Form.Check
                className={`text-h5 text-my-black ${styles['form-check']} `}
                label="OK店到店"
                type="radio"
                name="shipping"
                id="shippingType3"
                value="OKMARTC2C"
                onChange={handleChange}
                checked={formData.shipping === 'OKMARTC2C'}
              />
            </div>
          </Form.Group>
        </div>
        {formData.shipping === '宅配' && (
          <>
            {/* 宅配*/}
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
              <Form.Label className="text-h5 text-my-black">
                郵遞區號
              </Form.Label>
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
          </>
        )}
        {formData.shipping === 'UNIMARTC2C' && (
          <>
            {/* 門市*/}
            <div
              style={{
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '1rem',
              }}
            >
              <EcpayShipment shipping={formData.shipping} />
              <p>
                <strong>超商類型:</strong> 統一超商
              </p>
              <p>
                <strong>門市:</strong> {formData.storeName}
              </p>
              <p>
                <strong>門市地址:</strong> {formData.storeAddress}
              </p>
            </div>
          </>
        )}
        {formData.shipping === 'FAMIC2C' && (
          <>
            {/* 門市*/}
            <div
              style={{
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '1rem',
              }}
            >
              <EcpayShipment shipping={formData.shipping} />
              <p>
                <strong>超商類型:</strong> 全家超商
              </p>
              <p>
                <strong>門市:</strong> {formData.storeName}
              </p>
              <p>
                <strong>門市地址:</strong> {formData.storeAddress}
              </p>
            </div>
          </>
        )}
        {formData.shipping === 'OKMARTC2C' && (
          <>
            {/* 門市*/}
            <div
              style={{
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginBottom: '1rem',
              }}
            >
              <EcpayShipment shipping={formData.shipping} />
              <p>
                <strong>超商類型:</strong> OK超商
              </p>
              <p>
                <strong>門市:</strong> {formData.storeName}
              </p>
              <p>
                <strong>門市地址:</strong> {formData.storeAddress}
              </p>
            </div>
          </>
        )}
        <h2 className="text-h4 text-my-black my-5 d-flex align-items-center">
          <MdPerson className="me-2 text-my-black  " size="24px" />
          收件人資料
        </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label className="text-h5 text-my-black">姓</Form.Label>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: '姓氏是必填的',
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Control {...field} type="text" isInvalid={!!error} />
              )}
            />
            {errors.firstName && (
              <Form.Control.Feedback type="invalid">
                {errors.firstName.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label className="text-h5 text-my-black">名</Form.Label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  isInvalid={!!errors.lastName}
                />
              )}
            />
            {errors.lastName && (
              <Form.Control.Feedback type="invalid">
                名字是必填的
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-h5 text-my-black">電子郵箱</Form.Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: '電子郵箱是必填項目',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: '無效的電子郵箱地址',
                },
              }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  isInvalid={!!errors.email}
                />
              )}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMobilePhone">
            <Form.Label className="text-h5 text-my-black">行動電話</Form.Label>
            <Controller
              name="mobilePhone"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  isInvalid={!!errors.mobilePhone}
                />
              )}
            />
            {errors.mobilePhone && (
              <Form.Control.Feedback type="invalid">
                電話是必填的
              </Form.Control.Feedback>
            )}
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
          <button type="submit">提交</button>
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
