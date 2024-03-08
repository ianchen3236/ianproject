import React from 'react'
import FluidLayout from '@/components/layout/fluid-layout'
import Image from 'next/image'
import Link from 'next/link'
import styles from './index.module.scss'

import ConceptSection from '@/components/home/conceptSection'
import Carosuel2 from '@/components/common/carosuel2'

import Section4 from '@/components/home/section4'
import Section5 from '@/components/home/section5'

export default function Home() {
  return (
    <>
      <div className="row">
        {/* carosuel */}
        <div className={` col-lg-12 ${styles['carosuel']}`}>
          <Carosuel2 />
        </div>
      </div>
      {/* hero-section */}
      <div className={`row ${styles['hero-section']}`}>
        <div className="bg-primary col-lg-12">
          <div className="row">
            {/* hero-img */}
            <div className={`col-lg-6 bg-black ${styles['image-container']}`}>
              <Image
                src="/images/common/hero.png"
                layout="fill"
                objectFit="cover"
                alt="hero image"
              />
              <Link href={'/product/list'}>
                <div className={`my-button3 ${styles['hero-button']}`}>
                  探索商品
                </div>
              </Link>
            </div>
            {/* hero-content */}

            <div className={`col-lg-6 bg-my-white d-flex`}>
              <div
                className={`m-auto ${styles['hero-text-body']} ${styles['hero-content']}`}
              >
                <div className={`${styles['text-top']}`}>
                  <h3 className="title text-h3 text-my-black">
                    書寫，非筆墨所致，而心靈所至 —— 墨韻雅筆
                  </h3>
                  <p className={` text-h4 text-my-gray ${styles['slogan']}`}>
                    透過每一滴墨水，連結每一次思考的深度
                  </p>
                  <p className={`text-p text-my-gray ${styles['intro']}`}>
                    從經典傳統到現代創新，每一支鋼筆都是對卓越工藝的致敬，墨韻雅筆，為愛筆者傾心打造，為書寫者傳情達意。點擊探索，開啟您與墨韻雅筆的非凡旅程。
                  </p>
                </div>
                <div className={` ${styles['text-down']}`}>
                  <p className={` text-h4 text-my-primary ${styles['title']}`}>
                    書寫藝術，筆尖流傳
                  </p>
                  <Link href="/product/list">
                    <div className="my-button2">探索商品</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* concept */}
      <ConceptSection />
      <div className="row">
        <div className="bg-warning col-lg-12">
          <Section4 />
        </div>
        <div className="bg-warning col-lg-12">
          <Section5 />
        </div>
      </div>
    </>
  )
}

Home.getLayout = function (page) {
  return <FluidLayout>{page}</FluidLayout>
}
