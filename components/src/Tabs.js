'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {Colors} from '../style/';

import RippleContainer from '../components/RippleContainer';

export default class Tabs extends React.Component {

  //constructor(props) {
  //  super(props);
  //}

  render() {
    var props = this.props;
    var styles = TabsStyles;
    var titles = [];
    var children = props.children;
    var selectedTab;
    var selectedIndex = 0;
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var childProps = child.props;
      var tabTitleStyles = [styles.tabTitleStyle];
      if (childProps.selected) {
        tabTitleStyles.push(styles.tabTitleSelectedStyle);
        selectedTab = child;
        selectedIndex = i;
      }
      tabTitleStyles.push({width:(100 / children.length) + '%'});
      titles[i] = <li key={i} styles={tabTitleStyles}>
                    <RippleContainer onClick={(e)=>this.onTabHeaderClick(e)} />
                    {childProps.title}
                  </li>;
    }
    var normalStyles = [styles.normalStyle];
    if (props.styles) {
      normalStyles = normalStyles.concat(props.styles);
    }
    return <div styles={normalStyles}>
      <ul styles={styles.tabTitlesContainerStyle}>
        {titles}
        <div styles={[styles.selectionBarStyle,
                      {
                        width:(100 / children.length) + '%',
                        left: (100 / children.length * selectedIndex) + '%'
                      }
                    ]}/>
      </ul>
      {selectedTab}
    </div>

  }

  onTabHeaderClick(e) {
    var props = this.props;
    if (props.onChange) {
      var position = 0;
      var target = e.target;

      while (target = target.previousSibling) {
        position++;
      }

      // enhance the event with the position of the blind
      e.position = position;
      props.onChange(e);
    }
  }

}

var TabsStyles = StyleSheet.create({
  normalStyle: {
    position: 'relative',
    width: '100%'
  },

  tabTitlesContainerStyle: {
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    backgroundColor: Colors.cyan.P500,
    lineHeight: '48px',
    margin: 0,
    padding: 0,
    height: 48,
    position: 'relative',
    cursor: 'pointer',
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    boxShadow: '0px 3px 2px rgba(0, 0, 0, 0.2)'
  },

  tabTitleStyle: {
    height: '100%',
    display: 'inline-block',
    textAlign: 'center',
    userSelect: 'none',
    position: 'relative',
    overflow: 'hidden',
    opacity: '.6',
    transition: 'opacity .38s linear'
  },

  tabTitleSelectedStyle: {
    opacity: '1'
  },

  selectionBarStyle: {
    backgroundColor: Colors.yellow.A100,
    height: 2,
    transition: 'left .28s linear',
    position: 'absolute',
    bottom: 0
  }
});
