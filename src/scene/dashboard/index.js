import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';

import FocusPoint from '../../components/focus-point';
import EditFocusModal from '../../components/modal';
import Logo from '../../components/logo';
import axios from 'axios';

import FocusPointImg from '../../assets/image/FocusPointImg.png';
import Homepage from '../../assets/image/Homepage.png';
import Logout from '../../assets/image/Logout.png';
import Mystatictis from '../../assets/image/My statistic.png';
import Pricing from '../../assets/image/Pricing.png';
import Profile from '../../assets/image/Profile.png';
import Rewards from '../../assets/image/Rewards.png';
import butmenu from '../../assets/image/menu-04.png';
import points from '../../assets/image/points.png';
import tglogo from '../../assets/image/Telegram logo.png';
import twitter from '../../assets/image/twitter logo.png';
import capLogo from '../../assets/image/Capture.PNG';
import send from '../../assets/image/image 10.png';

import { useNavigate } from 'react-router-dom';
import './styles.scss';

const DashboardPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setGlobalVar('Signup');
    console.log('globalVar from dash to login: ', globalVar);
    navigate('/signup');
  };

  const { globalVar, setGlobalVar } = useContext(GlobalContext);
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [components, setComponents] = React.useState([]);
  const [selectedFocus, setSelectedFocus] = React.useState(false);
  const [title, setTitle] = React.useState('title');
  const [description, setDescription] = React.useState('description');
  const [editingindex, setEditingindex] = React.useState(1);
  const [showMoreState, setShowMoreState] = React.useState(false);
  const [editModalIndex, setEditModalIndex] = React.useState(0);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accesstoken'); // Assume the token is stored in localStorage
        console.log('Retrieved token:', token);

        if (!token) {
          console.error('No access token found. Redirecting to login...');
          // Optionally, redirect to login or show an error
          return;
        }

        const response = await axios.get('http://localhost:5000/focus/load', {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
          }
        });
        const responseData = response.data;
        console.log('responseData:', responseData);

        if (editingindex === 1) {
          const idArray = responseData.map((item) => item.id);
          const numberOfElements = idArray.length + 1;
          console.log('number of elements: ', numberOfElements);
          setEditingindex(numberOfElements);
        }

        if (!(editingindex > 6 && showMoreState === false))
          setComponents(responseData);
        else {
          const newResponseData = responseData.slice(0, 6);
          setComponents(newResponseData);
        }

        console.log('first value of editingindex: ', editingindex);
        console.log('showMore State: ', showMoreState);

        if (responseData.length !== 0) {
          const para = document.getElementById('desc');
          para.classList.add('hidden');
          setOpenModal(false);
        } else {
          setOpenModal(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [editingindex, showMoreState]);

  const handleShow = () => {
    setOpenModal(true);
  };

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSetDesc = (e) => {
    setDescription(e.target.value);
  };

  const handleShowMore = async () => {
    if (editingindex > 6) {
      const token = localStorage.getItem('accesstoken');
      setShowMoreState(!showMoreState);
      const response = await axios.get('http://localhost:5000/focus/load', {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      const responseData = response.data;
      if (showMoreState === true) {
        const newResponseData = responseData.slice(0, 6);
        setComponents(newResponseData);
      } else setComponents(responseData);
      if (responseData.length !== 0) {
        const para = document.getElementById('desc');
        para.classList.add('hidden');
        setOpenModal(false);
      } else {
        setOpenModal(false);
      }
    }
    console.log('showMore State: ', showMoreState);
  };

  const handleEdit = async (index) => {
    //seteditingindex(index);
    const accesstoken = localStorage.getItem('accesstoken');
    setSelectedFocus(true);
    setTitle(components[index].title);
    console.log('newTitle: ', components[index].title);
    setDescription(components[index].description);
    console.log('newDescription: ', components[index].description);
    setOpenModal(true);
    console.log('selectedFocus: ', selectedFocus);

    const response = await axios.get('http://localhost:5000/focus/load', {
      headers: {
        Authorization: `Bearer ${accesstoken}` // Include the token in the Authorization header
      }
    });
    const responseData = response.data;
    // Extract array of id numbers from the responseData
    const idArray = responseData.map((item) => item.id);
    const editFocusId = idArray[index];
    setEditModalIndex(editFocusId);
  };

  const handleModalOK = () => {
    console.log('selectedFocus-- ', selectedFocus);
    handleAddFocus();
    setDescription('');
    setTitle('');
    setOpenModal(false);
  };
  // Delete focus function
  const handleDeleteFocus = async (index) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (!confirm) {
      return;
    }

    const token = localStorage.getItem('accesstoken'); // Assume the token is stored in localStorage
    console.log('Retrieved token_delete: ', token);
    handleStartEditing(editingindex);
    console.log('First handle editingindex_del: ', editingindex);

    const response1 = await axios.get('http://localhost:5000/focus/load', {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    const responseData1 = response1.data;
    // Extract array of id numbers from the responseData
    const idArray = responseData1.map((item) => item.id);
    console.log('idArray: ', idArray);

    const deletefocus = {
      id: idArray[index]
    };
    console.log('indexValue: ', index);
    console.log('deletefocus: ', idArray[index]);

    //send delete request
    await axios
      .post('http://localhost:5000/focus/delete', deletefocus)
      .then((response) => {
        console.log('resDATA: ', response.data);
        setEditingindex(editingindex - 1);
        console.log('Decrease by 1 editingindex: ', editingindex);
        if (editingindex < 7) setShowMoreState(false);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log('deletefocus: ', deletefocus);

    //Update focus
    const response2 = await axios.get('http://localhost:5000/focus/load', {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    const responseData2 = response2.data;
    console.log('responseData:', responseData2);
    setComponents(responseData2);

    if (responseData2.length !== 0) {
      const para = document.getElementById('desc');
      para.classList.add('hidden');
      setOpenModal(false);
    } else {
      setOpenModal(false);
    }
  };

  const handleStartEditing = (index) => {
    setEditingindex(index);
  };

  // Add focus function
  const handleAddFocus = async () => {
    const accesstoken = localStorage.getItem('accesstoken');
    console.log(accesstoken);
    handleStartEditing(editingindex);
    console.log('First handle editingindex_add: ', editingindex);
    console.log('Increase by 1 editingindex: ', editingindex);

    if (!selectedFocus) {
      const newfocus = {
        id: editingindex,
        title: title,
        description: description,
        user: 0,
        fizz: 200
      };
      console.log('addNewFocus: ', newfocus);
      await axios
        .post('http://localhost:5000/focus/create', {
          body: JSON.stringify(newfocus)
        })
        .then((response) => {
          console.log('---------');
          console.log(response.data);
          console.log('---------');
          setEditingindex(editingindex + 1);
        })
        .catch((error) => {
          console.error(error);
        });
      console.log('Sending token:', accesstoken);
      console.log('showMore State(add_fun): ', showMoreState);
      if (editingindex < 7) {
        setComponents([...components, newfocus]);
        setShowMoreState(false);
        console.log('show more!');
      }
      if (editingindex > 6 && showMoreState === true) {
        setComponents([...components, newfocus]);
        console.log('show more and more!!!');
      }
    } else {
      //update
      const updateFocuspoints = [...components];
      console.log('editModalIndex: ', editModalIndex);
      const newfocus = {
        id: editModalIndex,
        title: title,
        description: description
      };
      console.log('newEditingFocus: ', newfocus);
      updateFocuspoints[editModalIndex] = newfocus;
      await axios
        .put('http://localhost:5000/focus/edit', {
          body: JSON.stringify(newfocus)
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      const response2 = await axios.get('http://localhost:5000/focus/load', {
        headers: {
          Authorization: `Bearer ${accesstoken}` // Include the token in the Authorization header
        }
      });
      const responseData2 = response2.data;
      setComponents(responseData2);
      //    setComponents(updateFocuspoints);
      setSelectedFocus(false);
    }

    const para = document.getElementById('desc');
    para.classList.add('hidden');
    setOpenModal(false);
  };

  const handleModalCancel = () => {
    setDescription('');
    setTitle('');
    setOpenModal(false);
  };

  return (
    <div>
      <div className="focus-bar">
        <div className="size"></div>
        <div className="btn-container">
          <button className="btn-Focus">
            <img src={Homepage} alt="" />
            <p className="btn-p">Homepage</p>
          </button>
          <button className="btn-Focus">
            <img src={FocusPointImg} alt="" />
            <p className="btn-p">Focus Point</p>
          </button>
          <button className="btn-Focus">
            <img src={Rewards} alt="" />
            <p className="btn-p">Rewards</p>
          </button>
          <button className="btn-Focus">
            <img src={Profile} alt="" />
            <p className="btn-p">Profile</p>
          </button>
          <button className="btn-Focus">
            <img src={Mystatictis} alt="" />
            <p className="btn-p">My statistic</p>
          </button>
          <button className="btn-Focus">
            <img src={Pricing} alt="" />
            <p className="btn-p">Pricing</p>
          </button>
        </div>
        <div className="btn-log">
          <button className="btn-Focus" onClick={handleLogout}>
            <img src={Logout} alt="" />
            <p className="btn-p">Log out</p>
          </button>
        </div>
        <div className="btn-menu">
          <img src={butmenu} alt="" />
        </div>
      </div>

      <div className="dashboard-page">
        <div className="dashboard-back">
          <h1>Your Focus</h1>
          <div className="hr2"></div>
          <div className="hrv"></div>

          <div className="tex-g1">
            <h6>Focus Points</h6>{' '}
            <div className="tex-2">
              <p>12, 254</p>
              <img src={points} alt=" " />
            </div>
          </div>

          <React.Fragment>
            <div className="focus-menu">
              <div className="focus-title">
                <button>In progress</button>
                <button>completed</button>
              </div>
              <div className="focus-main">
                <div className="focus-head">
                  <div className="tex-g">
                    <h6>Focus Points</h6>{' '}
                    <div className="tex-1">
                      <p>12, 254</p>
                      <img src={points} alt=" " />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-add"
                    onClick={() => handleShow()}
                  >
                    + Add new focus point
                  </button>
                </div>
                <div className="hr"></div>
                <div className="focus-field">
                  <p id="desc">
                    No Focus Points added <br />
                    <span>
                      Focus Point to start you Journey towards <br />
                      self-development !
                    </span>
                  </p>
                  {components.map((focuspoint, index) => (
                    <FocusPoint
                      key={index}
                      title={focuspoint.title}
                      description={focuspoint.description}
                      onEdit={() => handleEdit(index)}
                      onDelete={() => handleDeleteFocus(index)}
                    />
                  ))}
                  <button
                    className="morebutton"
                    onClick={() => handleShowMore()}
                    style={{
                      display: editingindex < 8 ? 'none' : 'block'
                    }}
                  >
                    Load More
                  </button>
                </div>
              </div>
            </div>
            {isOpenModal &&
              (!selectedFocus ? (
                <EditFocusModal
                  onCreate={() => handleModalOK()}
                  onClose={() => handleModalCancel()}
                  DescChange={handleSetDesc}
                  TitleChange={handleSetTitle}
                />
              ) : (
                <EditFocusModal
                  title={title}
                  description={description}
                  onCreate={() => handleModalOK()}
                  onClose={() => handleModalCancel()}
                  DescChange={handleSetDesc}
                  TitleChange={handleSetTitle}
                />
              ))}
          </React.Fragment>

          <button
            type="button"
            className="btn-add1"
            onClick={() => handleShow()}
          >
            + Add new focus point
          </button>

          <div className="focusfooter-menu">
            <div className="focusfooter-field">
              <div className="focusfooter-mark">
                <Logo />
                <div>
                  <button className="btn_eff1">contact us</button>
                </div>
              </div>
              <div className="focusfooter-dec">
                <div className="mark-btn">
                  <button className="btn-opa">
                    <img src={tglogo} alt=""></img>
                  </button>
                  <button className="btn-opa">
                    <img src={twitter} alt=""></img>
                  </button>
                </div>
                <p>
                  FAQ <br />
                  Terms & Conditions <br />
                  <span>Founded by:</span>
                </p>
                <div className="mark-img">
                  <img src={capLogo} alt=""></img>
                  <img src={send} alt=""></img>
                </div>
              </div>
            </div>
            <div className="hr1"></div>
            <div className="focusfooter-des">
              © 2023 Design. All right reserves
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
