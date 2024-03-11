import express from 'express'
const router = express.Router()
import db from '../configs/db.mjs'
import { v4 as uuidv4 } from 'uuid'

// 取得商品對應的賣場名稱
router.get('/shop-names', async (req, res) => {
  try {
    // 從client端傳來的賣場id參數們
    const memberIds = req.query.memberIds

    if (!memberIds) {
      return res.status(400).json({ message: 'memberIds are required' })
    }
    // 建立相對應client端傳來的賣場id參數們的佔位字符串'?'
    const memberIdsParams = memberIds
      .split(',')
      .map(() => '?')
      .join(',')

    const [rows] = await db.execute(
      `SELECT id, shop_name FROM member WHERE id IN (${memberIdsParams})`,
      memberIds.split(',')
    )

    const shopNames = rows.reduce((group, item) => {
      group[item.id] = item.shop_name
      return group
    }, {})
    res.json(shopNames)
  } catch (error) {
    console.error('伺服器連線失敗', error)
    res.status(500).json({ message: '伺服器連線失敗' })
  }
})

// 取得對應會員的常用地址
router.get('/common-address/:memberId', async (req, res) => {
  try {
    // 從client端傳來的會員id
    const memberId = req.params.memberId

    if (!memberId) {
      return res.status(400).json({ message: 'memberId are required' })
    }

    const [rows] = await db.execute(
      'SELECT * FROM shipping_address WHERE `member_id` = ?',
      [memberId]
    )

    res.json(rows)
  } catch (error) {
    console.error('伺服器連線失敗', error)
    res.status(500).json({ message: '伺服器連線失敗' })
  }
})

// 接收編輯地址的表單資訊
router.post('/edit-address', async (req, res) => {
  const {
    memberId,
    shipping_method,
    name,
    phone,
    address,
    specialPreferences,
    homeField,
  } = req.body

  const { AddressType, DeliveryTimePreference } = specialPreferences
  console.log(req.body)

  const buildShippingInfo = () =>
    JSON.stringify({
      name,
      phone,
      address,
      specialPreferences: {
        AddressType,
        DeliveryTimePreference,
      },
    })

  console.log(buildShippingInfo)

  // 如果找到對應地址欄位
  if (homeField && ['home1', 'home2', 'home3'].includes(homeField)) {
    const shippingInfo = buildShippingInfo()

    const sql = `UPDATE shipping_address SET ${homeField} = ? WHERE member_id = ? AND shipping_method = ?`

    try {
      const [result] = await db.execute(sql, [
        shippingInfo,
        memberId,
        shipping_method,
      ])

      // 對於 UPDATE 操作，affectedRows 表示更新的行數
      if (result.affectedRows > 0) {
        return res.json({ success: true, message: '地址更新成功' })
      } else {
        return res
          .status(404)
          .json({ success: false, message: '未找到對應的會員ID' })
      }
    } catch (error) {
      console.error('更新地址時發生錯誤:', error)
      return res.status(500).json({ success: false, message: '伺服器錯誤' })
    }
  } else {
    // 如果有地址的空欄位才可以更新上去
    const [existingAddresses] = await db.query(
      'SELECT home1, home2, home3 FROM shipping_address WHERE member_id = ? AND shipping_method = ?',
      [memberId, shipping_method]
    )
    const existingAddress = existingAddresses[0]
    // 尋找第一個空的地址欄位
    const findFirstEmptyField = (address) => {
      const fields = ['home1', 'home2', 'home3']
      for (const field of fields) {
        if (!address[field]) {
          return field
        }
      }
      return null
    }
    const emptyField = findFirstEmptyField(existingAddress)
    if (emptyField) {
      const shippingInfo = buildShippingInfo()
      const sql = `UPDATE shipping_address SET ${emptyField} = ? WHERE member_id = ? AND shipping_method = ?`
      await db.execute(sql, [shippingInfo, memberId, shipping_method])
      return res.json({ success: true, message: '地址新增成功' })
    } else {
      res.status(400).json({ message: '地址欄位都已經有資料了' })
    }
  }
})

// 接收新增地址的表單資訊
router.post('/add-address', async (req, res) => {
  const {
    memberId,
    shipping_method,
    name,
    phone,
    address,
    specialPreferences,
  } = req.body

  const shippingInfo = JSON.stringify({
    name,
    phone,
    address,
    specialPreferences,
  })

  // 先查詢該會員是否有設置常用地址
  const [existingAddresses] = await db.query(
    'SELECT * FROM shipping_address WHERE member_id = ? AND shipping_method = ?',
    [memberId, shipping_method]
  )

  if (existingAddresses.length === 0) {
    const insertSql =
      'INSERT INTO shipping_address (member_id, shipping_method, home1) VALUES (?, ?, ?)'
    await db.execute(insertSql, [memberId, shipping_method, shippingInfo])
    res.status(200).json({ message: '新增地址資料成功' })
  } else {
    // 尋找第一個空的地址欄位
    const findFirstEmptyField = (address) => {
      const fields = ['home1', 'home2', 'home3']
      for (const field of fields) {
        if (!address[field]) {
          return field
        }
      }
      return null
    }
    // 如果已經有常用地址了，找到第一個空地址的欄位
    const emptyField = findFirstEmptyField(existingAddresses[0])
    if (emptyField) {
      const updateSql = `UPDATE shipping_address SET ${emptyField} = ? WHERE member_id = ? AND shipping_method = ?`
      await db.execute(updateSql, [shippingInfo, memberId, shipping_method])
      return res.json({ success: true, message: '地址新增成功' })
    } else {
      res.status(400).json({ message: '地址欄位都已經有資料了' })
    }
  }
})

// 建立訂單
router.post('/create-order', async (req, res) => {
  const {
    items,
    member_buyer_id,
    paymentMethod,
    shipping_method,
    shippingDiscount,
    productDiscount,
    shippingInfos,
  } = req.body
  console.log(req.body)

  // 測試
  // const testItems = [
  //   {
  //     name: '羅德斯島戰記 蒂德莉特的奇境冒險',
  //     releaseTime: '2021-12-15',
  //     display_price: 1400,
  //     price: 1260,
  //     img_cover: 'RecordofLodoss-War.jpg',
  //     type: 4,
  //     id: 2,
  //     member_id: 2,
  //     fav: 0,
  //     language: '[CH,EN,JP]',
  //     quantity: 1,
  //     userSelect: true,
  //     timeStamp: 1710000654535,
  //   },
  //   {
  //     name: '兩人一起！貓咪大戰爭',
  //     releaseTime: '2021-12-08',
  //     display_price: 790,
  //     price: 711,
  //     img_cover: 'TogetherTheBattleCats.jpg',
  //     type: 5,
  //     id: 11,
  //     member_id: 1,
  //     fav: 0,
  //     language: '[CH,JP]',
  //     quantity: 1,
  //     userSelect: true,
  //     timeStamp: 1710000632525,
  //   },
  //   {
  //     name: '死亡微笑 I・II（DEATHSMILES I・II）',
  //     releaseTime: '2021-12-15',
  //     display_price: 1300,
  //     price: 1170,
  //     img_cover: 'DeathSmiles.jpg',
  //     type: 8,
  //     id: 3,
  //     member_id: 3,
  //     fav: 0,
  //     language: '[CH,EN,JP]',
  //     quantity: 1,
  //     userSelect: true,
  //     timeStamp: 1709965635548,
  //   },
  // ]

  // 計算總優惠折抵(商品折抵金額+運費折抵金額)
  const totalDiscount = shippingDiscount + productDiscount
  let totalOrderPrice = 0

  try {
    // 連接資料庫
    const connection = await db.getConnection()
    try {
      // 開始beginTransaction事務
      await connection.beginTransaction()

      // 新增order_group資料(同一付款模式不同賣場訂單存進同組別)
      const orderGroupUuid = uuidv4()
      const [orderGroupResult] = await connection.execute(
        `INSERT INTO order_group (order_info, payment_method) VALUES (?, ?)`,
        [orderGroupUuid, paymentMethod]
      )
      const groupId = orderGroupResult.insertId

      // 測試
      // const groupedItems = testItems.reduce((group, item) => {
      //   if (!group[item.member_id]) {
      //     group[item.member_id] = []
      //   }
      //   group[item.member_id].push(item)
      //   return group
      // }, {})

      console.log(req.body.items)

      try {
        // 預處理，計算所有訂單的totalOrderPrice總金額
        totalOrderPrice = items.reduce((total, item) => {
          const shippingCost =
            shipping_method[item.member_id] === '2' ? 100 : 60
          return total + item.price * item.quantity + shippingCost
        }, 0)
      } catch (error) {
        console.error('在 reduce 使用時出錯:', error)
      }

      const groupedItems = items.reduce((group, item) => {
        if (!group[item.member_id]) {
          group[item.member_id] = []
        }
        group[item.member_id].push(item)
        return group
      }, {})

      // 遍歷每個賣場分組創建賣場訂單
      for (const [member_id, itemsInGroup] of Object.entries(groupedItems)) {
        console.log(itemsInGroup)
        if (!Array.isArray(itemsInGroup)) {
          console.error(`預期 itemsInGroup 是一個陣列，取得:`, itemsInGroup)
          continue
        }
        // 查找每個賣場對應的配送方式的運費
        const shippingCost = shipping_method[member_id] === '2' ? 100 : 60

        // 計算訂單總價格(未使用優惠券前)
        const orderPrice =
          itemsInGroup.reduce(
            (sum, { price, quantity }) => sum + price * quantity,
            0
          ) + shippingCost

        // 計算每個賣場訂單在所有訂單總額的佔比
        const proportion =
          totalOrderPrice > 0 ? orderPrice / totalOrderPrice : 0

        // 根據比例分配總折抵金額
        const discountAmount = totalDiscount * proportion

        // 計算每個訂單實際付款的訂單總金額(使用優惠券)-先四捨五入測試
        const finalPrice = Math.round(orderPrice - discountAmount)

        // 每個賣場的收件人資訊
        const shippingInfo = shippingInfos.find(
          (info) => info.member_id.toString() === member_id.toString()
        )
        // 如果沒有收件資訊
        if (!shippingInfo) {
          return res.status(400).json({ message: '缺少收件人資訊' })
        }

        for (const item of itemsInGroup) {
          await connection.execute(
            `INSERT INTO orders (group_id, order_number, member_buyer_id, member_seller_id, product_id, quantity, order_price, final_price, shipping_method, receive_name, receive_phone, receive_address, payment_method, shipping_status, status, coupon_id, shipping_discount_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              groupId,
              uuidv4(),
              member_buyer_id,
              member_id,
              item.id,
              item.quantity,
              orderPrice,
              finalPrice,
              shipping_method[member_id],
              shippingInfo.receiveName,
              shippingInfo.receivePhone,
              shippingInfo.receiveaddress,
              paymentMethod,
              1,
              '待付款',
              '',
              '',
            ]
          )
        }
      }
      await connection.commit()
      if (paymentMethod === 1) {
        // 貨到付款
        res.json({ status: 'success', message: '建立訂單成功，貨到付款' })
      } else if (paymentMethod === 2) {
        // LINEPAY
        res.json({ status: 'success', message: '建立訂單成功，LINEPAY' })
      } else if (paymentMethod === 3) {
        // 信用卡(綠界)
        res.json({ status: 'success', message: '建立訂單成功，信用卡' })
      }
    } catch (error) {
      await connection.rollback()
      res.status(500).json({ message: '創立訂單失敗', error: error.message })
    } finally {
      connection.release() // 釋放連接回資料庫
    }
  } catch (error) {
    res.status(500).json({ message: '資料庫連接失敗', error: error.message })
  }
})

export default router
