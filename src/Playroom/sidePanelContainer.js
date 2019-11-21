import React, { Component } from 'react';
import { concat, dropRight, last } from 'lodash';
import SidePanel from '@splunk/react-ui/SidePanel';
import Button from '@splunk/react-ui/Button';
import ChevronLeft from '@splunk/react-icons/ChevronLeft';

class SidePanelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStack: ['home'],
      currentPage: 'home'
    };
  }

  onPageChange = pageName => {
    const { currentPage, pageStack } = this.state;
    if (pageName !== currentPage) {
      const newStack = concat(pageStack, pageName);
      this.setState({ pageStack: newStack, currentPage: pageName });
    }
  };

  goBack = () => {
    const { pageStack } = this.state;
    // check stack status
    if (pageStack.length < 1) {
      console.error("no page in stack: shouldn't be here");
    } else if (pageStack.length === 1) {
      this.props.closePanel();
    } else {
      const newStack = dropRight(pageStack);
      this.setState({ pageStack: newStack, currentPage: last(pageStack) });
    }
  };

  render() {
    const { panelOpen, renderContent } = this.props;
    return (
      <SidePanel
        open={panelOpen}
        dockPosition="right"
        onRequestClose={this.props.closePanel}
        innerStyle={{ width: 500 }}
      >
        <Button
          label="back"
          icon={<ChevronLeft screenReaderText={null} />}
          style={{ marginLeft: 5, marginTop: 3 }}
          appearance="pill"
          onClick={this.goBack}
        />
        {renderContent &&
          renderContent(this.state.currentPage, this.onPageChange)}
      </SidePanel>
    );
  }
}

export default SidePanelContainer;
