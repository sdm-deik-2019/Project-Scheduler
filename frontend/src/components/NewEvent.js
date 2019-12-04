import React, {Component} from 'react';
import Button from '@atlaskit/button';
import Select from '@atlaskit/select';
import {Checkbox} from '@atlaskit/checkbox';
import Textfield from '@atlaskit/textfield';
import UserPicker from '@atlaskit/user-picker';
import ModalDialog, {ModalFooter, ModalTransition,} from '@atlaskit/modal-dialog';
import {HelperMessage} from '@atlaskit/form';
import {DatePicker, TimePicker} from "@atlaskit/datetime-picker";
import {gridSize} from '@atlaskit/theme';
import {Label} from "@atlaskit/field-base";
import {Editor} from '@atlaskit/editor-core'
import {JIRATransformer} from '@atlaskit/editor-jira-transformer'

const weeklyRepeat = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'Sunday' },
];

const monthlyRepeat = [
  { label: 'Exact date', value: 'exactDate' },
  { label: 'xth week\'s exact day', value: 'xthWeek' },
];

const repeatOptions = [
  { label: 'Does not repeat', value: 'no' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 1,
      clear: "left",
    }}
  />
);

export default class NewEvent extends Component {
  state = { isOpen: false };

  handleChange = (newValue, actionMeta) => {
    console.log(newValue);

    this.setState({ repeat: newValue });
    if(newValue === repeatOptions[2]){
      this.setState({ selectOption: weeklyRepeat});
      this.setState({ showSelect: true});
      this.setState({ secondaryRepeat: undefined });
    } else if(newValue === repeatOptions[3]){
      this.setState({ selectOption: monthlyRepeat});
      this.setState({ showSelect: true});
      this.setState({ secondaryRepeat: undefined });
    } else {
      this.setState({ selectOption: undefined});
      this.setState({ showSelect: false})
      this.setState({ secondaryRepeat: undefined });
    }
  };

  open = () => {
    if (this.props.eventForEdit !== null) {
      let event = this.props.eventForEdit;
      this.setState({
        isOpen: true,
        eventName: event.title,
        dateFrom: event.date,
        dateTo: event.date,
        content: event.description
      });
    } else {
      this.setState({
        isOpen: true,
        eventName: undefined,
        dateFrom: new Date(),
        dateTo: new Date(),
        content: ""
      });
    }
  };

  close = () => {
    this.props.editEvent(null);
    this.setState({
      isOpen: false
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.eventForEdit !== this.props.eventForEdit && this.props.eventForEdit !== null) {
      this.open();
    }
  }

  saveEvent = () => {
    let ev = {
      title: this.state.eventName,
      date: new Date(this.state.dateFrom),
      description: this.state.content
    };
    if (this.props.eventForEdit !== null) {
      ev.id = this.props.eventForEdit.id;
    } else {
      ev.id = undefined;
    }
    this.props.saveEvent(ev);
    this.close();
  };

  constructor(props) {
    super(props);
    this.state = {
      eventName: undefined,
      showSelect: false,
      selectOption: undefined,
      repeat: undefined,
      secondaryRepeat: undefined,
      dateFrom: new Date(),
      dateTo: new Date(),
      timeFrom: "00:00",
      timeTo: "00:00",
      allDay: false,
      content: ""
    };
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <Button onClick={this.open} appearance={'primary'}>New event</Button>

        <ModalTransition
          width={"large"}
          height={"large"}>
          {isOpen && (
            <ModalDialog
              width={"large"}
              height={"large"}
              heading="Create Event"
              onClose={this.close}
            >
              <Label label="Event name" isRequired/>
              <Textfield width="medium" value={this.state.eventName} autoFocus onChange= {(e) => this.setState({eventName: e.target.value})}/>
              <Label htmlFor="react-select-datepickerFrom--input" label="Event date" isRequired/>
              <div id="Dates" style={{ display: 'flex'}}>
                <DatePicker id="dateFrom" hideIcon dateFormat="MMM DD,YYYY"
                  value={this.state.dateFrom} onChange={value => this.setState({dateFrom: value})}
                  innerProps={{ style: { width: gridSize() * 15 } }}
                />
                <TimePicker
                  isDisabled={this.state.allDay}
                  value={this.state.timeFrom}
                  id ="timeFrom"
                  onChange={value => this.setState({timeFrom: value})}
                  selectProps={{ classNamePrefix: 'timepicker-select' }}
                  innerProps={{ style: { width: gridSize() * 10, marginLeft: gridSize(), marginRight: gridSize() }}}
                />
                <p>to</p>
                <TimePicker
                  isDisabled={this.state.allDay}
                  initialValue="00:00"
                  value={this.state.timeTo}
                  id="timeTo"
                  onChange={value => this.setState({timeTo: value})}
                  selectProps={{ classNamePrefix: 'timepicker-select' }}
                  innerProps={{ style: { width: gridSize() * 10, marginLeft: gridSize(), marginRight: gridSize() }}}/>

                <DatePicker id="dateTo" hideIcon dateFormat="MMM DD,YYYY" value={this.state.dateTo}
                  onChange={value => this.setState({dateTo: value})}
                  innerProps={{ style: { width: gridSize() * 15 } }}/>
              </div>

              <div  style={{overflow: 'ellipsis', margin: gridSize()}} >
                <div style={{width: '15%', float:'left' }}>
                  <Checkbox name="All day" label={"All day"}
                    value={this.state.allDay}
                    onChange={(event => this.setState({allDay: !this.state.allDay}))}>
                  </Checkbox>
                </div>
                <div style={{ width: '30%', float:'left', marginBottom: gridSize()}}>
                  <Select
                    onChange={this.handleChange}
                    options={repeatOptions}
                    value={this.state.repeat}
                  />
                </div>
                <div style={{ width: '30%', float:'left', hidden:'true', marginLeft: gridSize()}}>
                  { this.state.showSelect&&
                      <Select
                        options={this.state.selectOption}
                        className="single-select"
                        onChange={value => this.setState({secondaryRepeat: value})}
                        value={this.state.secondaryRepeat}
                      />}
                </div>
              </div>
              <br/>

              <ColoredLine color={"grey"}/>

              <Label label="Project" isRequired/>
              <div style={{ width: '35%'}}>
                <Select
                  className="single-select"
                />
              </div>
              <Label label="Participants"/>
              <UserPicker
                fieldId="example"
                isMulti
              />
              <HelperMessage>
                Begin typing to find users or press down to select a suggested user
              </HelperMessage>
              <div style={{ marginTop: gridSize() * 3}}>
                <Editor
                  contentTransformerProvider={schema => new JIRATransformer(schema)}
                  defaultValue={this.state.content}
                />
              </div>
              <div style={{ float:"right"}}>
                <ModalFooter float={"left"}>
                  <Checkbox
                    value="Basic checkbox"
                    onChange={this.onChange}
                    name="checkbox-basic"
                    label={"Create another"}
                  />
                  <Button
                    onClick={() => { this.saveEvent() }}
                    appearance={'primary'}
                  >Create / Save</Button>
                  <Button onClick={this.close}>Cancel</Button>
                </ModalFooter>
              </div>
            </ModalDialog>
          )}
        </ModalTransition>
      </div>
    );
  }
}