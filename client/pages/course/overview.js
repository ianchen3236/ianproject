import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import CardGroup from '@/components/course/card-group.js'
import FilterBar from '@/components/course/filter-bar'

export default function CoursePage() {
  const router = useRouter()

  const [filterProps, setFilterProps] = useState({
    filterType: '',
    filterState: '',
    filterSearch: '',
  })
  const [data, setData] = useState([])

  // console.log('當前的查詢參數', router.query) // 當前的查詢參數
  let fetchUrl = 'http://localhost:3005/api/course/overview?'
  if (filterProps.filterType === '文字') {
    fetchUrl += '&type=1'
  } else if (filterProps.filterType === '繪畫') {
    fetchUrl += '&type=2'
  }
  if (filterProps.filterState === '最熱門') {
    fetchUrl += '&state=1'
  } else if (filterProps.filterState === '依價格') {
    fetchUrl += '&state=2'
  } else if (filterProps.filterState === '依時間') {
    fetchUrl += '&state=3'
  }
  if (filterProps.filterSearch) {
    fetchUrl += '&search=' + filterProps.filterSearch
  }
  // console.log('filterType:', filterProps.filterType)
  // console.log('filterState:', filterProps.filterState)
  // console.log('filterSearch:', filterProps.filterSearch)
  // console.log('filterProps', filterProps)
  // console.log('fetchUrl:', fetchUrl)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl)
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [fetchUrl])
  return (
    <>
      <FilterBar
        filterProps={filterProps}
        setFilterProps={setFilterProps}
        router={router}
      />
      {data.length > 0 ? (
        <CardGroup data={data} />
      ) : (
        <div className="text-h2">{`關鍵字: ${filterProps.filterSearch} 找不到相關課程或老師`}</div>
      )}
    </>
  )
}
