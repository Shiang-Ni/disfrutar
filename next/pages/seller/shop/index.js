import React, { useEffect, useState } from 'react'
import SellerNavbar from '@/components/layout/navbar/seller-navbar'
import Sidebar from '@/components/seller/sidebar'
import SellerCover from '@/components/seller/sellerCover'
import styles from '@/components/seller/seller.module.scss'
import profileImg from '@/public/images/profile-photo/peach.png'
import Image from 'next/image'
import SellerFooter from '@/components/layout/footer/footer-backstage'
import Form from 'react-bootstrap/Form'
import PhoneTabNav from '@/components/layout/navbar/phone-TabNav'



export default function ShopSetting() {
  //body style
  useEffect(() => {
    // 當元件掛載時添加樣式
    document.body.classList.add(styles.bodyStyleA)

    // 當元件卸載時移除樣式
    return () => {
      document.body.classList.remove(styles.bodyStyleA)
    }
  }, [])

  //控制賣場元件
  const [shopName, setShopName] = useState('')
  const [shopSite, setShopSite] = useState('')
  const [shopInfo, setShopInfo] = useState('')

  return (
    <>
        <header>
          <SellerNavbar />
        </header>
        <main className={styles.mainContainer}>
          <div className="d-none d-md-block">
            <Sidebar />
          </div>
          <div>
            {/* cover */}
            <SellerCover />
            <div className="d-flex flex-column d-lg-none container ps-4 pe-4">
              <Form>
              <Form.Group controlId="coverFile" className="mb-3">
                  <Form.Label className="">賣場封面</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <div className="d-flex justify-content-around align-items-center mt-4 mb-2">
                
                  <div className={`${styles.profile}`}>
                    <Image src={profileImg} alt="profile-photo" className={styles.fit} />
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-center">
                  <Form.Group className="mb-3" controlId="shop-name">
                  <Form.Label className="">賣場名稱</Form.Label>
                  <Form.Control 
                  type="text" 
                  value={shopName} 
                  onChange={(e) => {
                    setShopName(e.target.value)
                  }} 
                  placeholder="請輸入賣場名稱" />
                </Form.Group>
                  </div>
                </div>
                <hr />
                <Form.Group className="mb-2" controlId="shopSite">
                  <Form.Label className="mb-1">賣場網址</Form.Label>
                  <div className="d-flex align-items-center">
                    <h6 className="mb-0 fw-normal me-1">
                      http://www.yourswitchlife.com/
                    </h6>
                    <Form.Control
                        size="sm"
                        type="text"
                        placeholder="請輸入賣場網址"
                        value={shopSite}
                        onChange={(e) => {
                          setShopSite(e.target.value)
                        }}
                      />
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="">賣場介紹</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="請輸入30~50字的賣場介紹"
                    value={shopInfo}
                    onChange={(e) => {
                      setShopInfo(e.target.value)
                    }}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center mb-4">
                  <button type="submit" className="btn btn-danger btn-sm me-2">
                  儲存並上架賣場
                  </button>
                  <button type="submit" className={`btn btn-danger btn-sm ${styles.btnDangerOutlined} me-2`}>
                      儲存暫不上架賣場
                    </button>
                  <button type="button" href="/" className={`btn btn-danger btn-sm ${styles.btnGrayOutlined}`}>
                    取消
                  </button>
                </div>
              </Form>
            </div>
            {/* ----------------電腦版------------------- */}
            <div className={`d-none d-md-block ${styles.dashboardMargin}`}>
              <div className={`mb-4 ${styles.dashboardStyle}`}>
                <Form>
                  <div className="d-flex align-items-end mb-4">
                    <h5 className="text-dark fw-bold mb-0 me-3">
                      賣場基本資料
                    </h5>
                    <p className="text-secondary mb-0">
                      查看及更新您的賣場資料
                    </p>
                  </div>
                  <Form.Group controlId="coverFile" className="mb-3">
                    <Form.Label className="text-dark">賣場封面<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="shopName">
                    <Form.Label className="text-dark">賣場名稱<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" placeholder="請輸入賣場名稱" value={shopName} 
                  onChange={(e) => {
                    setShopName(e.target.value)
                  }} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="shopSite">
                    <Form.Label className="text-dark">賣場網址</Form.Label>
                    <div className="d-flex align-items-center">
                      <h6 className="text-dark mb-0 me-1">
                        http://www.yourswitchlife.com/</h6>
                        <Form.Control
                          size="sm"
                          type="text"
                          placeholder="請輸入賣場網址"
                          value={shopSite}
                        onChange={(e) => {
                          setShopSite(e.target.value)
                        }}
                        />
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label className="text-dark">賣場介紹</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="請輸入30~50字的賣場介紹"
                      value={shopInfo}
                    onChange={(e) => {
                      setShopInfo(e.target.value)
                    }}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-danger me-2">
                      儲存並上架賣場
                    </button>
                    <button type="submit" className={`btn btn-danger ${styles.btnDangerOutlined} me-2`}>
                      儲存暫不上架賣場
                    </button>
                    <button type="button" href="/" className={`btn btn-danger ${styles.btnGrayOutlined}`}>
                      取消
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </main>
        <div className={`d-block d-md-none ${styles.spaceForPhoneTab}`}></div>
        <div className="d-block d-md-none">
          <PhoneTabNav />
        </div>
        <footer className='d-none d-md-block'>
          <SellerFooter />
        </footer>
    </>
  )
}
