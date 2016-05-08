import React from 'react';
import styles from './Display.css';

export default class Display extends React.Component {

  static get propTypes() {
    return {
      displayNum: React.PropTypes.number.isRequired
    };
  }

  // static get defaultProps() {
  //   return  {
  //     initialCount: 0
  //   };
  // }

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    const {displayNum} = this.props;
  }

  render() {
    return (
      <div className={styles.display}>{this.props.displayNum}</div>
    )
  }
}

// Display.propTypes = { displayNum: React.PropTypes.number };