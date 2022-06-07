import firebaseApp from "../../../firebaseInit";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

import EditL from "./EditL";
import DeleteL from "./DeleteL";
import LItemContent from "./LItemContent";

const auth = getAuth(firebaseApp);

const LItem = ({LData}) => {
  const [user, userLoading, userError] = useAuthState(auth); 

  let LItemLocal = new Date(LData.l_date);

  let userUidLocal = LData.l_uid;
  let userUid;

  try {
    userUid = user.uid;
  } catch(error) {
    userUid = "";
  }

  if (userLoading) {
    return <div>Loading auth...</div>;
  }

  if (userUid === userUidLocal) {
    return (
      <div className='l-item'>
        <h3>{LData.l_text}</h3>
        <p>{`${LItemLocal.toLocaleDateString()}, ${LItemLocal.toLocaleTimeString()}`}</p>
        <LItemContent LData={LData} />
        <div>
          <EditL LData={LData} />
          <DeleteL LData={LData} />
        </div>
      </div>
    )
  }

  return (
    <div className='l-item'>
      <h3>{LData.l_text}</h3>
      <p>{`${LItemLocal.toLocaleDateString()}, ${LItemLocal.toLocaleTimeString()}`}</p>
      <LItemContent LData={LData} />
    </div>
  )
}
export default LItem