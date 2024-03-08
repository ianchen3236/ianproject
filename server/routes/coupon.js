import express from "express";
import mydb from '../configs/mydb.js'

const router = express.Router();

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
router.get('/', async (req, res) => {
    try {
      
      const [results] = await mydb.execute(
        `SELECT * FROM mycoupon`
      )
      res.send(results)
    } catch (err) {
      console.error('查詢資料錯誤:', err)
      return res.status(500).json({ status: 'error', message: '資料庫查詢失敗' })
    }
  })

//lesson_category?/categories=kind券類別
router.get("/kinds", async (req, res) => {
  try {
    let [coupon_kind] = await db.execute("SELECT * FROM `mycoupon`");
    if (coupon_kind) {
      res.json(coupon_kind);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤");
  }
});

//lesson_category?/categories=type券打折方式
router.get("/types", async (req, res) => {
  try {
    let [coupon_type] = await db.execute("SELECT * FROM coupon ");

    if (coupon_type) {
      res.json(coupon_type);
    } else {
      res.json("沒有找到相應的資訊");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤");
  }
});

export default router;