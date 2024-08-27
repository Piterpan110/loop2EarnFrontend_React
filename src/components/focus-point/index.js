import React from 'react';
import './styles.scss';
import edit from '../../assets/image/Frame 1000003654.png';
import save from '../../assets/image/Frame 1000003663.png';
import del from '../../assets/image/Frame 1000003660.png';
import user2 from '../../assets/image/users-02.png';
import fizz from '../../assets/image/FIZZ.png';

import EditModal from '../modal';

const FocusPoint = ({ title, description, onEdit, onDelete }) => {
  const [isOpenEModal, setOpenEModal] = React.useState(false);
  return (
    <React.Fragment>
      <div className="focuspoint">
        <div>{title}</div>
        <div>
          <span>{description}</span>
        </div>
        <button className="user">
          <img src={user2} alt=""></img>
          1234
        </button>
        <button className="fizz">
          <img src={fizz} alt=""></img>1010
        </button>
        <img src={edit} alt="" className="edit" onClick={onEdit}></img>
        <img src={save} alt="" className="save" onClick={onDelete}></img>
        <img src={del} alt="" className="del"></img>
      </div>
      {isOpenEModal && <EditModal onClose={() => setOpenEModal(false)} />}
    </React.Fragment>
  );
};

export default FocusPoint;
