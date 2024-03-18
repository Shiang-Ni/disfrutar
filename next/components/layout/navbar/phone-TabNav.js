import React from 'react'
import styles from '@/components/layout/navbar/navbar.module.scss'
import { FaHome, FaHeart, FaBell, FaUserAlt } from 'react-icons/fa'
import { FaShop, FaCartShopping } from 'react-icons/fa6'
import Link from 'next/link'

// 引入use-cart鉤子
import { useCart } from '@/hooks/use-cart'

export default function PhoneTabNav() {
  const { totalProducts } = useCart()
  return (
    <>
      <div className={`row g-0 text-center d-lg-none ${styles.phoneNav}`}>
        <div className="pt-1 d-flex">
          <div className="col">
            <Link href="" className={styles.phoneNavContent}>
              <FaHome />
              <br />
              首頁
            </Link>
          </div>
          <div className="col">
            <Link href="" className={styles.phoneNavContent}>
              <FaHeart />
              <br />
              追蹤清單
            </Link>
          </div>
          <div className="col">
            <Link href="" className={styles.phoneNavContent}>
              <FaBell />
              <br />
              通知
            </Link>
          </div>
          <div className="col">
            <Link href="" className={styles.phoneNavContent}>
              <FaUserAlt />
              <br />
              會員中心
            </Link>
          </div>
          <div className="col">
            <Link href="" className={styles.phoneNavContent}>
              <FaShop />
              <br />
              店舖管理
            </Link>
          </div>
          <div className="col">
            <Link href="/cart" className={`${styles.phoneNavContent} position-relative`}>
              <FaCartShopping />
              {totalProducts > 0 && (
                <span className={styles.cartBadge}>{totalProducts}</span>
              )}
              <br />
              購物車
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
