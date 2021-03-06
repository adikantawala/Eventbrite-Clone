import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {ClipLoader} from 'react-spinners';


class EventShow extends React.Component {
  constructor(props){
    super(props);
    this.loggedInCheck = this.loggedInCheck.bind(this)
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.eventId);
    window.scrollTo(0,0);

  }

  componentWillUnmount() {
    this.props.closeModal()
  }

  componentDidUpdate(prevProps){
    if (prevProps.eventId !== this.props.eventId) {
      this.props.fetchEvent(this.props.eventId)

    }
    window.scrollTo(0,0);
  }

  getWordDay(num){
    switch (num) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      default:
        break;
  }
}

  getEventMonth(monthNum) {
    switch (monthNum) {
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Apr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Aug';
      case 8:
        return 'Sept';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';
      default:
        break;
    }
  }


  // switchHeart(e){
  //   e.preventDefault();
  //   let heart_state = e.target;
  //
  //   if (heart_state.classList.contains("heart-show")){
  //     heart_state.classList.remove("heart-show");
  //     heart_state.classList.add("liked-heart-show");
  //   } else {
  //     heart_state.classList.remove("liked-heart-show");
  //     heart_state.classList.add("heart-show");
  //   }
  // }

  loggedInCheck(){
    if (!this.props.currentUser){
      // setTimeout(() => window.alert("Please log in to purchase ticket"), 100);
      let div = document.getElementById('error');
        div.innerHTML = "Please log in to purchase ticket";
        div.style.display = "block";
        div.style.opacity = "1";
        // div.classList.add("error-message2");
        setTimeout(() => {
          div.style.display = "none";
          div.style.opacity = "0";
          // div.classList.remove("error-message2");
        }, 2000);
    } else {
      this.props.openModal('ticket', {eventsProps:this.props})
    }
  }


  render() {
    if (!this.props.event) return null;

    let event = this.props.event
    let event_date = new Date(this.props.event.event_date)
    let month = this.getEventMonth(event_date.getMonth())
    let day = this.getWordDay(event_date.getDay())
    let url = event.image_url
    let price = event.ticket_price
    let dollar = price.split(".")[0]
    let cents = price.split(".")[1]
    if (cents.length < 2){
      cents += "0"
    }
    price = dollar + "." + cents
    const addressQuery = "https://www.google.com/maps/embed/v1/place?key=" + window.googleAPIKey + "&q="
      + this.props.event.location.split(" ").join("+");

    const googleMap =
    <div className="event-show-map">
      <iframe
        style={{width: "100%", height: "100%", frameBorder: "0"}}
        src={addressQuery}>
      </iframe>
    </div>

    return (
      <div className="parent-container-show"> <div className="parent-container-overlay">
      <div className="event-info">
        <div className="event-info-header">
          <img className="event-header-pic" src={url}>
          </img>
          <div className="event-title-date">
            <div className="month-day-padding">
              <div className="listing-month">
                {month}
              </div>
              <div className="listing-day">
                {event_date.getDate()}
              </div>
            </div>
            <h1 className="listing-title">
              {event.title}
            </h1>
            <div className="listing-creator">
              By: {event.creator.first_name} {event.creator.last_name}
            </div>
            <div className="listing-price">
              ${price}
            </div>
          </div>
        </div>

        <div className="event-show-bar">
          <div onClick={this.switchHeart} className="heart-show"></div>
          <div className="hella-test">
          <div id="error" className="error-message1"></div>
          <button className="session-submit" onClick={() => this.loggedInCheck()}>
            Register
          </button>
          </div>
        </div>

        <div className="left-over">
          <div className="event-show-desc">
          <p className="event-show-desc-titles">DESCRIPTION</p>
          <p className="event-show-desc-words">{event.description}</p>
          </div>
          <div className="event-show-date-time-loc">
            <div className="event-show-date-time">
              <p className="event-show-desc-titles">DATE AND TIME</p>
              <p className="event-show-desc-dl-words-np">{day}, {month} {event_date.getDate()}</p>
              <p className="event-show-desc-dl-words">{event_date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
            </div>
            <div className="event-show-loc">
              <p className="event-show-desc-titles">LOCATION</p>
              <p className="event-show-desc-dl-words">{event.location}</p>
            </div>
          </div>
        </div>
        {googleMap}
      </div>
      </div>
        <div className="hide-blur">
          <img  className="event-show-blurr-pic" src={url}>
          </img>
        </div>
        <div className="hide-blur-2">
        </div>
      </div>
    );
  }
};

export default EventShow;
