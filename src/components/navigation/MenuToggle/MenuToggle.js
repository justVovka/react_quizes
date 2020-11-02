import React from 'react';

import classes from './MenuToggle.css';

const MenuToggle = (props) => {
  let content = '';
  const clss = [classes.MenuToggle];
  if (props.isOpen) {
    clss.push(classes.open);
    content = 'Скрыть меню';
  } else {
    content = 'Открыть меню';
  }
  return (
    <div className={clss.join(' ')} onClick={props.onToggle}>
      {content}
    </div>
  );
};

export default MenuToggle;
