import React from 'react'
import styles from './NumberPad.css';

const numBtn = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default class NumberPad extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      num: '',
      keyType: ''
    };
    this.numInput = this.numInput.bind(this);
    this.calcButton = this.calcButton.bind(this);
    this.equalButton = this.equalButton.bind(this);
    this.clearButton = this.clearButton.bind(this);
  }

  render() {
    return (
      <div>
        <ul className={styles.numberPad}>
          {numBtn.map( (num, i) => {
            return <li className={styles.numberPad__item} onClick={this.numInput} data-num={num} key={i}>{num}</li>;
          })}
          <li className={`${styles.numberPad__item} ${styles.numberPad__item_addition}`} onClick={this.calcButton} data-key='+'>&#xff0b;</li>
          <li className={`${styles.numberPad__item} ${styles.numberPad__item_subtraction}`} onClick={this.calcButton} data-key='-'>&minus;</li>
          <li className={`${styles.numberPad__item} ${styles.numberPad__item_multiplication}`} onClick={this.calcButton} data-key='*'>&times;</li>
          <li className={`${styles.numberPad__item} ${styles.numberPad__item_division}`} onClick={this.calcButton} data-key='/'>&divide;</li>
          <li className={`${styles.numberPad__item} ${styles.numberPad__item_equal}`} onClick={this.equalButton} data-key='='>&#xff1d;</li>
          <li className={`${styles.numberPad__item} ${styles.numberPad__item_clear}`} onClick={this.clearButton} data-key='ac'>AC</li>
        </ul>
      </div>
    )
  }

  numInput(e) {
    e.preventDefault();
    const num = e.target.getAttribute('data-num');
    this.props.numKeyPress({num: num});
  }

  calcButton(e) {
    e.preventDefault();
    const keyType = e.target.getAttribute('data-key');
    this.props.calcKeyPress({keyType: keyType});
  }

  equalButton(e) {
    e.preventDefault();
    const keyType = e.target.getAttribute('data-key');
    this.props.equalKeyPress({keyType: keyType});
  }

  clearButton(e) {
    e.preventDefault();
    const keyType = e.target.getAttribute('data-key');
    this.props.clearKeyPress({keyType: keyType});
  }

}