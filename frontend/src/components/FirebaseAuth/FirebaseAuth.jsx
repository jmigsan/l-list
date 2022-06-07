import firebaseApp from "../../firebaseInit";

import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import FirebaseSignIn from "./FirebaseSignIn"; 
import FirebaseSignUp from "./FirebaseSignUp";

const auth = getAuth(firebaseApp);

const FirebaseAuth = () => {
  const [user, loading, error] = useAuthState(auth);

  if (!user) {
    return (
      <div className="float-right">
        <FirebaseSignIn />
        <FirebaseSignUp />
      </div>
    )
  };

  if (user) {
    return (
      <div>
        <div>{user.email}</div>
        <button onClick={() => signOut(auth)}>Sign out</button>
      </div>
    )
  };
}
export default FirebaseAuth