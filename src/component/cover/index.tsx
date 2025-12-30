import {
  IMAGE_CHUHY,
  IMAGE_ANHHAODUA,
  IMAGE_ANHTRONHUNG,
  IMAGE_ANHHTRONTRANG,
  IMAGE_PHANCACH,
  IMAGE_BAANH,
  IMAGE_LICHNGAYCUOI,
  IMAGE_MAP,
  IMAGE_CHUHY1,
  IMAGE_VAYCUOI,
  IMAGE_BEN1,
  IMAGE_BEN2,
  IMAGE_CHONGCAM,
  GALLERY_IMAGES,
  IMAGE_QRHUNG,
  ALL_PHOTO_IMAGES,
  IMAGE_ANHCOICUTE,
  IMAGE_ANHHUNG2,
  IMAGE_ANHCUOI,
} from "../../images"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"
import "animate.css"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Gallery } from "../gallery"

const GALLERY_DATA = ALL_PHOTO_IMAGES.map((img) => ({
  original: img,
  thumbnail: img,
}))


export const Cover = () => {
  const targetTime = new Date("2026-01-24T12:00:00+07:00").getTime()

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [name, setName] = useState("")
  const [attend, setAttend] = useState("yes")
  const [loading, setLoading] = useState(false)

  const [popup, setPopup] = useState({
    show: false,
    success: true,
    message: "",
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now()
      const distance = targetTime - now

      if (distance <= 0) {
        clearInterval(timer)
        return
      }

      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async () => {
    if (!name.trim()) {
      setPopup({
        show: true,
        success: false,
        message: "Bạn quên nhập tên mất rồi!",
      })
      return
    }

    setLoading(true)

    try {
      const res = await fetch("https://your-api-url.com/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, attend }),
      })

      if (!res.ok) throw new Error("API error")

      setPopup({
        show: true,
        success: true,
        message: "🎉 Đã gửi xác nhận thành công!",
      })

      setName("")
      setAttend("yes")
    } catch (err) {
      console.error(err)
      setPopup({
        show: true,
        success: false,
        message: "❌ Gửi xác nhận thất bại. Vui lòng thử lại!",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <LazyDiv className="card cover">
      <div className="std">Save The Date</div>
      <div className="weddingDate">24.01.2026</div>
      <div className="HT">Minh Hùng - Thu Trang</div>
      <div className="AnhHT">
        <img className="anhhaidua" src={IMAGE_ANHHAODUA} alt="AnhHT" />
        <img className="chuhy" src={IMAGE_CHUHY} alt="ChyHy" />
      </div>
      <div className="rectangle-parent">
        <div className="wedd">Wedding Invitation</div>
        <div className="rectangle"></div>
        <div className="recred"></div>
        <div className="long-rectangle">
          <div className="Hainha">
            <div className="moinha">
              <span className="nha-name">Nhà trai</span>
              <span className="tenbome">Ông Tăng Văn Hồng Lâm</span>
              <span className="tenbome">Bà Hồ Thị Lịch</span>
            </div>
            <div className="moinha">
              <span className="nha-name">Nhà gái</span>
              <span className="tenbome">Ông Thái Ngô Hải</span>
              <span className="tenbome">Bà Nguyễn Thị Hằng Nga</span>
            </div>
          </div>
          <div className="anhlogo2dua">
            <div className="anhlogohung">
              <img src={IMAGE_ANHTRONHUNG} alt="anhhung" />
            </div>
            <div className="anhlogotrang">
              <img src={IMAGE_ANHHTRONTRANG} alt="anhtrang" />
            </div>
          </div>

          <div className="tenhaidua">
            <span className="tenhung">Minh Hùng</span>
            <span className="tenva">&</span>
            <span className="tentrang">Thu Trang</span>
          </div>

          <div className="countdown">
            <div className="time-box">
              <span id="days">{time.days}</span>
              <small>ngày</small>
            </div>
            <div className="time-box">
              <span id="hours">{time.hours}</span>
              <small>giờ</small>
            </div>
            <div className="time-box">
              <span id="minutes">{time.minutes}</span>
              <small>phút</small>
            </div>
            <div className="time-box">
              <span id="seconds">{time.seconds}</span>
              <small>giây</small>
            </div>
          </div>

          <div className="phancach">
            <img src={IMAGE_PHANCACH} alt="phancach" />
          </div>

          <div className="ttkm">Trân Trọng Kính Mời</div>

          <div className="baanh">
            <img src={IMAGE_BAANH} alt="baanh" />
          </div>

          <div className="invitation">
            <div className="title-invitation">THAM DỰ LỄ THÀNH HÔN</div>

            <div className="subtitle-invitation">Vào lúc</div>

            <div className="timed">
              <div className="time">12:00</div>

              <div className="divider"></div>

              <div className="date">
                <div className="day-name">Thứ Bảy</div>
                <div className="day-number">24</div>
                <div className="month">Tháng 01</div>
              </div>

              <div className="divider"></div>

              <div className="year">2026</div>
            </div>
          </div>

          <div className="lichngaycuoi">
            <img src={IMAGE_LICHNGAYCUOI} alt="lichngaycuoi" />
          </div>

          <div className="phancach">
            <img src={IMAGE_PHANCACH} alt="phancach" />
          </div>

          <div className="location">
            <div className="location-title">Địa điểm tổ chức</div>
            <img className="imgmap" src={IMAGE_MAP} alt="MAP" />
          </div>

          <div className="address">
            <div>Nhà văn hóa Xóm 3 Thị Trấn</div>
            <div>Đô Lương, Nghệ An</div>
          </div>

          <div className="map">
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471.8306769362764!2d105.31157989759703!3d18.902805322302722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139e3000d2d12a3%3A0x84b99574330df703!2zTmjDoCB2xINuIGhvw6Ega2jhu5FpIDM!5e0!3m2!1svi!2sus!4v1766987100938!5m2!1svi!2sus"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ địa điểm"
              />
            </div>
          </div>

          <div className="phancach">
            <img src={IMAGE_PHANCACH} alt="phancach" />
          </div>

          <div className="confirm-wrapper">
            <div className="title">Xác nhận tham dự</div>
            <img className="chuhy1" src={IMAGE_CHUHY1} alt="Chữ hy 1" />

            <div className="cardInvite">
              <label>Họ và tên</label>
              <input
                className="inputName"
                type="text"
                placeholder="Nhập tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="question">Bạn sẽ tham dự chứ?</div>

              <label className="radio">
                <input
                  type="radio"
                  name="attend"
                  value="yes"
                  checked={attend === "yes"}
                  onChange={() => setAttend("yes")}
                />
                Có, tôi sẽ tham dự
              </label>

              <label className="radio">
                <input
                  type="radio"
                  name="attend"
                  value="no"
                  checked={attend === "no"}
                  onChange={() => setAttend("no")}
                />
                Tôi bận, rất tiếc không thể tham dự
              </label>
            </div>
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi xác nhận"}
            </button>
          </div>
        </div>
      </div>
      <div className="rectanglered">
        <img
          className="ben1 animate__animated animate__slideInLeft"
          src={IMAGE_BEN1}
          alt="phukien1"
        />
        <img className="vaycuoi" src={IMAGE_VAYCUOI} alt="vaycuoi" />
        <img
          className="ben2 animate__animated animate__slideInRight"
          src={IMAGE_BEN2}
          alt="phukien2"
        />
        <span>Hạnh phúc lớn nhất chính là có thể đặt tay mình vào tay em.</span>
      </div>

      <div className="white1">
        <div className="tendoc">
          <span className="name"> Hùng</span>
          <span className="and">&</span>
          <span className="name"> Trang</span>
        </div>
        <img src={IMAGE_CHONGCAM} alt="tvmhttt" />
      </div>

      <div className="break" />

      <div className="rectanglered2">
        <span>
          Em không phải là điểm cuối của tình yêu, mà là động lực nguyên sơ của
          nó. Vì em, anh đã yêu thế giới này.
        </span>
        {/* <div className="card gallery">
          <h2 className="english">Gallery</h2>
          <ImageGallery
            items={GALLERY_DATA}
            showPlayButton={false}
            showFullscreenButton={true}
            slideInterval={4000}
            slideDuration={500}
            lazyLoad={true}
            slideAnimation="fade"
            additionalClass="wedding-gallery"
          />
        </div> */}
        <Gallery/>
      </div>


      <div className="quamung">
        <span className="message">
          Mình rất muốn được chụp chung với bạn những tấm hình kỷ niệm vì vậy
          hãy đến sớm hơn một chút bạn yêu nhé! Đám cưới của chúng mình sẽ trọn
          vẹn hơn khi có thêm lời chúc phúc và sự hiện diện của các bạn
        </span>
        <span className="send-gift">GỬI QUÀ MỪNG </span>
        <div className="gift-wrapper">
          <div className="gift-row left">
            <div className="avatar">
              <img src={IMAGE_ANHCOICUTE} alt="" />
            </div>

            <div className="gift-card">
              <div className="info">
                <div className="role">Cô dâu</div>
                <div className="name">Thái Thu Trang</div>
                <div className="bank">BIDV : 012345678</div>
              </div>
              <img className="qr" src={IMAGE_QRHUNG} alt="QR" />
            </div>
          </div>

          <div className="gift-row right">
            <div className="gift-card">
              <img className="qr" src={IMAGE_QRHUNG} alt="QR" />
              <div className="info">
                <div className="role">Chú rể</div>
                <div className="name">Tăng Văn Minh Hùng</div>
                <div className="bank">ACB : 27039757</div>
              </div>
            </div>

            <div className="avatar">
              <img src={IMAGE_ANHHUNG2} alt="Chú rể" />
            </div>
          </div>
        </div>
      </div>

      <div className="anhcuoi">
        <img src={IMAGE_ANHCUOI} alt="Anh cuoi" />
      </div>


      {popup.show && (
        <div className="popup-overlay">
          <div className={`popup ${popup.success ? "success" : "error"}`}>
            <div className="popup-message">{popup.message}</div>
            <button
              className="popup-btn"
              onClick={() => setPopup({ ...popup, show: false })}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </LazyDiv>
  )
}
