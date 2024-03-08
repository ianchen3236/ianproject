import { BsChevronRight } from 'react-icons/bs';
import { BsSearch } from "react-icons/bs";

export default function FilterBar() {
  return(
    <>
      <div className="filter m-2 d-flex flex-column flex-md-row align-items-center mb-4">
        <div className="filter-class d-flex align-items-center me-4 text-h3">
          <button className="btn p-0 text-h3 text-primary">文字</button>
          <p className="mb-1 fs-5 text-h3 text-primary">&nbsp;|&nbsp;</p>
          <button className="btn p-0 text-h3 text-primary">繪畫</button>
        </div>
        <div className="filter-state d-flex align-items-center me-4" >
          <button className="btn p-0 text-h3 text-primary">最熱門</button>
          <p className="mb-1 fs-5 text-h3 text-primary">&nbsp;|&nbsp;</p>
          <button className="btn p-0 text-h3 text-primary">依人數</button>
          <p className="mb-1 fs-5 text-h3 text-primary">&nbsp;|&nbsp;</p>
          <button className="btn p-0 text-h3 text-primary">依時間</button>
        </div>
        <div className="search d-flex align-items-center">
          <BsSearch className='text-h3 me-2'/>
          <input type="text " />
        </div>
      </div>
    </>
  )
}