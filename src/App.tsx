import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { Cover } from "./component/cover"
import { Location } from "./component/location"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { GuestBook } from "./component/guestbook"
import { LazyDiv } from "./component/lazyDiv"
import { ShareButton } from "./component/shareButton"
import { STATIC_ONLY } from "./env"

function App() {
  return (
    <Router>
      <div className="background">
        {/* <BGEffect/> */}
        <div className="card-view">
          <LazyDiv className="card-group">
            <Cover />
          </LazyDiv>

          <LazyDiv className="card-group">
            <Invitation />
          </LazyDiv>

          <LazyDiv className="card-group">
            <Calendar />
          </LazyDiv>

          <LazyDiv className="card-group">
            <Gallery />
          </LazyDiv>

          <LazyDiv className="card-group">
            <Location />
          </LazyDiv>

          <LazyDiv className="card-group">
            {!STATIC_ONLY && <GuestBook />}
          </LazyDiv>

          <ShareButton />
        </div>
      </div>
    </Router>
  )
}

export default App
