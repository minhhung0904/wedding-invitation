import { COVER_IMAGE, IMAGE_WELLCOME, IMAGE_DATE } from "../../images"
import { LazyDiv } from "../lazyDiv"

export const Cover = () => {
  return (
    <LazyDiv className="card cover">
      <div className="image-wellcome">
        <img src={IMAGE_WELLCOME} alt="wellcome"/>
      </div>
      <div className="image-date">  
        <img src={IMAGE_DATE} alt="HT" />
      </div>
      <div className="blur-wrapper">  
        <img src={COVER_IMAGE} alt="HT" />
      </div>
    </LazyDiv>
  )
}
