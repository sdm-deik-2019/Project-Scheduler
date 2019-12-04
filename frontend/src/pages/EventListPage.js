import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ContentWrapper from '../components/ContentWrapper';
import EventList from '../components/EventList';
import NewEvent from '../components/NewEvent';
import PageTitle from '../components/PageTitle';

export default class EventListPage extends Component {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
  };

  deleteEvent = (ev) => {
    const events = this.state.events;
    let index = events.indexOf(ev);
    if (index > -1) {
      events.splice(index, 1);
    }
    this.setState({
      events: events
    });
  };

  saveEvent = (ev) => {
    if (ev.id === undefined) {
      let events = this.state.events;
      let maxId = Math.max.apply(Math, events.map(x => x.id));
      ev.id = maxId + 1;
      events.push(ev);
      this.setState({
        events: events,
        update: !this.state.update
      });
    } else {
      let events = this.state.events;
      let foundEvent = events.find(x => x.id === ev.id);
      if (foundEvent !== undefined) {
        foundEvent.title = ev.title;
        foundEvent.date = ev.date;
        foundEvent.description = ev.description;
      }
      this.setState({
        events: events,
        update: !this.state.update
      });
    }
    console.log(this.state.events);
  };

  editEvent = (ev) => {
    this.setState({
      eventForEdit: ev
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      events: [
        {
          id: 1,
          date: new Date(2018, 11, 24, 10, 33, 30, 0),
          title: 'Kick-off meeting',
          description: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        },
        {
          id: 2,
          date: new Date(2019, 11, 24, 10, 33, 30, 0),
          title: 'Kick-off meeting',
          description: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        },
        {
          id: 3,
          date: new Date(2017, 11, 24, 10, 33, 30, 0),
          title: 'Kick-off meeting',
          description: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        },
        {
          id: 4,
          date: new Date(),
          title: 'Kick-off meeting',
          description: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        },
      ],
      eventForEdit: null,
      update: false
    };
  }

  render() {
    return (
      <ContentWrapper>
        <PageTitle>Demo Schedule</PageTitle>
        <NewEvent
          events={this.state.events}
          eventForEdit={this.state.eventForEdit}
          editEvent={this.editEvent}
          saveEvent={this.saveEvent} />
        <EventList
          events={this.state.events}
          update={this.state.update}
          deleteEvent={this.deleteEvent}
          editEvent={this.editEvent} />
      </ContentWrapper>
    );
  }
}
