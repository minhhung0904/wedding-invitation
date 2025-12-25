import { IMAGE_CHIA2NHA, IMAGE_NHATRAI, IMAGE_NHAGAI, IMAGE_WEDDING, IMAGE_LOIMOI } from "../../../public/images"

import { LazyDiv } from "../lazyDiv"
export const Invitation = () => {
  return (
    <LazyDiv className="card invitation">
      <div className="wedding">
          <img src={IMAGE_WEDDING} alt="nhatrai" />
        </div>

      <div className="container">
        <div className="nhatrai">
          <img src={IMAGE_NHATRAI} alt="nhatrai" />
        </div>
        <div className="chia2nha">
          <img src={IMAGE_CHIA2NHA} alt="hy" />
        </div>
        <div className="nhagai">
          <img src={IMAGE_NHAGAI} alt="nhagai" />
        </div>
      </div>
      <div className="loimoi">
        <img src={IMAGE_LOIMOI} alt="loimoi" />
      </div>
      
    </LazyDiv>
  )
}
