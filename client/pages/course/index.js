import React, { useRef, useState, useEffect } from 'react'
import CourseCarousel from '@/components/course/course-carousel.js'
import CardGroup from '@/components/course/card-group.js'
import CardGroupTitle from '@/components/course/card-group-title.js'

export default function CoursePage() {
  const titleData = [
    {
      title: '我的課程',
      subTitle: '新的一天持續學習',
    },
    {
      title: '最新課程',
      subTitle: '學習最新的知識',
    },
    {
      title: '熱門課程',
      subTitle: '與大家一同學習',
    },
    {
      title: '手寫字課程',
      subTitle: '提升你的書寫能力',
    },
    {
      title: '繪畫課程',
      subTitle: '發揮你的創意',
    },
  ]
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/course')
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <div>課程首頁</div>
      <div className="mb-5">
        <CourseCarousel />
      </div>

      {/* {titleData.map((item, idx) => (
        <div className="mb-5" key={idx}>
          <CardGroupTitle {...item} />
          <CardGroup data={data} />
        </div>
      ))} */}

      {data && data.length >= 4 && (
        <>
          <div className="mb-5">
            <CardGroupTitle {...titleData[1]} />
            <CardGroup data={data[0]} />
          </div>
          <div className="mb-5">
            <CardGroupTitle {...titleData[2]} />
            <CardGroup data={data[1]} />
          </div>
          <div className="mb-5">
            <CardGroupTitle {...titleData[3]} />
            <CardGroup data={data[2]} />
          </div>
          <div className="mb-5">
            <CardGroupTitle {...titleData[4]} />
            <CardGroup data={data[3]} />
          </div>
        </>
      )}
    </>
  )
}
