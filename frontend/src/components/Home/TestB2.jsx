// from this kind man:
// https://github.com/Sam-Meech-Ward/image-upload-s3
// frontend in frontend/App.js, backend in backend/server.js 

import { useState } from 'react'
import axios from 'axios'

const postImage = async (content) => {
  const formData = new FormData();
  formData.append("content", content)

  const result = await axios.post('api/llist/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}

const TestB2 = () => {
  
  const [file, setFile] = useState()
  const [contents, setContents] = useState([])

  const submit = async event => {
    event.preventDefault();
    const result = await postImage(file);
    setContents([result, ...contents]);
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input onChange={event => setFile(event.target.files[0])} type="file" accept="image/png, image/jpeg, image/gif, video/mp4" />
        <button type="submit">Submit</button>
      </form>

      { contents.map((content) => {

        if (content.includes('.mp4')) {
          return (
            <video key={content} src={`api/llist/upload/${content}`} controls />
          )
        } else if (content.includes('.png')) {
          return (
            <img key={content} src={`api/llist/upload/${content}`} />
          )
        } else if (content.includes('.jpg')) {
          return (
            <img key={content} src={`api/llist/upload/${content}`} />
          )
        } else if (content.includes('.gif')) {
          return (
            <img key={content} src={`api/llist/upload/${content}`} />
          )
        }

      })}
    </div>
  )
}
export default TestB2