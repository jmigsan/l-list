import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editL } from '../../../features/llist/llistSlice';

const EditL = ({LData}) => {

  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState('');
  const [LDataLocal, setLDataLocal] = useState({
      l_id: LData.l_id,
      l_text: LData.l_text,
      l_content: LData.l_content,
    }
  );

  const openModal = () => {
    setModalShow('modal-display');
  };

  const closeModal = () => {
    setModalShow('modal-hide');
  };

  return (
    <div>
      <button onClick={ openModal }>Edit</button>

      <div id="myModal" className={`modal ${modalShow}`}>

        <div className="modal-content">
          <span onClick={ closeModal } className="close">&times;</span>
          
          <input type="text" value={LDataLocal.l_text} onChange={(e) => setLDataLocal({...LDataLocal, l_text: e.target.value})} />
          <button onClick={() => {
            dispatch(editL(LDataLocal));
            closeModal();
          }}>Edit</button>
          
        </div>

        

      </div>
    </div>
  )
}

export default EditL