import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Cover } from "./component/cover"

import "./App.scss"
import { LazyDiv } from "./component/lazyDiv"
import { useEffect } from "react"
import { CoverNhagai } from './component/cover-nhagai'
import { CoverNhatrai } from './component/cover-nhatrai'

// Giả sử bạn có thêm các component khác cho các trang khác
// import { InvitationDetail } from "./component/invitationDetail"

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch("https://wedding-invitation-ht.onrender.com/banner")
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <Router>
      <div className="background">
        <div className="card-view">
          <Routes>
            {/* Trang chính hiển thị Cover */}
            <Route 
              path="/" 
              element={
                <LazyDiv className="card-group">
                  <Cover />
                </LazyDiv>
              } 
            />
            <Route path="/tranghung" element={
              <LazyDiv className="card-group">
                  <CoverNhagai />
                </LazyDiv>
            } />

            <Route path="/hungtrang" element={
              <LazyDiv className="card-group">
                  <CoverNhatrai />
                </LazyDiv>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App