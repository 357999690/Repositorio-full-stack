import { useState, useEffect } from "react";
import Blog from './components/Blog'
import getAllService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([])
  


  useEffect(() => {
    getAllService.getAll().then(blogs =>
      setBlogs(blogs)
      
      )
  }, [])

console.log(blogs)

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>)}
      {/* {blogs.map(blog => 
        <div>
          <p>{blog.title}</p>
        </div>
      )} */}
      {/* <p>{blogs[0].title}</p> */}
      {/* {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>)} */}
      {/* {blogs.map(blog =>
        <Blog key={blog.id} blog={blog})} */}
    </div>
  )
}

export default App
