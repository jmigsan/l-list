import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { createL, uploadContentL } from '../../features/llist/llistSlice'

import firebaseApp from '../../firebaseInit';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth(firebaseApp);

const CreateL = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [file, setFile] = useState(null)
  const [L, setL] = useState({
    l_text: '',
    l_content: '',
  });

  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setL(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const postContent = async (content) => {
    const formData = new FormData();
    formData.append("content", content);

    return dispatch(uploadContentL(formData));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (file != null) {
      let postContentKey = await postContent(file);
      let contentKey = await postContentKey.payload

      let textContentCombinedL = {
        ...L,
        l_content: contentKey
      };

      dispatch(createL(textContentCombinedL)); 
    } else {
      dispatch(createL(L)); 
    };
   
    setL({
      l_text: '',
      l_content: '',
    });
    setFile(null);
  };

  const hiddenFileInput = useRef(null);
  const handleFileUploadClick = e => {
    hiddenFileInput.current.click();
  };

  if (user) {
    return (
      <div className='createLForm'>
        <form onSubmit={ onSubmit }>
          <input
            type="text"
            placeholder="post your L"
            name="l_text"
            value={ L.l_text }
            onChange={ handleChange }
          />

          <input 
            type="file" 
            name="l_content"
            onChange={ event => setFile(event.target.files[0]) } 
            accept="image/png, image/jpeg, image/gif, video/mp4" 
            style={{ display: "none" }}
            ref={ hiddenFileInput }
          />

          <button type='button' onClick={handleFileUploadClick}>
            { file ? 'Change file' : 'Upload image or video' }
          </button>
 
          <button type="submit">Create L</button>
        </form>
      </div>
    )
  }
  
}
      
export default CreateL