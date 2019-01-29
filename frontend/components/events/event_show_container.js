import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchEvent } from '../../actions/events_actions';
import EventShow from './event_show';

const mapStateToProps = (state, ownProps) => {
  // let event = [];

  // if (state.entities.events[ownProps.match.params.eventId]) {
    event = state.entities.events[ownProps.match.params.eventId];
  // }

  return ({
  eventId:ownProps.match.params.eventId,
  event: event,
  currentUser: state.session.currentUser,
})
};

const mapDispatchToProps = dispatch => ({
  fetchEvent: id => dispatch(fetchEvent(id)),
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventShow);
