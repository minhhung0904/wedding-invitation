import {
  IMAGE_CHUHY,
  IMAGE_ANHHAODUA,
} from "../../images"
import { LazyDiv } from "../lazyDiv"

export const Cover = () => {
  return (
    <LazyDiv className="card cover">
      <div className="std">
        Save The Date
      </div>
      <div className="weddingDate">
        24.01.2026
      </div>
      <div className="HT"> 
        Minh Hùng - Thu Trang
      </div>
      <div className="AnhHT">
        <img className="anhhaidua" src={IMAGE_ANHHAODUA} alt="AnhHT" />
        <img className="chuhy" src={IMAGE_CHUHY} alt="ChyHy" />
      </div>
      <div className="rectangle-parent">
        <div className="wedd">Wedding Invitation</div>
        <div className="rectangle"></div>
        <div className="recred"></div>
        <div className="long-rectangle"></div>
        {/* <div className="containerName">
          <div>
            <span>Nhà Trai</span>

          </div>
          <div>
            <span>Nhà Gái</span>
          </div>
        </div> */}
      </div>
    </LazyDiv>
  )
}
