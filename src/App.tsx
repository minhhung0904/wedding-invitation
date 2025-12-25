import { Cover } from "./component/cover"
import "./App.scss"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { GuestBook } from "./component/guestbook"
import { LazyDiv } from "./component/lazyDiv"
import { STATIC_ONLY } from "./env"

function App() {
  return (
    // <Router>
      <div className="background">
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
            {!STATIC_ONLY && <GuestBook />}
          </LazyDiv>
        </div>
      </div>
  )
}

export default App
