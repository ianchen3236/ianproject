import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import Accordion from 'react-bootstrap/Accordion'
import Section from '@/components/course/section'
import New from '@/components/course/new'
import {
  BsListOl,
  BsClockFill,
  BsFillPlayCircleFill,
  BsFillPeopleFill,
  BsFillEyeFill,
  BsArrowDown,
  BsArrowUp,
} from 'react-icons/bs'
import dynamic from 'next/dynamic'

export default function LearnPage() {
  const ReactPlayer = dynamic(
    () => import('react-player'),
    { ssr: false } // 這將確保只在客戶端渲染
  )

  const id = 214
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [articleOpen, setArticleOpen] = useState(false)
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
    teacher_name,
    teacher_image,
    rank,
    total_minute,
    student_num,
    teacher_introduction,
    article,
    units,
  } = data

  return (
    <>
      <div className="container">
        <h1 className="text-h1 d-flex justify-content-center my-5">{name}</h1>
        <div className="row ">
          {/* 播放器 */}
          <div className="video col-xl-7 col-12 mb-5 mb-xl-0">
            <ReactPlayer width="100%" controls="true" url="video/01.mp4" />
          </div>
          {/* 章節選擇 */}
          <div className="scrollable col-xl-5 col-12 mb-5 mb-xl-0">
            <Accordion defaultActiveKey={[]} alwaysOpen>
              {units.map((v, index) => {
                return (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>
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
        </div>
        <div>
          {/* info */}
          <div className="mb-5">
            <p className="text-h2">關於課程{/*ㄣ*/}</p>
            <div className="course-sub-info">
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
              <div className="course-sub-info-item d-flex align-items-center">
                <BsFillPlayCircleFill
                  className="me-1 text-primary"
                  style={{ width: '40px', fontSize: '50px' }}
                />
                <div className="info">
                  <div className="label">單元數</div>
                  <div className="value">2章18單元</div>
                </div>
              </div>
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
            </div>
          </div>
          {/* info end */}

          {/* news */}
          <div className="news mb-5">
            <div className="d-flex justify-content-between mb-3">
              <div className="text-h2">最新消息</div>
              <div className="text_fold">收起消息</div>
            </div>
            <div className>
              <New
                date="2024-01-01"
                title="訊息標題"
                message="訊息內容，為迎接即將於下週四 1 月 25
                      日起一連四天在南港展覽館 1 館盛大登場的「2024
                      台北國際電玩展」，主辦單位 TCA
                      台北市電腦公會於今日（1/15）特別舉辦展前記者會，聯合傑仕登、Wemade、台灣大哥大、集英社遊戲、光榮特庫摩、madhead、萬代南夢宮娛樂、任天堂等八家主要參展廠商代表聯袂發表展出資訊。"
              />
              <New
                date="2024-01-01"
                title="訊息標題"
                message="訊息內容，為迎接即將於下週四 1 月 25
                      日起一連四天在南港展覽館 1 館盛大登場的「2024
                      台北國際電玩展」，主辦單位 TCA
                      台北市電腦公會於今日（1/15）特別舉辦展前記者會，聯合傑仕登、Wemade、台灣大哥大、集英社遊戲、光榮特庫摩、madhead、萬代南夢宮娛樂、任天堂等八家主要參展廠商代表聯袂發表展出資訊。"
              />
              <New
                date="2024-01-01"
                title="訊息標題"
                message="訊息內容，為迎接即將於下週四 1 月 25
                      日起一連四天在南港展覽館 1 館盛大登場的「2024
                      台北國際電玩展」，主辦單位 TCA
                      台北市電腦公會於今日（1/15）特別舉辦展前記者會，聯合傑仕登、Wemade、台灣大哥大、集英社遊戲、光榮特庫摩、madhead、萬代南夢宮娛樂、任天堂等八家主要參展廠商代表聯袂發表展出資訊。"
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

          {/* teacher */}
          <div className="teacher-info">
            <div className="d-flex justify-content-between mb-4">
              <div className="text-h2">關於講師</div>
            </div>
            <div className="teacher-info-item">
              <div className="teacher-info-item-title">
                <div className="d-flex">
                  <div className="teacher-info-item-title-img">
                    <img
                      src="https://images.pexels.com/photos/36843/lion-panthera-leo-lioness-animal-world.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="teacher"
                    />
                  </div>
                  <div className="teacher-info-item-title-info d-flex align-items-center">
                    <p className="text-h3 mb-0 mx-3">陳曉明</p>
                  </div>
                </div>
              </div>
              <div className="teacher-info-item-content">
                <p className="text-p">
                  陳曉明，台灣書法家，畢業於國立台北藝術大學美術學系，曾任教於國立台北藝術大學美術學系，現為台北市立美術館館長。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollable {
          max-height: 350px;
          overflow: auto;
        }
        .teacher-info {
          & img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .course-sub-info {
          display: flex;
          @media (max-width: 992px) {
            flex-wrap: wrap;
          }
          .course-sub-info-item {
            display: flex;
            align-items: flex-start;
            margin-right: 30px;

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
      `}</style>
    </>
  )
}
