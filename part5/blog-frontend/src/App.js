import { useState, useEffect} from "react";
import Blog from './components/Blog'
import getAllService from "./services/blogs";
import login from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErroMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  


  useEffect(() => {
    getAllService.getAll().then(blogs =>
      setBlogs(blogs)
      
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      getAllService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErroMessage('Wrong credentials')
      setTimeout(() => {
        setErroMessage(null)
      }, 5000)
    }
  }

  const handleCreate = (event) => {
    event.preventDefault()
    
    // const newBlog = {
    //   title: title,
    //   author: author,
    //   url: url,
    // }
    getAllService.create()

    // getAllService
    //   .create(newBlog)
    //   .then(returnedBlog => {
    //     setBlogs(blogs.concat(returnedBlog))
    //     setTitle('')
    //     setAuthor('')
    //     setUrl('')
    //   })
  }
  

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

return(
  <div>

    <Notification message={errorMessage}/>

    {user === null ?
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({target}) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div> :
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            title:
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({target}) => setTitle(target.value)}
                />
          </div>
          <div>
            author:
              <input
                type="text"
                value={author}
                name="Author"
                onChange={({target}) => setAuthor(target.value)}/>
          </div>
          <div>
            url:
              <input
                type="text"
                value={url}
                name="Url"
                onChange={({target}) => setUrl(target.value)}/>

          </div>
          <button type="submit">create</button>
        </form>

        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>)}
      </div>}
  </div>
)

  // return (
  //   <div>
  //     {}
  // //     <h2>blogs</h2>
  // //     {blogs.map(blog =>
  // //       <Blog key={blog.id} blog={blog}/>)}
  //     {/* {blogs.map(blog => 
  //       <div>
  //         <p>{blog.title}</p>
  //       </div>
  //     )} */}
  //     {/* <p>{blogs[0].title}</p> */}
  //     {/* {blogs.map(blog =>
  //       <Blog key={blog.id} blog={blog}/>)} */}
  //     {/* {blogs.map(blog =>
  //       <Blog key={blog.id} blog={blog})} */}
  //   </div>
  // )
}

export default App
