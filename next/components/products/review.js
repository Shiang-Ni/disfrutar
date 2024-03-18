import React, { useState,useEffect } from 'react'
import RatingStars from './rating-stars'
import styles from '../../styles/products/product-detail.module.scss'
import AddPhoto from '@/components/products/addPhoto'
import { useAuth } from '@/hooks/use-Auth'

export default function Review() {
  const { isLoggedIn, memberId } = useAuth()
  const [review, setReview] = useState({
    rating: 0,
    review: '',
    reviewPhoto: '',
  })
  const [selectFile, setSelectFile] = useState(null)
  const [filePicked, setFilePicked] = useState(false)
  // const [preview, setPreview] = useState('')
  const [imgServerUrl, setImgServerUrl] = useState('')

  // 當選擇檔案更動時建立預覽圖
  // useEffect(() => {
  //   if (!selectFile) {
  //     setPreview('')
  //     return
  //   }
  //   const objURL = URL.createObjectURL(selectFile)
  //   console.log(objURL)
  //   setPreview(objURL)

  //   return () => URL.revokeObjectURL(objURL)
  // }, [selectFile])

  const changHandler = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFilePicked(true)
      setSelectFile(file)
      setImgServerUrl('')
      // const fileName = file.name
      // setReview(prevReview => ({ ...prevReview, reviewPhoto: fileName }))
    } else {
      setFilePicked(false)
      setSelectFile(null)
      setImgServerUrl('')
    }
  }

  // const [reviewPhoto, setReviewPhoto] = useState({ reviewPhoto: '' })
  const fieldChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!review.review) {
      alert('請輸入您的評論')
      return
    } else {
      const formData = new FormData(e.target)
      formData.append('rating', review.rating)
      formData.append('review', review.review)
      if (selectFile) {
        formData.append('reviewPhoto', selectFile)
      }
      // formData.append('reviewPhoto', review.reviewPhoto)
      // console.log('File to upload:', selectFile); // 打印File对象
      // console.log('File name:', selectFile.name)

      console.log(review.reviewPhoto)
      console.log(formData.get('rating'))
      fetch(
        `http://localhost:3005/api/products/addReview?memberId=${memberId}`,
        {
          credentials: 'include',
          method: 'POST',
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          alert('評論已發佈！'),
            setTimeout(() => {
              setReview({
                rating: 0,
                review: '',
                reviewPhoto: '',
              })
            }, 1000)
        })
        .catch((error) => {
          console.error('error', error)
        })
    }
  }

  // console.log(review)

  return (
    <>
      <form
        // action={'/addReview'}
        // method="post"
        // encType="multipart/form-data"
        className={styles.formStyle}
        onSubmit={handleSubmit}
      >
        <div className="ms-3 flex-grow-1">
          <RatingStars
            fieldChange={fieldChange}
            value={review.rating}
            name="rating"
          />

          <input
            type="text"
            name="review"
            className="form-control mt-3"
            placeholder="請留下您的評價... 限30字"
            // aria-label="Recipient's username"
            // aria-describedby="button-addon2"
            maxLength={50}
            value={review.review}
            onChange={fieldChange}
          />
        </div>
        <div className="m-2">
          <AddPhoto
            changHandler={changHandler}
            fieldChange={fieldChange}
            name="reviewPhoto"
          />
        </div>
        {/* <button></button> */}
        <button
          className={`btn ${styles.btnSubmit}`}
          type="submit"
          id="reviewSubmit"
        >
          發布
        </button>
      </form>
    </>
  )
}
