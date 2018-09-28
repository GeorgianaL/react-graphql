import React from 'react';
import ReactDOM from 'react-dom';

const noAncestry = (child, parent) => {
  if (child !== undefined) {
    let node = child.target.parentNode;
    while (node !== null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return true;
  }
  return false;
}

const WithBox = Component => class WithBoxHOC extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      'boxIsOpen': false,
    };

    // refs
    this.root = null;

    this.openBox = this.openBox.bind(this);
    this.closeBox = this.closeBox.bind(this);
    this.autoclose = this.autoclose.bind(this);
  }

  componentWillUnmount() {
    this.detachEvent();
  }

  openBox() {
    this.autoclose();
    this.setState({ 'boxIsOpen': true }, this.attachEvent);
  }

  closeBox() {
    this.setState({ 'boxIsOpen': false }, this.detachEvent);
  }

  autoclose(ev) {
    if (noAncestry(ev, ReactDOM.findDOMNode(this.root))) {
      this.closeBox();
    }
  }

  attachEvent() {
    document.addEventListener('click', this.autoclose);
  }

  detachEvent() {
    document.removeEventListener('click', this.autoclose);
  }

  render() {
    return (
      <div ref={ref => this.root = ref}>
        <Component
          {...this.props}
          boxIsOpen={this.state.boxIsOpen}
          openBox={this.openBox}
          closeBox={this.closeBox}
        />
      </div>
    );
  }
};

export default WithBox;
