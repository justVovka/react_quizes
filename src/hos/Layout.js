import React, { Component } from 'react';
import Drawer from '../components/navigation/Drawer/Drawer';
import MenuToggle from '../components/navigation/MenuToggle/MenuToggle';

import classes from './Layout.css';

// import './Layout.css';

export default class Layout extends Component {
  state = {
    menu: false,
  };
  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  menuCloseHandler = () => {
    this.setState({
      menu: false,
    });
  };
  render() {
    return (
      <div className={classes.Layout}>
        <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main className={classes.Layout.main}>{this.props.children}</main>
      </div>
    );
  }
}
