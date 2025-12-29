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
  ALL_PHOTO_IMAGES,
} from "../../images"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import ArrowLeft from "../../icons/angle-left-sm.svg?react"
import { useModal } from "../modal"

const CAROUSEL_ITEMS = ALL_PHOTO_IMAGES.map((item, idx) => (
  <div className="carousel-item" key={idx}>
    <img src={item} draggable={false} alt={`${idx}`} />
  </div>
))

const DRAG_SENSITIVITY = 15

type Status =
  | "stationary"
  | "clicked"
  | "clickCanceled"
  | "dragging"
  | "dragEnding"
  | "moving-left"
  | "moving-right"

type DragOption = {
  startingClientX: number
  startingClientY: number
  currentTranslateX: number
}

type ClickMove = "left" | "right" | null

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

  const { openModal, closeModal } = useModal()
  const carouselRef = useRef<HTMLDivElement>({} as HTMLDivElement)

  useEffect(() => {
    // preload images
    GALLERY_IMAGES.forEach((image) => {
      const img = new Image()
      img.src = image
    })
  }, [])

  const [slide, _setSlide] = useState(0)
  const slideRef = useRef(0)
  const setSlide = (slide: number) => {
    _setSlide(slide)
    slideRef.current = slide
  }

  const [status, _setStatus] = useState<Status>("stationary")
  const statusRef = useRef<Status>("stationary")
  const setStatus = (status: Status) => {
    _setStatus(status)
    statusRef.current = status
  }

  const [dragOption, _setDragOption] = useState<DragOption>({
    startingClientX: 0,
    startingClientY: 0,
    currentTranslateX: 0,
  })
  const dragOptionRef = useRef<DragOption>({
    startingClientX: 0,
    startingClientY: 0,
    currentTranslateX: 0,
  })
  const setDragOption = (dragOption: DragOption) => {
    _setDragOption(dragOption)
    dragOptionRef.current = dragOption
  }

  const [moveOption, setMoveOption] = useState({
    srcIdx: 0,
    dstIdx: 0,
  })

  const clickMoveRef = useRef<ClickMove>(null)
  const setClickMove = (clickMove: ClickMove) => {
    clickMoveRef.current = clickMove
  }

  // For debugging
  // useEffect(() => {
  //   console.log(status)
  // }, [status])

  const click = (
    status: Status,
    clientX: number,
    clientY: number,
    carouselWidth: number,
  ) => {
    if (status !== "stationary") return
    setDragOption({
      startingClientX: clientX,
      startingClientY: clientY,
      currentTranslateX: -carouselWidth,
    })
    setStatus("clicked")
  }

  const dragging = useCallback(
    (dragOption: DragOption, clientX: number, carouselWidth: number) => {
      let moveTranslateX = clientX - dragOption.startingClientX

      if (moveTranslateX > carouselWidth) {
        moveTranslateX = carouselWidth
      } else if (moveTranslateX < -carouselWidth) {
        moveTranslateX = -carouselWidth
      }

      setDragOption({
        ...dragOption,
        currentTranslateX: moveTranslateX - carouselWidth,
      })
    },
    [],
  )

  const dragEnd = useCallback(
    (slide: number, dragOption: DragOption, carouselWidth: number) => {
      let move = 0
      if (dragOption.currentTranslateX < -carouselWidth * 1.1) {
        move = 1
      } else if (dragOption.currentTranslateX > -carouselWidth * 0.9) {
        move = -1
      }

      setDragOption({
        ...dragOption,
        currentTranslateX: -carouselWidth * (move + 1),
      })

      setStatus("dragEnding")

      setTimeout(() => {
        setDragOption({
          ...dragOption,
          currentTranslateX: -carouselWidth,
        })
        setStatus("stationary")
        setSlide((slide + move + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length)
      }, 300)
    },
    [],
  )

  const move = useCallback((srcIdx: number, dstIdx: number) => {
    setSlide(dstIdx)
    if (srcIdx < dstIdx) {
      setStatus("moving-right")
    } else {
      setStatus("moving-left")
    }

    setMoveOption({ srcIdx, dstIdx })

    setTimeout(() => {
      setClickMove(null)
      setStatus("stationary")
    }, 300)
  }, [])

  /* Events */
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const status = statusRef.current

      if (status === "clicked") {
        setStatus("dragging")
      } else if (status === "dragging") {
        e.preventDefault()
        dragging(
          dragOptionRef.current,
          e.clientX,
          carouselRef.current.clientWidth,
        )
      }
    },
    [dragging],
  )

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      const status = statusRef.current

      if (status === "clicked") {
        e.preventDefault()
        const xMove =
          e.targetTouches[0].clientX - dragOptionRef.current.startingClientX
        const yMove =
          e.targetTouches[0].clientY - dragOptionRef.current.startingClientY
        if (Math.abs(xMove) > DRAG_SENSITIVITY) {
          setStatus("dragging")
        } else if (Math.abs(yMove) > DRAG_SENSITIVITY) {
          setStatus("clickCanceled")
        }
      } else if (status === "dragging") {
        e.preventDefault()
        dragging(
          dragOptionRef.current,
          e.targetTouches[0].clientX,
          carouselRef.current.clientWidth,
        )
      }
    },
    [dragging],
  )

  const onMouseTouchUp = useCallback(() => {
    const status = statusRef.current
    const clickMove = clickMoveRef.current
    const slide = slideRef.current

    if (status === "clicked") {
      if (clickMove === "left") {
        move(slide, (slide + CAROUSEL_ITEMS.length - 1) % CAROUSEL_ITEMS.length)
      } else if (clickMove === "right") {
        move(slide, (slide + 1) % CAROUSEL_ITEMS.length)
      } else {
        setStatus("stationary")
      }
    } else if (status === "dragging") {
      dragEnd(slide, dragOptionRef.current, carouselRef.current.clientWidth)
    } else if (status === "clickCanceled") {
      setStatus("stationary")
    }
  }, [dragEnd, move])

  useEffect(() => {
    const carouselElement = carouselRef.current

    window.addEventListener("mousemove", onMouseMove)
    carouselElement.addEventListener("touchmove", onTouchMove)
    window.addEventListener("mouseup", onMouseTouchUp)
    window.addEventListener("touchend", onMouseTouchUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      carouselElement.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("mouseup", onMouseTouchUp)
      window.removeEventListener("touchend", onMouseTouchUp)
    }
  }, [onMouseMove, onTouchMove, onMouseTouchUp])

  const onIndicatorClick = useCallback(
    (status: Status, srcIdx: number, dstIdx: number) => {
      if (status !== "stationary" || srcIdx === dstIdx) return
      move(srcIdx, dstIdx)
    },
    [move],
  )

  const transformStyle = useMemo(() => {
    switch (status) {
      case "dragging":
      case "dragEnding":
        return { transform: `translateX(${dragOption.currentTranslateX}px)` }
      default:
        return {}
    }
  }, [status, dragOption])

  const transformClass = useMemo(() => {
    const className = "carousel-list"
    switch (status) {
      case "dragEnding":
        return className + " transitioning"
      case "moving-left":
        return className + " moving-left"
      case "moving-right":
        return className + " moving-right"
      default:
        return className
    }
  }, [status])

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
        <img className="ben1" src={IMAGE_BEN1} alt="phukien1" />
        <img className="vaycuoi" src={IMAGE_VAYCUOI} alt="vaycuoi" />
        <img className="ben2" src={IMAGE_BEN2} alt="phukien2" />
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
        <div className="card gallery">
          <h2 className="english">Gallery</h2>
          <div className="carousel-wrapper">
            <div
              className="carousel"
              ref={carouselRef}
              onMouseDown={(e) =>
                click(
                  statusRef.current,
                  e.clientX,
                  e.clientY,
                  e.currentTarget.clientWidth,
                )
              }
              onTouchStart={(e) =>
                click(
                  statusRef.current,
                  e.targetTouches[0].clientX,
                  e.targetTouches[0].clientY,
                  e.currentTarget.clientWidth,
                )
              }
            >
              <div className={transformClass} style={transformStyle}>
                {["dragging", "dragEnding"].includes(status) && [
                  ...(slide === 0
                    ? [CAROUSEL_ITEMS[CAROUSEL_ITEMS.length - 1]]
                    : []),
                  ...CAROUSEL_ITEMS.slice(
                    slide === 0 ? 0 : slide - 1,
                    slide + 2,
                  ),
                  ...(slide === CAROUSEL_ITEMS.length - 1
                    ? [CAROUSEL_ITEMS[0]]
                    : []),
                ]}
                {status === "moving-right" &&
                  CAROUSEL_ITEMS.slice(
                    moveOption.srcIdx,
                    moveOption.dstIdx + 1,
                  )}
                {status === "moving-left" &&
                  CAROUSEL_ITEMS.slice(
                    moveOption.dstIdx,
                    moveOption.srcIdx + 1,
                  )}
                {["stationary", "clicked", "clickCanceled"].includes(status) &&
                  CAROUSEL_ITEMS[slide]}
              </div>
              <div className="carousel-control">
                <div
                  className="control left"
                  onMouseDown={() => {
                    if (statusRef.current === "stationary") setClickMove("left")
                  }}
                  onTouchStart={() => {
                    if (statusRef.current === "stationary") setClickMove("left")
                  }}
                >
                  <ArrowLeft className="arrow" />
                </div>
                <div
                  className="control right"
                  onMouseDown={() => {
                    if (statusRef.current === "stationary")
                      setClickMove("right")
                  }}
                  onTouchStart={() => {
                    if (statusRef.current === "stationary")
                      setClickMove("right")
                  }}
                >
                  <ArrowLeft className="arrow right" />
                </div>
              </div>
            </div>
            <div className="carousel-indicator">
              {CAROUSEL_ITEMS.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator${idx === slide ? " active" : ""}`}
                  onClick={() =>
                    onIndicatorClick(statusRef.current, slideRef.current, idx)
                  }
                />
              ))}
            </div>
          </div>

          <div className="break" />

          <Button
            onClick={() =>
              openModal({
                className: "all-photo-modal",
                closeOnClickBackground: true,
                header: <div className="title">Ảnh của chúng mình</div>,
                content: (
                  <>
                    <div className="photo-list">
                      {GALLERY_IMAGES.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`${idx}`}
                          draggable={false}
                          onClick={() => {
                            if (statusRef.current === "stationary") {
                              if (idx !== slideRef.current) {
                                move(slideRef.current, idx)
                              }
                              closeModal()
                            }
                          }}
                        />
                      ))}
                    </div>
                    <div className="break" />
                  </>
                ),
                footer: (
                  <Button
                    buttonStyle="style2"
                    className="bg-light-grey-color text-dark-color"
                    onClick={closeModal}
                  >
                    Quay lại
                  </Button>
                ),
              })
            }
          >
            Xem tất cả
          </Button>
        </div>
      </div>

      <div className="break" />

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
