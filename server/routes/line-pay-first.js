import express from 'express'

//連接資料庫
import mydb from '##/configs/mydb.js'

// line pay使用npm套件 串接流程簡化成只要呼叫 SDK 的 API 就可以完成
import { createLinePayClient } from 'line-pay-merchant'

// 產生uuid用
import { v4 as uuidv4 } from 'uuid'
const router = express.Router()

// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 定義安全的私鑰字串 (重要)
const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: process.env.NODE_ENV,
})

// import sampleData from '../data/linepay/sampleData.js'

/* GET home page */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

// (1) 建立訂單路由
router.post('/creatOrder', async (req, res) => {
  // 初始化 connection 變量，確保它在 try、catch 和 finally 塊中都可訪問
  let connection

  // 會員id由authenticate中介軟體提供 （未完成）
  const userId = 556

  //假設前端丟過來的checkout資料
  const clientOrder = req.body
  console.log(clientOrder)

  //要生成給資料庫的資料 進行formData解構
  const {
    shipping,
    firstName,
    lastName,
    email,
    mobilePhone,
    country,
    township,
    postcode,
    address,
    invoiceType,
    mobileBarcode,
    payType,
    coupon_id,
  } = clientOrder.formData

  //進行cart解構
  const cart = clientOrder.cart
  console.log(cart)

  //產生 orderId與packageId
  const orderId = uuidv4()
  const packageId = uuidv4()

  // 要傳送給line pay的訂單資訊 (完成)
  const order = {
    orderId: orderId,
    currency: 'TWD',
    amount: req.body.amount,
    packages: [
      {
        id: packageId,
        amount: req.body.amount,
        products: req.body.products,
      },
    ],
    options: { display: { locale: 'zh_TW' } },
  }

  // 要儲存到資料庫的order與line_pay資料 （成功）
  try {
    connection = await mydb.getConnection()
    //若資料有錯誤 會回滾所有資料避免部分資料寫入
    await connection.beginTransaction()

    //先寫入到 `order_info`
    const [orderInfoResult] = await connection.execute(
      'INSERT INTO `order_info` (firstname,lastname,email,mobilephone,country,township,postcode,address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        firstName,
        lastName,
        email,
        mobilePhone,
        country,
        township,
        postcode,
        address,
      ]
    )
    // 取出order_info的id
    const orderInfoId = orderInfoResult.insertId

    // 寫入到`order`表
    await connection.execute(
      'INSERT INTO `order` (id, user_id, amount,payment_status, order_info_id,coupon_id,payment,shipping) VALUES (?, ?, ?,?, ?, ?,?,?)',
      [
        orderId,
        userId,
        req.body.amount,
        'pending',
        orderInfoId,
        coupon_id,
        payType,
        shipping,
      ] // 假設初始狀態為'pending'
    )

    // 寫入到`order_item`表
    //await Promise.all 搭配map使用,確保所有order_item資料完成才進行後面執行
    await Promise.all(
      cart.map(async (v) => {
        await connection.execute(
          'INSERT INTO `order_item` (	order_id,product_id,quantity,item_price) VALUES (?,?,?,?)',
          [orderId, v.id, v.qty, v.price]
        )
      })
    )

    // 寫入到`line_pay`表
    await connection.execute(
      'INSERT INTO `line_pay` ( order_id, order_info) VALUES (?,?)',
      [orderId, JSON.stringify(order)]
    )

    await connection.commit() // 成功：提交事務  將order和line_pay數據

    // 回傳成功訊息與訂單資訊給前端
    res.json({ status: 'success', data: { order } })
  } catch (error) {
    if (connection) {
      await connection.rollback() //失敗：提交事務回滾 order與line_pay表所有寫入資料被取消
    }
    console.error('處理訂單時出現錯誤:', error)
    res.status(500).json({ status: 'error', message: '處理訂單時出現錯誤' })
  } finally {
    if (connection) {
      connection.release()
    }
  }
})

// (2) 導向line pay的路由 需要訂單的orderId
// 重新導向到line-pay，進行交易(純導向不回應前端)
router.get('/reserve', async (req, res) => {
  console.log(req.query.orderId)

  if (!req.query.orderId) {
    return res.json({ status: 'error', message: 'order id不存在' })
  }

  const orderId = req.query.orderId

  // 設定重新導向與失敗導向的網址 （重要）
  const redirectUrls = {
    confirmUrl: process.env.REACT_REDIRECT_CONFIRM_URL,
    cancelUrl: process.env.REACT_REDIRECT_CANCEL_URL,
  }

  // 從ｌｉｎｅ_ｐａｙ資料庫取得訂單資料
  let orderRecord
  try {
    const [results] = await mydb.execute(
      'SELECT * FROM `line_pay` WHERE `order_id`=?',
      [orderId]
    )
    orderRecord = results[0]
  } catch (err) {
    console.error('查詢資料錯誤:', err)
    return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
  }

  if (!orderRecord) {
    console.log('查無此訂單ID')
    return res.json({ status: 'error', message: '查無此訂單ID' })
  }

  // order_info記錄要向line pay要求的訂單json
  const order = JSON.parse(orderRecord.order_info)

  //const order = cache.get(orderId)
  console.log(`獲得訂單資料，內容如下：`)
  console.log(order)

  try {
    // 向line pay傳送的訂單資料
    const linePayResponse = await linePayClient.request.send({
      body: { ...order, redirectUrls },
    })

    // 深拷貝一份order資料
    const reservation = JSON.parse(JSON.stringify(order))

    reservation.returnCode = linePayResponse.body.returnCode
    reservation.returnMessage = linePayResponse.body.returnMessage
    reservation.transactionId = linePayResponse.body.info.transactionId
    reservation.paymentAccessToken =
      linePayResponse.body.info.paymentAccessToken

    console.log(`預計付款資料(Reservation)已建立。資料如下:`)
    console.log(reservation)

    // 在db儲存reservation資料
    try {
      const [result] = await mydb.execute(
        `UPDATE line_pay SET reservation = ?, transaction_id = ? WHERE order_id = ?`,
        [JSON.stringify(reservation), reservation.transactionId, orderId]
      )
      // result物件包含了此次更新操作的信息，如受影響的行數
      // console.log(result)

      if (result.affectedRows > 0) {
        console.log('更新成功')
      } else {
        console.log('沒有找到匹配的資料進行更新')
      }

      // 導向到付款頁面， line pay回應後會帶有info.paymentUrl.web為付款網址
      //postman測試中 173可能會刪掉
      // if (linePayResponse) {
      //   console.log('請求linpay付款成功')
      //   return res.json({
      //     status: 'success',
      //     message: linePayResponse.body.info.paymentUrl.web,
      //   })
      // }
      console.log(linePayResponse.body.info.paymentUrl.web)

      res.redirect(linePayResponse.body.info.paymentUrl.web)
    } catch (err) {
      console.error('更新資料時出現錯誤:', err)
    }
  } catch (err) {
    console.error('查詢資料錯誤:', err)
  }
})

//(3)向linepay'確認交易結果'的路由
router.get('/confirm', async (req, res) => {
  // 網址上需要有transactionId
  const transactionId = req.query.transactionId

  // 從資料庫取得交易資料
  let dbLinePay
  try {
    const [results] = await mydb.execute(
      'SELECT * FROM `line_pay` WHERE `transaction_id`=?',
      [transactionId]
    )
    dbLinePay = results[0]
    if (!dbLinePay) {
      return res.json({ status: 'error', message: '無法確認此交易訂單ＩＤ' })
    }

    console.log(dbLinePay)
  } catch (err) {
    console.error('查詢資料錯誤', err)
  }

  // 交易資料
  const transaction = JSON.parse(dbLinePay.reservation)
  console.log(transaction)

  // 交易金額
  const amount = transaction.amount

  try {
    // 最後確認交易
    const linePayResponse = await linePayClient.confirm.send({
      transactionId: transactionId,
      body: {
        currency: 'TWD',
        amount: amount,
      },
    })

    // linePayResponse.body回傳的資料
    console.log(linePayResponse)

    //transaction.confirmBody = linePayResponse.body

    // status: 'pending' | 'paid' | 'cancel' | 'fail' | 'error'
    let status = 'paid'

    if (linePayResponse.body.returnCode !== '0000') {
      status = 'fail'
    }

    // 更新line_pay資料庫的訂單狀態
    let connection
    try {
      connection = await mydb.getConnection()

      await connection.beginTransaction()

      await connection.execute(
        `UPDATE \`order\` SET payment_status =?  WHERE id = ?`,
        [status, dbLinePay.order_id]
      )

      await connection.execute(
        `UPDATE line_pay SET return_code = ?, \`confirm\`=? WHERE order_id = ?`,
        [
          linePayResponse.body.returnCode,
          JSON.stringify(linePayResponse.body),
          dbLinePay.order_id,
        ]
      )

      // console.log('更新訂單狀態成功', result)
      await connection.commit()
      console.log('資料更新完畢')
    } catch (err) {
      console.error('更新訂單狀態資料失敗', err)
    } finally {
      if (connection) await connection.release()
    }

    return res.json({ status: 'success', data: linePayResponse.body })
  } catch (error) {
    return res.json({ status: 'fail', data: error.data })
  }
})

//因為linepay的confirm路由,只能查詢一次,因此另外設一個路由,可以重複向linepay的伺服器查詢資料
router.get('/check-transaction', async (req, res) => {
  const transactionId = req.query.transactionId

  try {
    const linePayResponse = await linePayClient.checkPaymentStatus.send({
      transactionId: transactionId,
      params: {},
    })
    console.log(linePayResponse.body)

    res.json(linePayResponse.body)
  } catch (err) {
    res.json({ status: 'transactionId錯誤', error: err })
  }
})
export default router
