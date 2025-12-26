import { IMAGE_CHUHY, IMAGE_ANHHAODUA, IMAGE_ANHTRONHUNG, IMAGE_ANHHTRONTRANG } from "../../images"
import { LazyDiv } from "../lazyDiv"

export const Cover = () => {
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
              <span className='tenbome'>Ông Tăng Văn Hồng Lâm</span>
              <span className='tenbome'>Bà Hồ Thị Lịch</span>
            </div>
            <div className="moinha">
              <span className="nha-name">Nhà gái</span>
              <span className='tenbome'>Ông Thái Ngô Hải</span>
              <span className='tenbome'>Bà Nguyễn Thị Hằng Nga</span>
            </div>
          </div>
          <div className='anhlogo2dua'>
            <div className='anhlogohung'>
              <img src={IMAGE_ANHTRONHUNG} alt="anhhung" />
            </div>
            <div className='anhlogotrang'>
              <img src={IMAGE_ANHHTRONTRANG} alt="anhtrang" />
            </div>
          </div>

          <div className='tenhaidua'>
            <span className='tenhung'>Minh Hùng</span>
            <span className='tenva'>&</span>
            <span className='tentrang'>Thu Trang</span>
          </div>
        </div>
      </div>
    </LazyDiv>
  )
}
