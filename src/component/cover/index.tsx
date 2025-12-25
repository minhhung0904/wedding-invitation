import { COVER_IMAGE, IMAGE_WELLCOME, IMAGE_DATE, IMAGE_GROOM, IMAGE_BRIDE, IMAGE_MH, IMAGE_TT } from "../../images"
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

      <div className="nameH">  
        <img className='groom' src={IMAGE_GROOM} alt="grooom" />
        <img className='mh' src={IMAGE_MH} alt="mh" />
      </div>
      
      <div className="nameT">  
        <img className="bride" src={IMAGE_BRIDE} alt="grooom" />
        <img className="tt" src={IMAGE_TT} alt="tt" />
      </div>
      
    </LazyDiv>
  )
}
