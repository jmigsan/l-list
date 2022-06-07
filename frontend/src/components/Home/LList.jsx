import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLlist, clearLlist } from "../../features/llist/llistSlice";
import LItem from './LItem/LItem';

const LList = () => {
  const dispatch = useDispatch();
  const { llist, isError, isLoading, message, isUploading, isDeleting } = useSelector(state => state.llist);

  useEffect(() => {
    if (isError) {
      console.log(message);
    };

    dispatch(getLlist());
    
    return () => {
      dispatch(clearLlist());
    };

  }, [dispatch, isError, message]);

  if (isDeleting) {
    return <div>Deleting...</div>;
  };

  if (isUploading) {
    return <div>Uploading...</div>;
  };

  if (isLoading) {
    return <div>Loading database...</div>;
  };

  return (
    <div>
      {llist.length > 0 ? (
        <div className='center'>
          {llist.map(L => (
          <LItem key={L.l_id} LData={L}/>
          ))}
        </div>
      ) 
      : (<div>peepoSad</div>)}
    </div>
  )


  
}
export default LList