import { useDispatch } from "react-redux";
import { deleteL } from '../../../features/llist/llistSlice';

const DeleteL = ({LData}) => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(deleteL(LData.l_id))}>Delete</button>
  )
}
export default DeleteL