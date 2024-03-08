import React, { useEffect, useState } from 'react'
import ContactDiv from '@/components/myService/contactDiv'
import Progress from '@/components/myService/progress'
import AreaFilter from '@/components/myService/areaFilter'
import TimeFilter from '@/components/myService/timeFilter'
// import TimeRangePicker from '@/components/myService/TimeRangePicker'
import Search from '@/components/myService/search'
import Map from '@/components/myService/map'
import StoreInfo from '@/components/myService/storeInfo'
import axios from 'axios'
import testmapData from '@/data/store1.json' //地圖測試用資料
import teststoreData from '@/data/store2.json' //店家列表測試用資料

export default function RepairAndServicePage() {
  //首次渲染顯示所有店
  const [loading, setLoading] = useState(false) //監聽到請求時，執行加載動畫
  const [north, setNorth] = useState(true) //北
  const [middle, setMiddle] = useState(true) //中
  const [south, setSouth] = useState(true) //南
  const [openTime, setOpenTime] = useState('') //開店時間
  const [closeTime, setCloseTime] = useState('') //閉店時間
  const [textSearch, setTextSearch] = useState('') //關鍵字輸入
  const [geojsonData, setGeojsonData] = useState(null) //用於地圖區的資料
  const [storeData, setStoreData] = useState(null) //用於訊息區的資料

  //頁面上方用於展開的動畫，只在初次渲染時執行一次
  useEffect(() => {
    import('@/utils/serviceTool/serviceIndex.js')
  }, [])

  //依據操作向後端請求資料，先根據每次操作的當下組合請求參數(區域變化、時間變化、關鍵字輸入)，組合後再發出請求，合格的value才組合並發送
  useEffect(() => {
    const combineValue = () => {
      let url = '/api/stores?'
      if (north) {
        url += `north=true&`
      }
      if (middle) {
        url += `middle=true&`
      }
      if (south) {
        url += `south=true&`
      }
      if (openTime && closeTime) {
        url += `openTime=${openTime}&closeTime=${closeTime}&`
      }
      if (textSearch) {
        url += `textSearch=${textSearch}&`
      }
      //如果url最後一個字是"&"，則"&"會被自動清除
      url = url.replace(/&$/, '')

      fetch(url)
        .then((res) => {
          return response.json()
          
          //這個function到時要放在監聽請求，有發送請求就執行這個function
          const handleRequest = () => {
            setLoading(true) // 发出请求时设置加载状态为 true
            // 模拟请求
            setTimeout(() => {
              setLoading(false) // 模拟请求完成后，设置加载状态为 false
            }, 1000) // 假设请求耗时 3 秒
          }
        })
        .then((data) => {
          //接回來後要處理成一份json和一份geojson
          setGeojsonData(data)
          setStoreData(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }, [north, middle, south, openTime, closeTime, textSearch]) //有value改變時，就發請求

  return (
    <>
      <h1 className="text-center mb-3 text-h1">服務據點</h1>
      <section className="row contactDiv hiddenContent">
        <div className="col-12 px-0">
          <ContactDiv />
        </div>
      </section>
      <div className="row">
        {/* 下方btn為測試用
        <button onClick={handleRequest}>发出请求</button> */}

        <Progress loading={loading} setLoading={setLoading} />
      </div>
      <div className="filter my-3 row align-items-center  justify-content-evenly justify-content-lg-center  mx-0">
        <div className="col-md-3 col-8 text-center  my-2 d-flex justify-content-md-evenly justify-content-center">
          <AreaFilter
            north={north}
            setNorth={setNorth}
            middle={middle}
            setMiddle={setMiddle}
            south={south}
            setSouth={setSouth}
          />
        </div>
        <div className="col-md-3 col-8 text-center p-0 my-2 d-flex justify-content-md-evenly justify-content-center">
          <TimeFilter
            openTime={openTime}
            setOpenTime={setOpenTime}
            closeTime={closeTime}
            setCloseTime={setCloseTime}
          />
          {/* <TimeRangePicker /> 這元件有多餘的時間再搞(來自antd) */}
        </div>
        <div className="col-md-3 col-8 text-center my-2 search-width">
          <Search textSearch={textSearch} setTextSearch={setTextSearch} />
        </div>
      </div>
      <div className="info d-flex row mx-5 mb-5">
        <div className="left col-md-6 px-0 text-center">
          <Map geojsonData={testmapData} setGeojsonData={setGeojsonData} />
        </div>
        <div className="right col-md-6 px-0">
          <StoreInfo storeData={teststoreData} setStoreData={setStoreData} />
        </div>
      </div>

      {/* 把定位樣式放在page可以嗎? */}
      <style jsx>{`
        .contactDiv {
          position: relative;
        }
        @media screen and (max-width: 391px) {
          .contactDiv {
            display: none;
          }
        }
        .hiddenContent {
          height: 0;
          overflow: hidden;
          transition: height 0.8s ease; /* 添加过渡效果 */
        }
        .search-width {
          min-width: 300px;
        }
        .right {
          border-left: 2px solid black;
        }
        @media screen and (max-width: 391px) {
          .right {
            margin-top: 20px;
            border-left: none;
            border-top: 1px solid black;
          }
        }
      `}</style>
    </>
  )
}
