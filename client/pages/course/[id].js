import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import New from '@/components/course/new'
import Section from '@/components/course/section'
import Accordion from 'react-bootstrap/Accordion'

import { useRouter } from 'next/router'
import Image from 'next/image'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import CourseSubInfo from '@/components/course/course-sub-info'

import { useCart } from '@/hooks/user-cart'

import {
  BsBookmarkCheckFill,
  BsFillStarFill,
  BsFillCartFill,
  BsListOl,
} from 'react-icons/bs'

export default function CoursePage() {
  const { addCartItem } = useCart()
  // const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
  const router = useRouter()
  const { id } = router.query

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(true)
  const [articleOpen, setArticleOpen] = useState(false)
  const [openList, setOpenList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/course/${id}`)
        const data = await response.json()
        setData(data[0])
      } catch (error) {
        console.error('Error:', error)
        setError(error)
      }
    }
    fetchData()
  }, [id]) // 更新依賴性陣列，當 id 變化時重新執行 useEffect

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }
  const {
    name,
    price,
    description,
    image,
    teacher,
    teacher_image,
    rank,
    total_minute,
    student_num,
    teacher_introduction,
    article,
    units,
    news_title,
    news_date,
    news_content,
  } = data
  let data_send = { ...data }
  let image_name = 'course_' + (image.split('_')[1].split('.')[0] % 25) + '.jpg'
  data_send.image = 'http://localhost:3005/course/images/' + image_name
  data_send.url = 'http://localhost:3000/course/' + id

  const sub_units_num = units
    .map((v) => v.sub_units.length)
    .reduce((a, b) => a + b)

  // let min = 0
  // let sec = 0
  // units.forEach((unit) => {
  //   unit.sub_units.forEach((sub_unit) => {
  //     min += Number(sub_unit.video_len.split(':')[0])
  //     sec += Number(sub_unit.video_len.split(':')[1])
  //   })
  // })

  // const total_video_minute = min + Math.floor(sec / 60)
  console.log(data[0])

  return (
    <>
      <div className="container">
        {/* 課程介紹影片跟簡介 start */}
        <div className="course_detail d-lg-flex">
          {/* 課程介紹影片 */}
          {/* <video src="https://www.youtube.com/watch?v=LXb3EKWsInQ" controls /> */}
          <div className="video me-lg-4 mb-4 mb-xl-0">
            <ReactPlayer
              width="100%"
              height="100%"
              controls="true"
              url="http://localhost:3005/course/video/01.mp4"
            />
          </div>
          {/* 課程介紹 */}
          <div className="course_info justify-content-between d-flex flex-column ">
            <div>
              <div className="teacher d-flex align-items-center">
                {/* 老師頭像 */}
                <div className="teacher_img">
                  <Image
                    src={'http://localhost:3005/course/images/' + 'default.jpg'}
                    width={30}
                    height={30}
                    style={{ borderRadius: '50%' }}
                    alt="teacher image"
                  />
                </div>
                {/* 老師名字 */}
                <div className="teacher_info">
                  <p className="text-h5 mb-0">{`${teacher}`}</p>
                </div>
              </div>
              {/* 課程介紹 */}
              <div className="course_intro">
                <p className="text-h2">{name}</p>
                <p className="text-h5">{description}</p>
              </div>
            </div>
            {/* 星、按鈕 */}
            <div className="d-flex justify-content-between">
              <div className="rank d-flex align-items-center">
                <p className="mb-0 me-1">{rank}</p>
                {Array.from({ length: rank }).map((_, index) => {
                  return <BsFillStarFill key={index} className="me-1" />
                })}
                {/* <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill /> */}
              </div>
              <div className="btn-group">
                <a className=" text-decoration-none border1">
                  <BsBookmarkCheckFill className="mb-1 me-2" />
                  收藏課程
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* 課程介紹影片跟簡介 end */}
        {/*  */}

        <div className="row mt-5">
          <main className="col-md-9">
            {/* info */}
            <div className="mb-5">
              <p className="text-h2">關於課程{/*ㄣ*/}</p>
              <div className="course-sub-info">
                {/* <Container>
                  <Row className='mb-2'>
                    <Col>
                      <div className="course-sub-info-item d-flex align-items-center">
                        <BsClockFill
                          className="me-1 text-primary"
                          style={{ width: '40px', fontSize: '50px' }}
                        />
                        <div className="info">
                          <div className="label">課程時長</div>
                          <div className="value">{total_minute}分鐘</div>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="course-sub-info-item d-flex align-items-center">
                        <BsFillPlayCircleFill
                          className="me-1 text-primary"
                          style={{ width: '40px', fontSize: '50px' }}
                        />
                        <div className="info">
                          <div className="label">單元數</div>
                          <div className="value">{`${units.length}章${sub_units_num}單元`}</div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="course-sub-info-item d-flex align-items-center">
                        <BsFillPeopleFill
                          className="me-1 text-primary"
                          style={{ width: '40px', fontSize: '50px' }}
                        />
                        <div className="info">
                          <div className="label">課程總人數</div>
                          <div className="value">{student_num}位同學</div>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="course-sub-info-item d-flex align-items-center">
                        <BsFillEyeFill
                          className="me-1 text-primary"
                          style={{ width: '40px', fontSize: '50px' }}
                        />
                        <div className="info">
                          <div className="label">觀看次數</div>
                          <div className="value">不限觀看次數</div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container> */}
                <CourseSubInfo
                  total_minute={total_minute}
                  units_length={units.length}
                  sub_units_num={sub_units_num}
                  student_num={student_num}
                />
              </div>
            </div>
            {/* info end */}

            {/* news */}
            <div className="news mb-5">
              <div className="d-flex justify-content-between mb-3">
                <div className="text-h2">最新消息</div>
                {/* <div className="text_fold">收起消息</div> */}
              </div>
              <div className>
                <New
                  date={news_date.split('T')[0]}
                  title={news_title}
                  message={news_content}
                />
              </div>
            </div>
            {/* news end */}

            {/* course content */}
            <div className="course_content mb-5">
              <div className="d-flex justify-content-between mb-4">
                <div className="text-h2">課程內容</div>
              </div>
              <div
                className={`${
                  articleOpen
                    ? 'course_content_item_open'
                    : 'course_content_item_close'
                }`}
                dangerouslySetInnerHTML={{ __html: article }}
              ></div>
              <div
                className="text_fold d-flex justify-content-center"
                onClick={() => setArticleOpen(!articleOpen)}
                onKeyDown={() => setArticleOpen(!articleOpen)}
                role="button"
                tabIndex={0}
              >
                {articleOpen ? (
                  <BsArrowUp className="text-h2" />
                ) : (
                  <BsArrowDown className="text-h2" />
                )}
              </div>
            </div>
            {/* course content end*/}

            {/* unit overview */}
            <div className="unit-overview mb-5">
              <div className="d-flex justify-content-between mb-3">
                <div className="d-flex">
                  <div className="text-h2">單元一覽</div>
                  <div className="text-h5 mx-3 text-my-primary d-none d-md-block">
                    {`共 ${sub_units_num} 單元 | 總時長${total_minute}分鐘`}
                  </div>
                </div>
                <div
                  className="text_fold"
                  onClick={() => {
                    setIsOpen(!isOpen)
                    if (isOpen) {
                      const itemList = units.map((v, index) => {
                        return String(index)
                      })
                      setOpenList(itemList)
                    } else {
                      setOpenList([])
                    }
                    // console.log(openList)
                  }}
                  onKeyDown={() => setIsOpen(!isOpen)}
                  role="button"
                  tabIndex={0}
                >
                  {isOpen ? '展開內容' : '收起內容'}
                </div>
              </div>
              <Accordion
                activeKey={openList.map((v) => v)}
                defaultActiveKey={openList.map((v) => v)}
              >
                {units.map((v, index) => {
                  return (
                    <Accordion.Item key={index} eventKey={index.toString()}>
                      <Accordion.Header
                        onClick={() => {
                          if (openList.includes(index.toString())) {
                            setOpenList(
                              openList.filter((v) => v !== index.toString())
                            )
                          } else {
                            setOpenList([...openList, index.toString()])
                          }
                        }}
                      >
                        <BsListOl className="me-1" />
                        {v.title}
                      </Accordion.Header>
                      <Accordion.Body>
                        {v.sub_units.map((v, index) => {
                          return (
                            <Section
                              key={index}
                              secNum={index + 1}
                              secTitle={`${v.title}`}
                              secTime={`${v.video_len}`}
                            />
                          )
                        })}
                      </Accordion.Body>
                    </Accordion.Item>
                  )
                })}
              </Accordion>
            </div>
            {/* unit overview end*/}

            {/* teacher */}
            <div className="teacher-info">
              <div className="d-flex justify-content-between mb-4">
                <div className="text-h2">關於講師</div>
              </div>
              <div className="teacher-info-item mb-5">
                <div className="teacher-info-item-title">
                  <div className="d-flex">
                    <div className="teacher-info-item-title-img">
                      <Image
                        src={
                          'http://localhost:3005/course/images/' + 'default.jpg'
                        }
                        width={50}
                        height={50}
                        style={{ borderRadius: '50%' }}
                        alt="teacher image"
                      />
                    </div>
                    <div className="teacher-info-item-title-info d-flex align-items-center">
                      <p className="text-h3 mb-0 mx-3">{teacher}</p>
                    </div>
                  </div>
                </div>
                <div className="teacher-info-item-content">
                  <p className="text-p">{teacher_introduction}</p>
                </div>
              </div>
            </div>
            {/* teacher end */}
          </main>
          <aside className="col-md-3 mb-5 ">
            <div className="price border1">
              <p className="text-h4">購買課程</p>
              <p className="text-h3 text-my-notice">
                NT${price.toLocaleString()}
              </p>
              <div className="d-flex flex-column flex-xl-row">
                <div
                  className="text-decoration-none collect-btn border1 px-2 text-center"
                  onClick={() => {
                    addCartItem(data_send)
                  }}
                >
                  <BsFillCartFill className="mb-1" /> 加入購物車
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <style jsx>{`
        h1 {
          color: #7c7477;
        }
        .course_info {
          width: 100%;
          padding: 0;
        }
        video {
          width: 100%;
          margin-right: 20px;
        }
        @media (min-width: 992px) {
          .course_info {
            width: 45%;
          }
          .video {
            width: 55%;
          }
        }
        .teacher {
          margin-bottom: 20px;

          .teacher_img {
            margin-right: 10px;

            & img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
        }
        .course_intro {
          margin-top: 10px;
        }

        .btn-group {
          & a {
            border: 0.5px solid $primary;
            padding: 0px 5px;

            cursor: pointer;

            & i {
              margin-right: 5px;
              color: $primary;
            }
          }
        }

        .price {
          padding: 20px 10px;
          border: 1px solid $primary;
          position: sticky;
          top: 120px;
        }

        .buy-btn {
          padding: 5px 20px;
          color: $my-white;
          background-color: $primary;
          border-radius: 20px;
        }

        .collect-btn {
          border: 0.2px solid $primary;
          padding: 5px 10px;
          border-radius: 20px;
        }

        .course-sub-info {
          display: flex;
          @media (max-width: 992px) {
            flex-wrap: wrap;
          }
          .course-sub-info-item {
            display: flex;
            align-items: flex-start;

            & i {
              font-size: 40px;
              margin-top: 10px;
              margin-right: 5px;
              color: $primary;
            }
          }
        }
        .course_content {
          .course_content_item_close {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 8; /* 顯示行數 */
            overflow: hidden;
          }
          .course_content_item_open {
            display: block;
          }
        }

        .news {
          .date {
            margin-right: 10px;
          }

          .date,
          .text_label {
            font-weight: bold;
            font-size: 18px;
          }

          .message {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        .text_fold {
          color: $primary;
        }

        .teacher-info {
          & img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .border1 {
          border: 1px solid #7c7477;
        }
      `}</style>
    </>
  )
}
