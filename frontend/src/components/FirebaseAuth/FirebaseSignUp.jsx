import firebaseApp from "../../firebaseInit";

import { useState } from "react";
import { getAuth } from 'firebase/auth';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

const auth = getAuth(firebaseApp);

const FirebaseSignUp = () => {
  const [modalShow, setModalShow] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const openModal = () => {
    setModalShow('modal-display');
  };

  const closeModal = () => {
    setModalShow('modal-hide');
  };

  return (
    <div>
      <button onClick={ openModal }>Sign up</button>

      <div id="myModal" className={`modal ${modalShow}`}>

        <div className="modal-content">
          <span onClick={ closeModal } className="close">&times;</span>

          <h3>Sign up</h3>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
                   

          <button onClick={() => {
            createUserWithEmailAndPassword(email, password);
            closeModal();
          }}>Sign up</button>
          
        </div>

      </div>
    </div>
  )
}
export default FirebaseSignUp