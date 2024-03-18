import express from 'express'
import mydb from '../configs/mydb.js'

const router = express.Router()

// //coupon資料
// router.get("/", async (req, res) => {
//   try {
//     let [couponData] = await db.execute("SELECT * FROM `mycoupon`");

//     if (couponData) {
//       res.json(couponData);
//     } else {
//       res.json("沒有找到相應的資訊");
//     }
//   } catch (error) {
//     console.error("發生錯誤：", error);
//     res.json("發生錯誤");
//   }
// });
router.get('/catchCoupon', async (req, res) => {
  try {
    const [results] = await mydb.execute(`SELECT * FROM mycoupon LIMIT 4`)
    console.log(results)

    res.json(results)
  } catch (err) {
    console.error('查詢資料錯誤:', err)
    return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
  }
})
// 領取優惠券資料
router.get('/get', async (req, res) => {
  try {
    let output = { status: '', res: '' }
    let [results] = await mydb.execute(
      `SELECT count(*) as num FROM member_coupon WHERE user_id=1 AND coupon_id=${req.query.id_coupon}`
    )
    if (results[0].num > 0) {
      output.status = 'error'
      output.msg = '已經領過了!'
    } else {
      await mydb.execute(
        `INSERT INTO member_coupon  (coupon_id,user_id,valid) VALUES (${req.query.id_coupon},1,1);`
      )
      output.status = 'success'
      output.msg = '成功領取優惠券!'
    }

    res.json(output)
  } catch (err) {
    console.error('查詢資料錯誤:', err)
    return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
  }
})
router.get('/activity', async (req, res) => {
  try {
    let sql
    if (req.query.type == '1') {
      sql =
        'SELECT `c`.*,if(`mc`.`id` is not null,1,0) as `status` FROM `mycoupon` AS `c` LEFT JOIN `member_coupon` AS `mc` ON `c`.`id` = `mc`.`coupon_id` WHERE `c`.`id`<=4'
    } else {
      sql =
        'SELECT `c`.*,if(`mc`.`id` is not null,1,0) as `status` FROM `mycoupon` AS `c` LEFT JOIN `member_coupon` AS `mc` ON `c`.`id` = `mc`.`coupon_id` WHERE `c`.`id` BETWEEN 5 AND 6'
    }
    const [results] = await mydb.execute(sql)
    console.log(results)

    res.json(results)
  } catch (err) {
    console.error('查詢資料錯誤:', err)
    return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
  }
})

router.get('/memberCoupon', async (req, res) => {
  try {
    const [results] = await mydb.execute(
      `SELECT member_coupon.*, mycoupon.* FROM member_coupon JOIN
        mycoupon ON member_coupon.coupon_id = mycoupon.id WHERE member_coupon.user_id = 1`
    )
    console.log(results)

    res.json(results)
  } catch (err) {
    console.error('查詢資料錯誤:', err)
    return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
  }
})

//lesson_category?/categories=kind券類別
router.get('/kinds', async (req, res) => {
  try {
    let [coupon_kind] = await db.execute('SELECT * FROM `mycoupon`')
    if (coupon_kind) {
      res.json(coupon_kind)
    } else {
      res.json('沒有找到相應的資訊')
    }
  } catch (error) {
    console.error('發生錯誤：', error)
    res.json('發生錯誤')
  }
})

//lesson_category?/categories=type券打折方式
router.get('/types', async (req, res) => {
  try {
    let [coupon_type] = await db.execute('SELECT * FROM coupon ')

    if (coupon_type) {
      res.json(coupon_type)
    } else {
      res.json('沒有找到相應的資訊')
    }
  } catch (error) {
    console.error('發生錯誤：', error)
    res.json('發生錯誤')
  }
})

export default router
