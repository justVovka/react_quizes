import React, { Component } from 'react';

import classes from './Drawer.css';
import BackDrop from '../../ui/BackDrop/BackDrop';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Список', exact: true },
  { to: '/auth', label: 'Авторизация', exact: false },
  { to: '/quiz-creator', label: 'Создать тест', exact: false },
];

export default class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    const clss = [classes.Drawer];
    if (!this.props.isOpen) {
      clss.push(classes.close);
    }
    return (
      <React.Fragment>
        <nav className={clss.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}
