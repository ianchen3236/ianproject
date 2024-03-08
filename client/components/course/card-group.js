import { useState } from 'react'
import CourseCard from '@/components/course/course-card.js'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function CardGroup({ data }) {
  // const image = props.image;
  // const title = props.title;
  // const teacher = props.teacher;
  // const description = props.description;
  // const rankStarNum = props.rankStarNum;
  // const totalTime = props.totalTime;
  // const totalPeople = props.totalPeople;
  // const price = props.price;
  // const data = [
  //   {
  //     "image": "https://images.pexels.com/photos/3392093/pexels-photo-3392093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     "title": "筆墨悠揚：掌握書法之道",
  //     "teacher": "小名",
  //     "description": "專為初學者設計的鋼筆書法課，輕鬆學習優雅書寫技巧。",
  //     "rankStarNum": 5,
  //     "totalHour": 2,
  //     "totalMinute": 30,
  //     "totalPeople": 100,
  //     "price": 2000,
  //   },
  //   {
  //     "image": "https://images.pexels.com/photos/1201125/pexels-photo-1201125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     "title": "鋼筆新手入門：寫出優雅字跡",
  //     "teacher": "小華",
  //     "description": "由淺入深，教授基礎到進階的鋼筆書法，打造個人風格。。",
  //     "rankStarNum": 4,
  //     "totalHour": 3,
  //     "totalMinute": 20,
  //     "totalPeople": 20,
  //     "price": 500,
  //   },
  //   {
  //     "image": "https://images.pexels.com/photos/1068880/pexels-photo-1068880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     "title": "書法之美：鋼筆字的藝術",
  //     "teacher": "小名",
  //     "description": "激發學生創造力，結合藝術元素寫出獨特字風。",
  //     "rankStarNum": 3,
  //     "totalHour": 5,
  //     "totalMinute": 50,
  //     "totalPeople": 160,
  //     "price": 2800,
  //   }
  // ]
  // console.log(data);

  return (
    <>
      <div className="">
        <Row xs={1} md={3} className="g-4">
          {data.map((item, idx) => (
            <Col key={idx}>
              <CourseCard {...item} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}
