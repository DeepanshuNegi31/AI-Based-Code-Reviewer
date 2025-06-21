import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
import Login from './Login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`)
  const [review, setReview] = useState(``)

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:3000/ai/get-review', 
        { code },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
      if (error.response?.status === 401) {
        setIsAuthenticated(false)
        localStorage.removeItem('token')
      }
      setReview("Error fetching review. Check console logs.");
    }
  }

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />
  }

  return (
    <>
      <main>
        <div className="header">
          <button 
            className="logout-button"
            onClick={() => {
              localStorage.removeItem('token')
              setIsAuthenticated(false)
            }}
          >
            Logout
          </button>
        </div>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <Markdown
            rehypePlugins={[rehypeHighlight]}
          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}

export default App
