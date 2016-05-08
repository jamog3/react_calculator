import React from 'react'
import styles from './NumberPad.css';

const numBtn = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default class NumberPad extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      num: '',
      keyType: ''
    };
    this.numInput = this.numInput.bind(this);
    this.otherButton = this.otherButton.bind(this);
  }

  render() {
    return (
      <div>
        <ul className={styles.numberPad}>
          {numBtn.map( (num, i) => {
            return <li className={styles.numberPad__item} onClick={this.numInput} data-num={num} key={i}>{num}</li>;
          })}
          <li className={styles.numberPad__item} onClick={this.otherButton} data-key='+'>＋</li>
          <li className={styles.numberPad__item} onClick={this.otherButton} data-key='-'>−</li>
          <li className={styles.numberPad__item} onClick={this.otherButton} data-key='*'>×</li>
          <li className={styles.numberPad__item} onClick={this.otherButton} data-key='/'>÷</li>
          <li className={styles.numberPad__item} onClick={this.otherButton} data-key='='>＝</li>
          <li className={styles.numberPad__item} onClick={this.otherButton} data-key='ac'>AC</li>
        </ul>
      </div>
    )
  }

  numInput(e) {
    e.preventDefault();
    const num = e.target.getAttribute('data-num');
    this.props.numKeyPress({num: num});
  }

  otherButton(e) {
    e.preventDefault();
    const keyType = e.target.getAttribute('data-key');
    this.props.otherKeyPress({keyType: keyType});
  }

}