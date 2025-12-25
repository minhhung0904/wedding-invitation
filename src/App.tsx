import { Cover } from "./component/cover"
import "./App.scss"
import { LazyDiv } from "./component/lazyDiv"

function App() {
  return (
    // <Router>
      <div className="background">
        <div className="card-view">
          <LazyDiv className="card-group">
            <Cover/>
          </LazyDiv>
        </div>
      </div>
  )
}

export default App
