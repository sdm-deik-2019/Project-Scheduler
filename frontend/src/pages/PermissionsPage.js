import React, {Component} from 'react';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import Select from '@atlaskit/select';
import {HelperMessage} from "@atlaskit/form";
import Button from "@atlaskit/button/dist/cjs/components/Button";
import {ButtonGroup} from "@atlaskit/button";

export default class HomePage extends Component {
  render() {
    return (
      <ContentWrapper>
        <PageTitle>Project Scheduler - Admin</PageTitle>
        <div style={{width: "100%"}}>
          <p style={{ float:"left", marginRight:"4%"}}> Event Managers </p>
          <div  style={{width: "60%"}}>
            <Select
              isMulti
              className="single-select"
            />
          </div>
        </div>
        <HelperMessage>
          Here you can define users or groups who will have the permission to add new or edit existing events. If the fiend is empty, everyone has permission.
        </HelperMessage>
        <div style={{margin:"0 auto", width:"100%", marginTop: "4%"}}>
          <div style={{marginLeft:"16%"}}>
            <ButtonGroup>
              <Button appearance={'primary'}>Save</Button>
              <Button >Reset</Button>
              <Button >Cancel</Button>
            </ButtonGroup>
          </div>
        </div>
      </ContentWrapper>
    );
  }
}
