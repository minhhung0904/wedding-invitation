import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import ArrowLeft from "../../icons/angle-left-sm.svg?react"
import { LazyDiv } from "../lazyDiv"
import { Button } from "../button"
import { useModal } from "../modal"
import { ALL_PHOTO_IMAGES } from "../../images"

const CAROUSEL_ITEMS = ALL_PHOTO_IMAGES.map((item, idx) => (
  <div className="carousel-item" key={idx}>
    <img src={item} draggable={false} alt={`${idx}`} />
  </div>
))

const DRAG_SENSITIVITY = 15

type Status = "stationary" | "clicked" | "clickCanceled" | "dragging" | "dragEnding" | "moving-left" | "moving-right"
type ClickMove = "left" | "right" | null

export const Gallery = () => {
  const { openModal, closeModal } = useModal()
  const carouselRef = useRef<HTMLDivElement>(null!)

  // States
  const [slide, setSlideState] = useState(0)
  const [status, setStatusState] = useState<Status>("stationary")
  const [dragOption, setDragOptionState] = useState({ startingClientX: 0, startingClientY: 0, currentTranslateX: 0 })
  const [moveOption, setMoveOption] = useState({ srcIdx: 0, dstIdx: 0 })

  // Refs để truy cập giá trị tức thời trong Event Listeners mà không re-render
  const slideRef = useRef(0)
  const statusRef = useRef<Status>("stationary")
  const dragOptionRef = useRef({ startingClientX: 0, startingClientY: 0, currentTranslateX: 0 })
  const clickMoveRef = useRef<ClickMove>(null)

  // Hàm cập nhật kép (vừa state vừa ref) để tối ưu
  const setSlide = (val: number) => { setSlideState(val); slideRef.current = val; }
  const setStatus = (val: Status) => { setStatusState(val); statusRef.current = val; }
  const setDragOption = (val: typeof dragOptionRef.current) => { setDragOptionState(val); dragOptionRef.current = val; }
  const setClickMove = (val: ClickMove) => { clickMoveRef.current = val; }

  useEffect(() => {
    ALL_PHOTO_IMAGES.forEach((image) => {
      const img = new Image(); img.src = image;
    });
  }, [])

  const dragging = useCallback((clientX: number, width: number) => {
    const { startingClientX } = dragOptionRef.current
    let moveX = clientX - startingClientX
    moveX = Math.max(-width, Math.min(width, moveX)) // Giới hạn kéo

    setDragOption({ ...dragOptionRef.current, currentTranslateX: moveX - width })
  }, [])

  const dragEnd = useCallback((width: number) => {
    const { currentTranslateX } = dragOptionRef.current
    let move = 0
    if (currentTranslateX < -width * 1.1) move = 1
    else if (currentTranslateX > -width * 0.9) move = -1

    setDragOption({ ...dragOptionRef.current, currentTranslateX: -width * (move + 1) })
    setStatus("dragEnding")

    setTimeout(() => {
      setDragOption({ ...dragOptionRef.current, currentTranslateX: -width })
      setSlide((slideRef.current + move + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length)
      setStatus("stationary")
    }, 300)
  }, [])

  const move = useCallback((srcIdx: number, dstIdx: number) => {
    setSlide(dstIdx)
    setStatus(srcIdx < dstIdx ? "moving-right" : "moving-left")
    setMoveOption({ srcIdx, dstIdx })
    setTimeout(() => { setClickMove(null); setStatus("stationary"); }, 300)
  }, [])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (statusRef.current === "clicked") setStatus("dragging")
      else if (statusRef.current === "dragging") dragging(e.clientX, carouselRef.current.clientWidth)
    }

    const onTouchMove = (e: TouchEvent) => {
      const { startingClientX, startingClientY } = dragOptionRef.current
      if (statusRef.current === "clicked") {
        const xMove = Math.abs(e.touches[0].clientX - startingClientX)
        const yMove = Math.abs(e.touches[0].clientY - startingClientY)
        if (xMove > DRAG_SENSITIVITY) { e.preventDefault(); setStatus("dragging"); }
        else if (yMove > DRAG_SENSITIVITY) setStatus("clickCanceled")
      } else if (statusRef.current === "dragging") {
        e.preventDefault(); dragging(e.touches[0].clientX, carouselRef.current.clientWidth)
      }
    }

    const onUp = () => {
      const s = statusRef.current
      if (s === "clicked") {
        const moveDir = clickMoveRef.current
        if (moveDir) move(slideRef.current, (slideRef.current + (moveDir === "right" ? 1 : -1) + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length)
        else setStatus("stationary")
      } else if (s === "dragging") {
        dragEnd(carouselRef.current.clientWidth)
      } else if (s === "clickCanceled") {
        setStatus("stationary")
      }
    }

    globalThis.addEventListener("mousemove", onMouseMove);
    globalThis.addEventListener("mouseup", onUp);
    globalThis.addEventListener("touchend", onUp);
    const el = carouselRef.current;
    el?.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      globalThis.removeEventListener("mousemove", onMouseMove);
      globalThis.removeEventListener("mouseup", onUp);
      globalThis.removeEventListener("touchend", onUp);
      el?.removeEventListener("touchmove", onTouchMove);
    }
  }, [dragging, dragEnd, move])

  // Giữ nguyên các hàm tính toán style/class của bạn
  const transformStyle = useMemo(() => 
    ["dragging", "dragEnding"].includes(status) ? { transform: `translateX(${dragOption.currentTranslateX}px)` } : {}
  , [status, dragOption.currentTranslateX])

  const transformClass = `carousel-list ${status === "dragEnding" ? "transitioning" : status === "moving-left" ? "moving-left" : status === "moving-right" ? "moving-right" : ""}`

  const indicatorIndexes = useMemo(() => {
    const total = CAROUSEL_ITEMS.length; const limit = 9;
    if (total <= limit) return Array.from({ length: total }, (_, i) => i)
    let start = Math.max(0, slide - 4); let end = start + limit - 1;
    if (end > total - 1) { end = total - 1; start = end - limit + 1; }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [slide])

  return (
    <LazyDiv className="card gallery">
      <h2 className="english">Gallery</h2>
      <div className="carousel-wrapper">
        <div
          className="carousel"
          ref={carouselRef}
          onMouseDown={(e) => {
            if (status !== "stationary") return
            setDragOption({ startingClientX: e.clientX, startingClientY: e.clientY, currentTranslateX: -e.currentTarget.clientWidth })
            setStatus("clicked")
          }}
          onTouchStart={(e) => {
            if (status !== "stationary") return
            setDragOption({ startingClientX: e.targetTouches[0].clientX, startingClientY: e.targetTouches[0].clientY, currentTranslateX: -e.currentTarget.clientWidth })
            setStatus("clicked")
          }}
        >
          <div className={transformClass} style={transformStyle}>
            {["dragging", "dragEnding"].includes(status) && [
              ...(slide === 0 ? [CAROUSEL_ITEMS[CAROUSEL_ITEMS.length - 1]] : []),
              ...CAROUSEL_ITEMS.slice(slide === 0 ? 0 : slide - 1, slide + 2),
              ...(slide === CAROUSEL_ITEMS.length - 1 ? [CAROUSEL_ITEMS[0]] : []),
            ]}
            {status === "moving-right" && CAROUSEL_ITEMS.slice(moveOption.srcIdx, moveOption.dstIdx + 1)}
            {status === "moving-left" && CAROUSEL_ITEMS.slice(moveOption.dstIdx, moveOption.srcIdx + 1)}
            {["stationary", "clicked", "clickCanceled"].includes(status) && CAROUSEL_ITEMS[slide]}
          </div>

          <div className="carousel-control">
            <div className="control left" 
              onMouseDown={() => status === "stationary" && setClickMove("left")}
              onTouchStart={() => status === "stationary" && setClickMove("left")}
            >
              <ArrowLeft className="arrow" />
            </div>
            <div className="control right"
              onMouseDown={() => status === "stationary" && setClickMove("right")}
              onTouchStart={() => status === "stationary" && setClickMove("right")}
            >
              <ArrowLeft className="arrow right" />
            </div>
          </div>
        </div>

        <div className="carousel-indicator">
          {indicatorIndexes.map((idx) => (
            <button key={idx} className={`indicator${idx === slide ? " active" : ""}`}
              onClick={() => status === "stationary" && slide !== idx && move(slide, idx)}
            />
          ))}
        </div>
      </div>

      <div className="break" />

      <Button className="view-all-button button-style-3" onClick={() => openModal({
        className: "all-photo-modal",
        closeOnClickBackground: true,
        header: <div className="title">Ảnh của chúng mình</div>,
        content: (
          <>
            <div className="photo-list">
              {ALL_PHOTO_IMAGES.map((image, idx) => (
                <img key={idx} src={image} alt={`${idx}`} draggable={false}
                  onClick={() => {
                    if (statusRef.current === "stationary") {
                      if (idx !== slideRef.current) move(slideRef.current, idx)
                      closeModal()
                    }
                  }}
                />
              ))}
            </div>
            <div className="break" />
          </>
        ),
        footer: <Button buttonStyle="style2" className="bg-light-grey-color text-dark-color" onClick={closeModal}>Quay lại</Button>
      })}>
        Xem tất cả ảnh
      </Button>
    </LazyDiv>
  )
}