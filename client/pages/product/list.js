import React, { useState, useEffect } from 'react'
import ProductFigure from '@/components/myProduct/productfigure'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import Pagination from '@/components/myProduct/pagination'
import ScrollToTopButton from '@/components/myProduct/upbutton'
import Link from 'next/link'
import SearchForm from '@/components/myProduct/search-form'
import { FaSliders } from 'react-icons/fa6'
export default function List() {
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [product, setProduct] = useState([])
  const [nib, setNib] = useState([])
  const [color, setColor] = useState([])
  const [brand, setBrand] = useState([])
  const [material, setMaterial] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSubmit = () => {
    // 處理提交邏輯
    setOpen(false) // 提交後關閉模態
  }

  const initialPriceRange = [1, 50000]
  const [priceRange, setPriceRange] = useState(initialPriceRange) // 默認價格區間
  const formatPrice = (price) => {
    const numericPrice = parseFloat(price)
    return numericPrice.toLocaleString()
  }
  const handlePriceChange = (value) => {
    setPriceRange(value)
  }
  const [sortingOption, setSortingOption] = useState('newest')
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [selectedNibs, setSelectedNibs] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  const [isPressed] = useState(false)
  const handleBrandClick = (brandName) => {
    setSelectedBrand(brandName)
  }
  const clearAllSelections = () => {
    setSelectedColors([])
    setSelectedMaterials([])
    setSelectedNibs([])
    setPriceRange(initialPriceRange)
  }
  const toggleColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    } else {
      setSelectedColors([...selectedColors, color])
    }
  }

  const getColorButtonClass = (color) => {
    return `btn btn-circle ${
      selectedColors.includes(color) ? 'selected' : ''
    } ${isPressed ? 'pressed' : ''}`
  }

  const toggleMaterialSelection = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material))
    } else {
      setSelectedMaterials([...selectedMaterials, material])
    }
  }

  const getMaterialCheckboxClass = (material) => {
    return ` ${selectedMaterials.includes(material) ? 'selected' : ''} ${
      isPressed ? 'pressed' : ''
    }`
  }

  const toggleNibSelection = (nib) => {
    if (selectedNibs.includes(nib)) {
      setSelectedNibs(selectedNibs.filter((n) => n !== nib))
    } else {
      setSelectedNibs([...selectedNibs, nib])
    }
  }

  const getNibCheckboxClass = (nib) => {
    return ` ${selectedNibs.includes(nib) ? 'selected' : ''} ${
      isPressed ? 'pressed' : ''
    }`
  }

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12
  const [totalPages, setTotalPages] = useState(0) // 總頁數
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = Math.min(startIndex + productsPerPage, product.length)

  // 處理頁碼變化的函數
  const handlePageChange = (page) => {
    // 這裡可以根據頁碼做一些處理，例如獲取新的產品列表等
    setCurrentPage(page)
  }
  const filteredProducts = product.filter((product) => {
    // 如果没有选择条件，返回 true
    if (
      selectedColors.length === 0 &&
      selectedNibs.length === 0 &&
      selectedMaterials.length === 0 &&
      priceRange[0] === initialPriceRange[0] &&
      priceRange[1] === initialPriceRange[1] &&
      selectedBrand === '' &&
      searchQuery === ''
    ) {
      return true
    }

    // 检查产品的颜色是否在选择的颜色中
    const isColorMatched =
      selectedColors.length === 0 || selectedColors.includes(product.color_name)

    // 检查产品的笔尖是否在选择的笔尖中
    const isNibMatched =
      selectedNibs.length === 0 || selectedNibs.includes(product.nib_name)

    // 检查产品的材质是否在选择的材质中
    const isMaterialMatched =
      selectedMaterials.length === 0 ||
      selectedMaterials.includes(product.material_name)

    // 检查产品的价格是否在选择的价格范围内
    const isPriceMatched =
      product.price >= priceRange[0] && product.price <= priceRange[1]

    // 检查产品的品牌是否与选择的品牌匹配
    const isBrandMatched =
      selectedBrand === '' || selectedBrand === product.brand_name

    const isNameMatched =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase())

    // 返回是否满足所有选择条件
    return (
      isColorMatched &&
      isNibMatched &&
      isMaterialMatched &&
      isPriceMatched &&
      isBrandMatched &&
      isNameMatched
    )
  })

  const displayedProducts = filteredProducts.slice(startIndex, endIndex)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 991)
    }

    // 初始加載時觸發一次檢測
    checkIsMobile()

    // 監聽窗口大小變化
    window.addEventListener('resize', checkIsMobile)

    // 在清理函數中移除事件監聽器
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [setIsMobile])

  useEffect(() => {
    const fetchData = async () => {
      // 构建 fetchUrl
      let updatedFetchUrl = 'http://localhost:3005/api/myProduct?'
      const newUrl = new URL(window.location.href)

      // 根据排序选项添加对应的排序方式到 fetchUrl
      if (sortingOption !== '') {
        updatedFetchUrl += `sortingOption=${sortingOption}&`
        newUrl.searchParams.set('sortingOption', sortingOption)
      } else {
        newUrl.searchParams.delete('sortingOption')
      }

      // 加入其他筛选条件到 fetchUrl
      if (selectedColors.length > 0) {
        updatedFetchUrl += `colors=${selectedColors.join(',')}&`
        newUrl.searchParams.set('colors', selectedColors.join(','))
      } else {
        newUrl.searchParams.delete('colors')
      }
      if (selectedBrand.length > 0) {
        updatedFetchUrl += `brands=${selectedBrand}&`
        newUrl.searchParams.set('brands', selectedBrand)
      } else {
        newUrl.searchParams.delete('brands')
      }
      if (selectedNibs.length > 0) {
        updatedFetchUrl += `nibs=${selectedNibs.join(',')}&`
        newUrl.searchParams.set('nibs', selectedNibs.join(','))
      } else {
        newUrl.searchParams.delete('nibs')
      }
      if (selectedMaterials.length > 0) {
        updatedFetchUrl += `materials=${selectedMaterials.join(',')}&`
        newUrl.searchParams.set('materials', selectedMaterials.join(','))
      } else {
        newUrl.searchParams.delete('materials')
      }
      if (searchQuery.length > 0) {
        updatedFetchUrl += `searchQuery=${searchQuery}&`
        newUrl.searchParams.set('searchQuery', searchQuery)
      } else {
        newUrl.searchParams.delete('searchQuery')
      }

      // 移除最后的 '&' 符号
      updatedFetchUrl = updatedFetchUrl.slice(0, -1)

      try {
        const response = await fetch(updatedFetchUrl)
        const data = await response.json()

        // 更新状态
        setProduct(data.products)
        setNib(data.nibs)
        setColor(data.colors)
        setBrand(data.brands)
        setMaterial(data.materials)
        setTotalPages(data.totalPages)
        setCurrentPage(1)
        window.history.pushState({}, '', newUrl.toString())
        console.log(totalPages)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [
    sortingOption,
    selectedColors,
    selectedBrand,
    selectedNibs,
    selectedMaterials,
    searchQuery,
  ])

  return (
    <>
      <div className="row mt-2 mb-3">
        <div className="col">
          <div className="d-flex align-items-center">
            <span className="ps-3 text-h1 my-3 ">
              {selectedBrand ? selectedBrand : '所有鋼筆'}
            </span>
          </div>
          <div className="card-text d-flex justify-content-between align-items-center ms-3">
            <nav
              className="text-h4"
              aria-label="breadcrumb"
              style={{ marginLeft: '230px' }}
            ></nav>
            {!isMobile && (
              <div className="d-flex p-2 justify-content-start align-items-center">
                <div>
                  <SearchForm onSearch={handleSearch}></SearchForm>
                </div>
                <div className="dropdown ms-3">
                  <button
                    className="btn dropdown-toggle my-text-contents-CH rounded-pill shadow"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span style={{ marginRight: '40px' }}>排序依據</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className={`dropdown-item ${
                          sortingOption === 'newest' ? 'active' : ''
                        }`}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setSortingOption('newest')
                        }}
                      >
                        最新上架
                      </a>
                    </li>
                    <li>
                      <a
                        className={`dropdown-item ${
                          sortingOption === 'high-to-low' ? 'active' : ''
                        }`}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setSortingOption('high-to-low')
                        }}
                      >
                        價格：由高至低
                      </a>
                    </li>
                    <li>
                      <a
                        className={`dropdown-item ${
                          sortingOption === 'low-to-high' ? 'active' : ''
                        }`}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setSortingOption('low-to-high')
                        }}
                      >
                        價格：由低至高
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {isMobile && (
              <div className="d-flex p-2 justify-content-end align-items-center">
                <button
                  className="btn my-text-contents-CH rounded-pill shadow"
                  onClick={handleOpen}
                >
                  <span>
                    篩選
                    <FaSliders />
                  </span>
                </button>

                <Dialog
                  open={open}
                  onClose={handleClose}
                  fullScreen
                  TransitionComponent={Slide}
                  TransitionProps={{
                    direction: 'up',
                  }}
                >
                  <DialogContent>
                    <div className="d-flex justify-content-between mt-3">
                      <Typography
                        variant="h6"
                        style={{
                          fontFamily: 'Noto Serif TC',
                          fontWeight: 'bold',
                        }}
                      >
                        篩選
                      </Typography>

                      <button
                        className="btn btn-secondary rounded-pill"
                        onClick={handleClose}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="py-4">
                      <span className="text-h3">排序依據</span>
                      <div className="accordion-body px-1 mt-4 h6">
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="material"
                            id="newest"
                            value="newest"
                            checked={sortingOption === 'newest'}
                            onChange={() => setSortingOption('newest')}
                          />
                          <label className="form-check-label" htmlFor="newest">
                            最新發布
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="material"
                            id="high-to-low"
                            value="high-to-low"
                            checked={sortingOption === 'high-to-low'}
                            onChange={() => setSortingOption('high-to-low')}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="high-to-low"
                          >
                            價格：由高到低
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="material"
                            id="low-to-high"
                            value="low-to-high"
                            checked={sortingOption === 'low-to-high'}
                            onChange={() => setSortingOption('low-to-high')}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="low-to-high"
                          >
                            價格：由低到高
                          </label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="py-4">
                      <span className="text-h3">材質</span>
                      <div className="accordion-body px-1 mt-4 h6">
                        {material.slice(0, 4).map((materialItem) => (
                          <div
                            key={materialItem.material_id}
                            className="form-check form-switch mb-2"
                          >
                            <input
                              className={`form-check-input ${getMaterialCheckboxClass(
                                materialItem.material_name
                              )}`}
                              type="checkbox"
                              value=""
                              id={`flexCheckChecked${materialItem.material_name}`}
                              onChange={() =>
                                toggleMaterialSelection(
                                  materialItem.material_name
                                )
                              }
                              checked={selectedMaterials.includes(
                                materialItem.material_name
                              )}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`flexCheckChecked${materialItem.material_name}`}
                            >
                              {materialItem.material_name}
                            </label>
                          </div>
                        ))}
                        {/* 展开更多按钮 */}
                        {!showMore && (
                          <button
                            className="btn btn-link"
                            onClick={() => setShowMore(true)}
                          >
                            + 更多
                          </button>
                        )}
                        {/* 超过四个材料的选项 */}
                        {showMore &&
                          material.slice(4).map((materialItem) => (
                            <div
                              key={materialItem.material_id}
                              className="form-check form-switch mb-2"
                            >
                              <input
                                className={`form-check-input ${getMaterialCheckboxClass(
                                  materialItem.material_name
                                )}`}
                                type="checkbox"
                                value=""
                                id={`flexCheckChecked${materialItem.material_name}`}
                                onChange={() =>
                                  toggleMaterialSelection(
                                    materialItem.material_name
                                  )
                                }
                                checked={selectedMaterials.includes(
                                  materialItem.material_name
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`flexCheckChecked${materialItem.material_name}`}
                              >
                                {materialItem.material_name}
                              </label>
                            </div>
                          ))}
                        {/* 收起更多按钮 */}
                        {showMore && (
                          <button
                            className="btn btn-link"
                            onClick={() => setShowMore(false)}
                          >
                            - 收起
                          </button>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="py-4">
                      <span className="text-h3">筆尖種類</span>
                      <div className="accordion-body px-1 mt-4 h6">
                        {nib.map((nibItem) => (
                          <div
                            className="form-check form-switch mb-2"
                            key={nibItem.nib_id}
                          >
                            <input
                              className={`form-check-input ${getNibCheckboxClass(
                                nibItem.nib_name
                              )}`}
                              type="checkbox"
                              value=""
                              id={`flexCheckCheckedNib${nibItem.nib_name}`}
                              onChange={() =>
                                toggleNibSelection(nibItem.nib_name)
                              }
                              checked={selectedNibs.includes(nibItem.nib_name)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`flexCheckCheckedNib${nibItem.nib_name}`}
                            >
                              {nibItem.nib_name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <hr />
                    <div className="py-4">
                      <span className="text-h3">顏色</span>

                      <div className="d-flex flex-row justify-content-around mb-2 mt-4">
                        {color.slice(0, 3).map((colorItem) => (
                          <div className="p-2" key={colorItem.color_id}>
                            <div className="d-flex flex-column">
                              <div>
                                <button
                                  type="button"
                                  className={`${getColorButtonClass(
                                    colorItem.color_name.toLowerCase()
                                  )} btnColor`}
                                  style={{
                                    backgroundColor: colorItem.color_bg,
                                    border: '1px solid black',
                                  }}
                                  onClick={() =>
                                    toggleColorSelection(colorItem.color_name)
                                  }
                                >
                                  {selectedColors.includes(
                                    colorItem.color_name
                                  ) && (
                                    <FontAwesomeIcon
                                      icon={faCheck}
                                      style={{ color: 'white' }}
                                    />
                                  )}
                                </button>
                              </div>
                              <div className="color-f">
                                {colorItem.color_name}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="d-flex flex-row justify-content-around mb-2">
                        {color.slice(3, 6).map((colorItem) => (
                          <div className="p-2" key={colorItem.color_id}>
                            <div className="d-flex flex-column">
                              <div>
                                <button
                                  type="button"
                                  className={`${getColorButtonClass(
                                    colorItem.color_name.toLowerCase()
                                  )} btnColor`}
                                  style={{
                                    backgroundColor: colorItem.color_bg,
                                    border: '1px solid black',
                                  }}
                                  onClick={() =>
                                    toggleColorSelection(colorItem.color_name)
                                  }
                                >
                                  {selectedColors.includes(
                                    colorItem.color_name
                                  ) && (
                                    <FontAwesomeIcon
                                      icon={faCheck}
                                      style={{ color: 'white' }}
                                    />
                                  )}
                                </button>
                              </div>
                              <div className="color-f">
                                {colorItem.color_name}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="d-flex flex-row justify-content-around mb-2">
                        {color.slice(6, 9).map((colorItem) => (
                          <div className="p-2" key={colorItem.color_id}>
                            <div className="d-flex flex-column">
                              <div>
                                <button
                                  type="button"
                                  className={`${getColorButtonClass(
                                    colorItem.color_name.toLowerCase()
                                  )} btnColor`}
                                  style={{
                                    backgroundColor: colorItem.color_bg,
                                    border: '1px solid black',
                                  }}
                                  onClick={() =>
                                    toggleColorSelection(colorItem.color_name)
                                  }
                                >
                                  {selectedColors.includes(
                                    colorItem.color_name
                                  ) && (
                                    <FontAwesomeIcon
                                      icon={faCheck}
                                      style={{ color: 'white' }}
                                    />
                                  )}
                                </button>
                              </div>
                              <div className="color-f">
                                {colorItem.color_name}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="d-flex flex-row justify-content-around mb-2">
                        {color.slice(9, 12).map((colorItem) => (
                          <div className="p-2" key={colorItem.color_id}>
                            <div className="d-flex flex-column">
                              <div>
                                <button
                                  type="button"
                                  className={`${getColorButtonClass(
                                    colorItem.color_name.toLowerCase()
                                  )} btnColor`}
                                  style={{
                                    backgroundColor: colorItem.color_bg,
                                    border: '1px solid black',
                                  }}
                                  onClick={() =>
                                    toggleColorSelection(colorItem.color_name)
                                  }
                                >
                                  {selectedColors.includes(
                                    colorItem.color_name
                                  ) && <FontAwesomeIcon icon={faCheck} />}
                                </button>
                              </div>
                              <div className="color-f">
                                {colorItem.color_name}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="py-4">
                      <div
                        className="text-h3"
                        data-bs-target="#panelsStayOpen-collapseThree"
                      >
                        價格範圍
                      </div>

                      <div id="panelsStayOpen-collapseThree">
                        <div className="mt-5">
                          <Slider
                            min={1} // 使用动态计算的最小价格
                            max={50000} // 使用动态计算的最大价格
                            step={100}
                            range
                            defaultValue={[1, 50000]} // 默认值设为动态计算的最小和最大价格
                            value={priceRange}
                            onChange={handlePriceChange}
                          />

                          <div>
                            價格: ${priceRange[0]} - ${priceRange[1]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: '20px',
                      paddingTop: '30px',
                      paddingBottom: '5px',
                      borderTop: '2px solid #ccc',
                    }}
                  >
                    <button
                      className="btn btn-secondary rounded-pill"
                      style={{ width: '48%' }}
                      onClick={clearAllSelections}
                    >
                      清除
                    </button>
                    <button
                      className="btn btn-primary rounded-pill"
                      style={{ width: '48%' }}
                      onClick={handleSubmit}
                    >
                      提交
                    </button>
                  </div>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        {/* 左邊filter */}
        <div className="col-lg-3  col-md-12">
          <div id="wrapper">
            <div
              className={`bg-white ${isMobile ? 'flex-row' : 'me-3'}`}
              id="sidebar-wrapper"
            >
              <div className={`${isMobile ? 'scroll' : ''}`}>
                <div
                  className={`cats  ${isMobile ? 'd-flex ' : ''}`}
                  style={{
                    overflowX: isMobile ? 'auto' : 'visible',
                    marginBottom: isMobile ? '50px' : '0px',
                  }}
                >
                  {brand.map((brandItem) => (
                    <div className="me-2" key={brandItem.brand_id}>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handleBrandClick(brandItem.brand_name)}
                      >
                        {brandItem.brand_name}
                      </button>
                    </div>
                  ))}
                </div>
                {!isMobile && <hr style={{ marginTop: '40px' }} />}
                {!isMobile && (
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                    style={{ marginBottom: '50px' }}
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          aria-expanded="false"
                          data-bs-target="#panelsStayOpen-collapseOne"
                          aria-controls="panelsStayOpen-collapseOne"
                        >
                          材質
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse"
                      >
                        <div className="accordion-body px-3">
                          {material.slice(0, 4).map((materialItem) => (
                            <div
                              key={materialItem.material_id}
                              className="form-check form-switch"
                            >
                              <input
                                className={`form-check-input ${getMaterialCheckboxClass(
                                  materialItem.material_name
                                )}`}
                                type="checkbox"
                                value=""
                                id={`flexCheck${materialItem.material_name}`}
                                onChange={() =>
                                  toggleMaterialSelection(
                                    materialItem.material_name
                                  )
                                }
                                checked={selectedMaterials.includes(
                                  materialItem.material_name
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`flexCheck${materialItem.material_name}`}
                              >
                                {materialItem.material_name}
                              </label>
                            </div>
                          ))}
                          {!showMore && (
                            <button
                              className="btn btn-link"
                              onClick={() => setShowMore(true)}
                            >
                              + 更多
                            </button>
                          )}
                          {showMore &&
                            material.slice(4).map((materialItem) => (
                              <div
                                key={materialItem.material_id}
                                className="form-check form-switch"
                              >
                                <input
                                  className={`form-check-input ${getMaterialCheckboxClass(
                                    materialItem.material_name
                                  )}`}
                                  type="checkbox"
                                  value=""
                                  id={`flexCheckChecked${materialItem.material_name}`}
                                  onChange={() =>
                                    toggleMaterialSelection(
                                      materialItem.material_name
                                    )
                                  }
                                  checked={selectedMaterials.includes(
                                    materialItem.material_name
                                  )}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`flexCheckChecked${materialItem.material_name}`}
                                >
                                  {materialItem.material_name}
                                </label>
                              </div>
                            ))}
                          {showMore && (
                            <button
                              className="btn btn-link"
                              onClick={() => setShowMore(false)}
                            >
                              - 收起
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          aria-expanded="false"
                          data-bs-target="#panelsStayOpen-collapseFour"
                          aria-controls="panelsStayOpen-collapseFour"
                        >
                          筆尖種類
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseFour"
                        className="accordion-collapse collapse"
                      >
                        <div className="accordion-body px-3">
                          {nib.map((nibItem) => (
                            <div
                              className="form-check form-switch mb-2"
                              key={nibItem.nib_id}
                            >
                              <input
                                className={`form-check-input ${getNibCheckboxClass(
                                  nibItem.nib_name
                                )}`}
                                type="checkbox"
                                value=""
                                id={`flexCheckNib${nibItem.nib_name}`}
                                onChange={() =>
                                  toggleNibSelection(nibItem.nib_name)
                                }
                                checked={selectedNibs.includes(
                                  nibItem.nib_name
                                )}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`flexCheckNib${nibItem.nib_name}`}
                              >
                                {nibItem.nib_name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseTwo"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseTwo"
                        >
                          顏色
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse"
                      >
                        <div className="accordion-body px-1 ">
                          <div className="d-flex flex-row justify-content-around mb-2 mt-4">
                            {color.slice(0, 3).map((colorItem) => (
                              <div className="p-2" key={colorItem.color_id}>
                                <div className="d-flex flex-column">
                                  <div>
                                    <button
                                      type="button"
                                      className={`${getColorButtonClass(
                                        colorItem.color_name.toLowerCase()
                                      )} btnColor`}
                                      style={{
                                        backgroundColor: colorItem.color_bg,
                                        border: '1px solid black',
                                      }}
                                      onClick={() =>
                                        toggleColorSelection(
                                          colorItem.color_name
                                        )
                                      }
                                    >
                                      {selectedColors.includes(
                                        colorItem.color_name
                                      ) && (
                                        <FontAwesomeIcon
                                          icon={faCheck}
                                          style={{ color: 'white' }}
                                        />
                                      )}
                                    </button>
                                  </div>
                                  <div className="color-f">
                                    {colorItem.color_name}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="d-flex flex-row justify-content-around mb-2">
                            {color.slice(3, 6).map((colorItem) => (
                              <div className="p-2" key={colorItem.color_id}>
                                <div className="d-flex flex-column">
                                  <div>
                                    <button
                                      type="button"
                                      className={`${getColorButtonClass(
                                        colorItem.color_name.toLowerCase()
                                      )} btnColor`}
                                      style={{
                                        backgroundColor: colorItem.color_bg,
                                        border: '1px solid black',
                                      }}
                                      onClick={() =>
                                        toggleColorSelection(
                                          colorItem.color_name
                                        )
                                      }
                                    >
                                      {selectedColors.includes(
                                        colorItem.color_name
                                      ) && (
                                        <FontAwesomeIcon
                                          icon={faCheck}
                                          style={{ color: 'white' }}
                                        />
                                      )}
                                    </button>
                                  </div>
                                  <div className="color-f">
                                    {colorItem.color_name}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="d-flex flex-row justify-content-around mb-2">
                            {color.slice(6, 9).map((colorItem) => (
                              <div className="p-2" key={colorItem.color_id}>
                                <div className="d-flex flex-column">
                                  <div>
                                    <button
                                      type="button"
                                      className={`${getColorButtonClass(
                                        colorItem.color_name.toLowerCase()
                                      )} btnColor`}
                                      style={{
                                        backgroundColor: colorItem.color_bg,
                                        border: '1px solid black',
                                      }}
                                      onClick={() =>
                                        toggleColorSelection(
                                          colorItem.color_name
                                        )
                                      }
                                    >
                                      {selectedColors.includes(
                                        colorItem.color_name
                                      ) && (
                                        <FontAwesomeIcon
                                          icon={faCheck}
                                          style={{ color: 'white' }}
                                        />
                                      )}
                                    </button>
                                  </div>
                                  <div className="color-f">
                                    {colorItem.color_name}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="d-flex flex-row justify-content-around mb-2">
                            {color.slice(9, 12).map((colorItem) => (
                              <div className="p-2" key={colorItem.color_id}>
                                <div className="d-flex flex-column">
                                  <div>
                                    <button
                                      type="button"
                                      className={`${getColorButtonClass(
                                        colorItem.color_name.toLowerCase()
                                      )} btnColor`}
                                      style={{
                                        backgroundColor: colorItem.color_bg,
                                        border: '1px solid black',
                                      }}
                                      onClick={() =>
                                        toggleColorSelection(
                                          colorItem.color_name
                                        )
                                      }
                                    >
                                      {selectedColors.includes(
                                        colorItem.color_name
                                      ) && <FontAwesomeIcon icon={faCheck} />}
                                    </button>
                                  </div>
                                  <div className="color-f">
                                    {colorItem.color_name}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseThree"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseThree"
                        >
                          價格範圍
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseThree"
                        className="accordion-collapse collapse"
                      >
                        <div style={{ margin: '20px' }}>
                          <Slider
                            min={1} // 使用动态计算的最小价格
                            max={50000} // 使用动态计算的最大价格
                            step={100}
                            range
                            defaultValue={[1, 50000]} // 默认值设为动态计算的最小和最大价格
                            value={priceRange}
                            onChange={handlePriceChange}
                          />

                          <div>
                            價格: ${priceRange[0]} - ${priceRange[1]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* 右邊主商品欄位 */}
        <div className="col-lg-9 col-md-12">
          <div id="page-content-wrapper">
            <div className="container">
              <div className="row row-cols-2 row-cols-lg-3 g-4 row-cols-md-2">
                {/* 循环渲染产品 */}
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product) => (
                    <div className="col" key={product.product_id}>
                      <Link
                        href={`/product/${product.product_id}`}
                        as={`/product/${product.product_id}`}
                        style={{ textDecoration: `none` }}
                      >
                        <ProductFigure
                          key={product.product_id}
                          image={`/images/myProduct/${product.image}`}
                          brand={product.brand_name}
                          name={product.name}
                          price={formatPrice(product.price)}
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className='text-h3'>沒有符合的商品 . . . </p>
                )}
              </div>

              <div style={{ marginTop: '60px' }}>
                <hr style={{ margin: '20px auto' }} />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
        <ScrollToTopButton />
      </div>
      <style jsx>{`
        .btnColor {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          transform: scale(0.7);
        }

        .btnColor:hover {
          opacity: 0.5;
        }

        /* 滚动条的样式 */
        ::-webkit-scrollbar {
          height: 3px; /* 滚动条宽度 */
        }

        /* 滚动条轨道 */
        ::-webkit-scrollbar-track {
          background: #f3f3f3; /* 轨道背景颜色 */
        }

        /* 滚动条滑块 */
        ::-webkit-scrollbar-thumb {
          background: #ff69b4; /* 滑块颜色 */
          border-radius: 4px; /* 滑块圆角 */
        }

        /* 滚动条滑块悬停状态 */
        ::-webkit-scrollbar-thumb:hover {
          background: #ff1493; /* 滑块悬停时的颜色 */
        }
      `}</style>
    </>
  )
}
