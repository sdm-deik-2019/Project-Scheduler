import DynamicTable from '@atlaskit/dynamic-table';
import React from 'react';
import Avatar from '@atlaskit/avatar';
import {ButtonGroup} from "@atlaskit/button";
import Button from "@atlaskit/button/dist/cjs/components/Button";

export default class EventList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    this.update();
  }

  deleteEventAndUpdate(ev) {
    this.props.deleteEvent(ev);
    this.update();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.update !== this.props.update) {
      this.update();
    }
  }

  update = () => {
    this.setState({
      rows: this.createRows(this.props.events)
    });
  };

  createRows(eventList) {
    return eventList.map((event, index) => ({
      key: `row-${index}-${event.id}`,
      cells: [
        {
          content: event.date.toISOString().substring(0, 10)
        },
        {
          content: event.title,
        },
        {
          content: (
            <Avatar
              name={event.date}
              size="medium"
              src={`https://api.adorable.io/avatars/24/1.png`}
            />
          ),
        },
        {
          content: event.description,
        },
        {
          content: (
            <ButtonGroup>
              <Button
                value={event}
                onClick={() => { this.props.editEvent(event) }}
              >Edit</Button>
              <Button
                value={event}
                onClick={() => { this.deleteEventAndUpdate(event) }}
              >Delete</Button>
            </ButtonGroup>
          ),
        },
      ],
    }))
  }

  render() {
    return (
      <section style={{marginBottom: '10px'}}>
        <DynamicTable rows={this.state.rows} />
      </section>
    );
  }
}
