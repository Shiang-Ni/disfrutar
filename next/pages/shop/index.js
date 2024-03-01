import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/navbar/navbar'
import Cover from '@/components/seller/cover'
import Image from 'next/image'
import profileImg from '@/public/images/profile-photo/peach.png'
import Sortbar from '@/components/seller/sortbar'
import Coupon from '@/components/seller/coupon'
import Hit from '@/components/seller/hit'
import productList from '@/public/images/card/product-list.png'
import SearchbarB from '@/components/seller/searchbar-b'
import Pagination from '@/components/common/pagination'
import ProductList from '@/components/shop/product-list'
import Footer from '@/components/layout/footer/footer-front'
import SortDropdown from '@/components/common/sortDropdown'
import Form from 'react-bootstrap/Form'
import typeName from '@/data/type.json'
import ratings from '@/data/rating.json'
import TypeFilter from '@/components/shop/type-filter'
import products from '@/data/product.json'
import member from '@/data/member.json'
//Offcanvas
// import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

//toggle list from react bootstrap
import Collapse from 'react-bootstrap/Collapse'

// 引入seller.module.scss
import styles from '@/components/seller/seller.module.scss'
import { FaPlus, FaAngleDown, FaFilter, FaStar } from 'react-icons/fa'
import Link from 'next/link'

export default function Shop() {
  //body style
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleB)

    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleB)
    }
  }, [])

  //offcanvas const
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  //toggle
  const [openSort, setOpenSort] = useState(false)
  const [openRate, setOpenRate] = useState(false)

  //賣場商品
  // const [shopProducts, setShopProducts] = useState(products)
  // console.log(products)
  //篩選3號賣家
  // useEffect(() => {
  //   const ShopProduct = shopProducts.filter((v) => {
  //     return v.member_id === 3
  //   })
  //   setShopProducts(ShopProduct)
  // }, [])
  // const shopProducts = products.filter((v) => {
  //   return v.member_id
  //   === 3 && v.valid === 1
  // })
  // console.log(shopProducts)
  const shopProducts = products.filter(p => p.member_id === 3)
  console.log(shopProducts)

  return (
    <>
      {/* navbar */}
      <Navbar />
      {/* <CartNavbar /> */}
      {/* cover */}
      <Cover />
      {/* shop info */}
      <div className="container">
        <div className="d-none d-lg-block">
          <div className="d-flex justify-content-around mb-5 mt-5">
            {/* seller detail */}
            <div className={styles.profile}>
              <Image src={profileImg} alt="" className={styles.fit} />
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center">
              <h3>碧姬公主的玩具城堡</h3>
              <h6>@princepeach8888</h6>
              <div className="d-flex">
                {/* star rating */}
                <p className="pe-2">5.0</p>
                <p className="text-warning">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </p>
                <p className="ps-2">(150)</p>
              </div>
              <div className="d-flex">
                {/* little dashboard */}
                <div className="d-flex flex-column align-items-center pe-4">
                  <h6>商品數量</h6>
                  <p>28</p>
                </div>
                <div className="d-flex flex-column align-items-center pe-4">
                  <h6>已賣出件數</h6>
                  <p>18</p>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <h6>關注人數</h6>
                  <p>186</p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger d-flex align-items-center"
              >
                <FaPlus className="me-1" />
                關注賣家
              </button>
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center">
              {/* shop detail */}
              <h5 className={styles.detailTitle}>賣場介紹</h5>
              <h6 className={`fw-normal ${styles.textarea}`}>
                這裡是碧姬公主的遊戲城堡，我們提供了品質最優良的二手遊戲，讓您可以獲得物超所值的商品們，享受遊戲帝國的美好！在這裡，您將發現從經典到最新的遊戲，全部都以令人驚喜的價格提供。我們精心挑選和維護每一片遊戲，確保您帶回家的不僅是遊戲，還有最佳的遊玩體驗。
              </h6>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column d-lg-none ps-4 pe-4">
          <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
            <div className={`me-4 ${styles.profile}`}>
              <Image src={profileImg} alt="" className={styles.fit} />
            </div>
            <div className="d-flex flex-column align-items-start justify-content-center">
              <h5 className="mb-1">碧姬公主的玩具城堡</h5>
              <p className="mb-1">@princepeach8888</p>
              <div className="d-flex">
                {/* star rating */}
                <p className="pe-2 mb-0">5.0</p>
                <p className="text-warning mb-0">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </p>
                <p className="ps-2 mb-0">(150)</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-center mt-1 mb-1">
            {/* little dashboard */}
            <div className="d-flex flex-column align-items-center pe-4">
              <h6>商品數量</h6>
              <h6 className="text-danger mb-0">28</h6>
            </div>
            <div className="d-flex flex-column align-items-center pe-4">
              <h6>已賣出件數</h6>
              <h6 className="text-danger mb-0">18</h6>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h6>關注人數</h6>
              <h6 className="text-danger mb-0">186</h6>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center mb-4">
            {/* shop detail */}
            <h5 className="mb-3">賣場介紹</h5>
            <p className="mb-0 ps-2 pe-2">
              這裡是碧姬公主的遊戲城堡，我們提供了品質最優良的二手遊戲，讓您可以獲得物超所值的商品們，享受遊戲帝國的美好！在這裡，您將發現從經典到最新的遊戲，全部都以令人驚喜的價格提供。我們精心挑選和維護每一片遊戲，確保您帶回家的不僅是遊戲，還有最佳的遊玩體驗。
            </p>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <button
              type="button"
              className="btn btn-danger d-flex align-items-center"
            >
              <FaPlus className="me-1" />
              關注賣家
            </button>
          </div>
        </div>
        <Sortbar />
        <div className="d-none d-md-block">
          <Coupon />
        </div>
        <Hit />
        <div className="d-flex d-md-none flex-column ps-4 pe-4">
          <h5 className="fw-bold mb-2">賣場商品</h5>
          <h6 className="mb-3">共66項</h6>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-none d-md-block">
            <SearchbarB />
          </div>
          <div className="d-none d-md-flex justify-content-end">
            {/* offcanvas btn */}
            <TypeFilter />
            <SortDropdown />
          </div>
          <div className="d-flex d-md-none ps-4 pe-4">
            <TypeFilter />
            <SortDropdown />
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-5 flex-wrap">
        {/* {"id":"1","type_id":"2","name":"探靈直播","product_quanty":"1","fav":"0","display_price":"1090","price":"981","img_cover":"Livestream.jpg","img_1":"Livestream-0.jpg","img_2":"Livestream-1.jpg","img_3":"Livestream-2.jpg","release_time":"2021-12-16","language":"[CH,JP]","rating_id":"3","co_op_valid":"0","description":"故事描述在櫻井的提案下，身為實況主的生駒、櫻井和白石三人 前往知名恐怖景點「伊邪那美酒店」拍攝些鬼影幢幢的影片。 原本她們只是想渲染些特效， 能夠平安無事地結束拍攝就好，沒想到…… 在攝影期間，走散的生駒被突如其來的人偶給襲擊， 之後一直徘徊在酒店裡的三人數度遭受威脅。 為何人偶不斷襲擊三人，又為何始終會走不出酒店呢？ 究竟三人能否平安無事地逃離酒店呢？ 在廢棄酒店裡的直播即將開始…… <遊戲概要> 本作為解謎脫逃之冒險遊戲。角色人物需逃離殺人玩偶的魔掌， 並在廢棄酒店裡尋找相關逃脫之線索。 玩家的每個決定都將影響她們的生死。 <系統> ■ 躲藏並逃離人偶吧！ 在廢棄酒店裡到處探險時，一身血漬拿著斧頭的人偶， 開始追著直播的三人！ 當遇到人偶時，必須要趕緊逃開、或是藏身避開人偶的追擊。 要是被一刀給劈下，必死無疑。（遊戲結束） ■ 這是詛咒！？ 直播的女孩們面臨到危及生命的生存危機！ 在廢棄酒店中將面臨各種危機。 調查周遭以獲得相關的線索，善用道具化解生存的危機。 你甚至可以在她們最危機的時刻， 伸手觸碰她們……這難道也是種詛咒！？ ■ 善用提示和道具，這些將能協助找到逃脫的線索！ 在廢棄酒店內尋找各項道具和提示。 搜索房間內的各個角落，以獲得相關的提示。 這將大大改變這些女孩們的命運…… ※ 《探靈直播》中不支援觸控螢幕功能。","member_id":"1","valid":"1","launch_valid":"1","created_at":"2023-09-08 10:09:00.000000"},
{ */}
{/* filter(p => p.member_id === 3). */}

        {products.map((p)=> {
          return (
            <div key={p.id} className='flex-wrap'>
              <ProductList className="p-5" name={p.name} price={p.price} displayPrice={p.display_price} releaseTime={p.release_time} cover={p.img_cover} type={p.type_id} />
            </div>
          )
        })}
        </div>
        {/* <div className="d-flex justify-content-around align-items-center mt-5">
          <ProductList />
          <ProductList />
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-5">
          <ProductList />
          <ProductList />
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-5 mb-5">
          <ProductList />
          <ProductList />
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
          <div className="d-none d-md-block">
            <ProductList />
          </div>
        </div> */}
        <div>
          <Pagination />
        </div>
      </div>
      <Footer />
      {/* offcanvas */}
      <Offcanvas show={show} onHide={handleClose} className={styles.offcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h4>條件篩選</h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* toggle sort */}
          <Form className="d-flex align-items-center flex-column">
            <button
              type="button"
              onClick={() => setOpenSort(!openSort)}
              aria-controls="sort-collapse-text"
              aria-expanded={openSort}
              className={`btn d-flex justify-content-center align-items-center ${styles.togglebtn}`}
            >
              <h5 className="mb-0 me-2">遊戲類別</h5>
              <FaPlus />
            </button>
            <Collapse in={openSort}>
              <div id="sort-collapse-text">
                <div className="d-flex flex-column align-items-center pt-2">
                {typeName.map((t) => {
                  return (
                    <div key={t.id}>
                    <Form.Check // prettier-ignore
                    type="checkbox"
                    id={t.id}
                    label={t.name}
                    className="my-1"
                  />
                    </div>
                  )
                })}
                </div>
              </div>
            </Collapse>
            {/* toggle rate */}
            <button
              type="button"
              onClick={() => setOpenRate(!openRate)}
              aria-controls="rate-collapse-text"
              aria-expanded={openRate}
              className={`btn d-flex justify-content-center align-items-center ${styles.togglebtn}`}
            >
              <h5 className="mb-0 me-2">遊戲分級</h5>
              <FaPlus />
            </button>
            <Collapse in={openRate}>
              <div id="rate-collapse-text">
                <div className="d-flex flex-column align-items-center pt-2">
                {ratings.map((r) => {
                  return (
                    <div key={r.id}>
                    <Form.Check // prettier-ignore
                    type="checkbox"
                    id={r.id}
                    label={r.name}
                    className="my-1"
                  />
                    </div>
                  )
                })}
                </div>
              </div>
            </Collapse>
            <div
              className={`d-flex justify-content-center ${styles.selectBtn}`}
            >
              <button
                type="button"
                className="btn btn-danger d-flex align-items-center"
              >
                篩選商品
              </button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
