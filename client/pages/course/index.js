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
      title: '興趣課程',
      subTitle: '推薦您可能喜歡',
    },
    {
      title: '熱門課程',
      subTitle: '跟許多人一起學習',
    },
  ]
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:3005/api/course/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error))
  }, [])
  // console.log(data)

  return (
    <>
      <div>課程首頁</div>
      <div className="mb-5">
        <CourseCarousel />
      </div>

      {titleData.map((item, idx) => (
        <div className="mb-5" key={idx}>
          <CardGroupTitle {...item} />
          <CardGroup data={data} />
        </div>
      ))}
    </>
  )
}
