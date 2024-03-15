import mydb from '##/configs/mydb.js'; // 資料庫
import express from 'express'; // 伺服器
const router = express.Router(); // 建立 Router 物件

// http://localhost:3005/api/service，此頁功能是依據條件查詢分店
router.get('/', async (req, res) => {
    try {
        // 从 req.query 中获取查询参数
        const { area, openTime, closeTime, textSearch } = req.query;

        // 构建 SQL 查询语句
        let sql = 'SELECT * FROM stores WHERE 1 = 1'; // 初始 SQL 语句，1 = 1 是为了方便后续条件拼接

        // 根据参数拼接 SQL 查询语句
        if (area && area.trim() !== '') {
            sql += ` AND area IN ('${area.split(',').join("','")}')`;
        }
        if (openTime && openTime.trim() !== '') {
            sql += ` AND opentime >= '${openTime}'`;
        }
        if (closeTime && closeTime.trim() !== '') {
            sql += ` AND closetime <= '${closeTime}'`;
        }
        if (textSearch && textSearch.trim() !== '') {
            sql += ` AND (name LIKE '%${textSearch}%' OR address LIKE '%${textSearch}%')`;
        }

        // 如果没有查询参数，则直接返回空数组
        if (!(area || openTime || closeTime || textSearch)) {
            return res.json([]);
        }

        // 执行 SQL 查询
        const [rows, fields] = await mydb.execute(sql);

        // 返回查询结果
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// http://localhost:3005/api/service/support，此頁功能是送出一筆資料給後端，後端發送email給user
router.post('/support', (req, res) => {
    // 在這裡處理後續邏輯
});

export default router;
