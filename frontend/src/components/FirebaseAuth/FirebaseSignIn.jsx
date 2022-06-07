import firebaseApp from "../../firebaseInit";

import { useState } from "react";
import { getAuth } from 'firebase/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const auth = getAuth(firebaseApp);

const FirebaseSignIn = () => {
  const [modalShow, setModalShow] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const openModal = () => {
    setModalShow('modal-display');
  };

  const closeModal = () => {
    setModalShow('modal-hide');
  };

  return (
    <div>
      <button onClick={ openModal }>Sign in</button>

      <div id="myModal" className={`modal ${modalShow}`}>

        <div className="modal-content">
          <span onClick={ closeModal } className="close">&times;</span>

          <h3>Sign in</h3>

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
            signInWithEmailAndPassword(email, password);
            closeModal();
          }}>Sign in</button>
          
        </div>

      </div>
    </div>
  )
}
export default FirebaseSignIn