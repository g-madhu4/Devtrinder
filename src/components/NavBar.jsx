import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import { removeRequests } from '../utils/RequestsSlice';
import { removeConnectedUsers } from '../utils/ConnectionsSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const eventHandler= async ()=>{
    try{
      await axios.post(BASE_URL + "/logout",{},{withCredentials:true});
      dispatch(removeUser());
      dispatch(removeRequests());
      dispatch(removeConnectedUsers());
      navigate("/login");
      

    }
    catch(err){
    }
  }

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/feed" className="btn btn-ghost text-xl">ChitChat</Link>
        </div>
        {user && (
          <div className="flex gap-2 mx-4">
           <Link to="/user/requests" className="w-10 rounded-full mx-3 flex flex-col justify-center">
                  <img
                    alt="User Avatar"
                    className='rounded-full  '
                    src="https://static.vecteezy.com/system/resources/previews/006/152/368/non_2x/digital-network-connection-icon-and-logo-free-vector.jpg"
                  />
                </Link>
                <Link to="/user/connections" className="w-10 rounded-full mx-3 flex flex-col justify-center">
                  <img
                    alt="User Avatar"
                    className='rounded-full  '
                    src="https://www.shutterstock.com/shutterstock/photos/1410254093/display_1500/stock-vector-quote-icon-vector-logo-illustration-1410254093.jpg"
                  />
                </Link>
            <div className="dropdown dropdown-end">
                 Welcome , {user.firstName}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-3"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user.photoURl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a onClick={eventHandler}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
