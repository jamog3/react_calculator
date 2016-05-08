import React from 'react';
import styles from './Display.css';

export default class Display extends React.Component {

  static get propTypes() {
    return {
      displayNum: React.PropTypes.number.isRequired,
      calcType: React.PropTypes.string
    };
  }

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    const {displayNum, calcType} = this.props;
  }

  render() {
    return (
      <div className={styles.display}>
        <div className={styles.display__calcType}>
          {this.props.calcType}
        </div>
        <div className={styles.display__inr}>
          {this.props.displayNum}
        </div>
      </div>
    )
  }
}
