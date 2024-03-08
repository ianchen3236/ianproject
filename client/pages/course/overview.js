import React, { useEffect, useState } from 'react'
import CardGroup from '@/components/course/card-group.js'
import FilterBar from '@/components/course/filter-bar'

export default function CoursePage() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:3005/api/myproduct/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error))
  }, [])
  return (
    <>
      <FilterBar />
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="mb-5" key={i}>
          <CardGroup data={data} />
        </div>
      ))}
    </>
  )
}
