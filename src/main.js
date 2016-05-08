import React from 'react'
import ReactDOM from 'react-dom'
import styles from './main.css';

import Display from './components/Display';
import NumberPad from './components/NumberPad';

// 直前に押されたキーが数字か否か
let isNumKeyPress;
// 記憶しておく数字
let memoryNum = 0;
// 2つ前に押された記号キーの種類
let calculationType;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNum: this.props.displayNum,
    };
    this.numPress = this.numPress.bind(this);
    this.otherPress = this.otherPress.bind(this);
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appInr}>
          <Display
            displayNum={this.state.displayNum}
          />
          <NumberPad
            numKeyPress={this.numPress.bind(this)}
            otherKeyPress={this.otherPress.bind(this)}
          />
        </div>
      </div>
    )
  }

  numPress(num) {
    // 今の表示されてる数字
    const {displayNum} = this.state;
    let nowNum = displayNum;
    // 直前に記号キーが押されてる場合、表示をクリア
    if ( !isNumKeyPress ) {
      nowNum = 0;
    }
    // 追加された数字
    const addNum = num.num;
    // 数字を付け足す
    nowNum = (nowNum === 0) ? '' : nowNum;
    const newNum = nowNum + addNum;
    this.setState({displayNum: Number(newNum) });
    // 数字を押したフラグ
    isNumKeyPress = true;
  }

  otherPress(keyType) {
    const {displayNum} = this.state;
    const otherKeyType = keyType.keyType;
    // memoryNum = (memoryNum === 0) ? displayNum : '';
    switch (otherKeyType) {
      case '+':
        calculationType = otherKeyType;
        memoryNum = memoryNum + displayNum;
        this.setState({displayNum: memoryNum });
        break;
      case '-':
        calculationType = otherKeyType;
        memoryNum = memoryNum - displayNum;
        this.setState({displayNum: memoryNum });
        break;
      case '*':
        calculationType = otherKeyType;
        // 初期値が0の時は計算しない
        memoryNum = (memoryNum === 0) ? displayNum : memoryNum * displayNum;
        this.setState({displayNum: memoryNum });
        break;
      case '/':
        calculationType = otherKeyType;
        // 初期値が0の時は計算しない
        memoryNum = (memoryNum === 0) ? displayNum : memoryNum / displayNum;
        this.setState({displayNum: memoryNum });
        break;
      case '=':
        console.log('イコール', calculationType)
        switch (calculationType) {
          case '+':
            memoryNum = memoryNum + displayNum;
            break;
          case '-':
            memoryNum = memoryNum - displayNum;
            break;
          case '*':
            memoryNum = memoryNum * displayNum;
            break;
          case '/':
            memoryNum = memoryNum / displayNum;
            break;
        }
        this.setState({displayNum: memoryNum });
        break;
      case 'ac':
        console.log('クリア')
        memoryNum = 0;
        this.setState({displayNum: memoryNum });
        break;
    }
    // 記号を押したフラグ
    isNumKeyPress = false;
  }
}

App.defaultProps = {
  displayNum: 0
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
)