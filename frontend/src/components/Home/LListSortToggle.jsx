import { useDispatch, useSelector } from "react-redux";
import { sortLlistNewest, sortLlistOldest } from "../../features/llist/llistSlice";

const LListSortToggle = () => {
  const dispatch = useDispatch();
  const sortState = useSelector(state => state.llist.llistSort);

  if (sortState === 'newest') {
    return (
      <div>
        <button onClick={() => dispatch(sortLlistOldest())}>Sort by oldest</button>
      </div>
    );
  };
  
  if (sortState === 'oldest') {
    return (
      <div>
        <button onClick={() => dispatch(sortLlistNewest())}>Sort by newest</button>
      </div>
    );
  };
}
export default LListSortToggle