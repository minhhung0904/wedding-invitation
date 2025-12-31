import { Cover } from "./component/cover"
import "./App.scss"
import { LazyDiv } from "./component/lazyDiv"
import { useEffect } from "react"

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(
          "https://wedding-invitation-ht.onrender.com/banner",
        )
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, []) // Chạy chỉ 1 lần khi component được render lần đầu

  return (
    // <Router>
    <div className="background">
      <div className="card-view">
        <LazyDiv className="card-group">
          <Cover />
        </LazyDiv>
      </div>
    </div>
  )
}

export default App
