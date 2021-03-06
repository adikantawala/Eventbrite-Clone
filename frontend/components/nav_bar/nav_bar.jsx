import React from 'react';
import { Link } from 'react-router-dom';
import {HashLink} from 'react-router-hash-link'


const NavBar = ({ currentUser, logout }) => {

  const sessionLinks = () => (
    <nav className="nav">
      <li><Link to="/" style={{ textDecoration: 'none' }}>Browse Events</Link></li>
      <li><Link to="/login" style={{ textDecoration: 'none' }}>Log In</Link></li>
      <li><Link to="/signup" style={{ textDecoration: 'none' }}>Sign Up</Link></li>
    </nav>
  );

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  }

  const personalGreeting = () => (
  <nav className="nav">
    <div className="positioning-padding">
      <li><HashLink className="browse" to="/#browseEvents" style={{ textDecoration: 'none' }}>Browse Events</HashLink></li>
    </div>

    <div className="positioning-padding">
      <li><Link to="/events/new" className="create-event" >Create Event</Link></li>
      </div>



      <li className="dropdown">
      <img className="profile-icon" src={window.images.profile_icon} />
      <div className="drop-down-parent">
      <div className="dropdown-content">
          <HashLink to="/myprofile#tickets">Tickets</HashLink>
          <HashLink to="/myprofile#createdEvents">Created Events</HashLink>
          <div className="positioning-padding">
          <a className="logout" onClick={handleClick}>Log Out</a>
          </div>
      </div>
      </div>


      </li>

  </nav>
  );
  // const personalGreeting = () => (
  //   <hgroup className="header-group">
  //     <h2 className="header-name">Hi, {currentUser.email}!</h2>
  //     <button className="header-button" onClick={logout}>Log Out</button>
  //   </hgroup>
  // );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default NavBar;
