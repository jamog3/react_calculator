import React from 'react'
import ReactDOM from 'react-dom'
import styles from './main.css';

import Display from './components/Display';
import NumberPad from './components/NumberPad';

// 直前に押されたキーが数字か否か
let isNumKeyPress = false;
// 記憶しておく数字
let memoryNum;
// 1つ前に押された記号キーの種類
let calculationType;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNum: this.props.displayNum,
      calcType: this.props.calcType,
    };
    this.numPress = this.numPress.bind(this);
    this.calcPress = this.calcPress.bind(this);
    this.equalPress = this.equalPress.bind(this);
    this.clearPress = this.clearPress.bind(this);
  }

  componentDidMount() {
    memoryNum = 0;
    calculationType = '';
  }


  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appInr}>
          <Display
            displayNum={this.state.displayNum}
            calcType={this.state.calcType}
          />
          <NumberPad
            numKeyPress={this.numPress.bind(this)}
            calcKeyPress={this.calcPress.bind(this)}
            equalKeyPress={this.equalPress.bind(this)}
            clearKeyPress={this.clearPress.bind(this)}
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

  calcPress(keyType) {
    const {displayNum, calcType} = this.state;
    const otherKeyType = keyType.keyType;
    if (!isNumKeyPress) {
      return
    }
    console.log('before', memoryNum, displayNum);
    // 今、押された記号を表示
    switch (otherKeyType) {
      case '+':
        this.setState({calcType: '\uff0b' });
        memoryNum = (memoryNum === 0) ? displayNum : memoryNum;
        break;
      case '-':
        this.setState({calcType: '\u2212' });
        memoryNum = (memoryNum === 0) ? displayNum : memoryNum;
        break;
      case '*':
        this.setState({calcType: '\u00d7' });
        memoryNum = (memoryNum === 0) ? displayNum : memoryNum;
        break;
      case '/':
        this.setState({calcType: '\u00f7' });
        memoryNum = (memoryNum === 0) ? displayNum : memoryNum;
        break;
    }
    // 1つ前に押された記号で計算
    switch (calculationType) {
      case '+':
        // 初期値が0の時は計算しない
        memoryNum = (memoryNum === 0) ? displayNum : memoryNum + displayNum;
        this.setState({displayNum: memoryNum });
        break;
      case '-':
        memoryNum = (memoryNum === 0) ? displayNum : memoryNum - displayNum;
        this.setState({displayNum: memoryNum });
        break;
      case '*':
        memoryNum = (memoryNum === 0) ? displayNum : memoryNum * displayNum;
        this.setState({displayNum: memoryNum });
        break;
      case '/':
        memoryNum = (memoryNum === 0) ? displayNum : memoryNum / displayNum;
        this.setState({displayNum: memoryNum });
        break;
    }
    console.log('after', memoryNum, displayNum);
    // 押した記号を記憶
    calculationType = otherKeyType;
    // 数字を押したフラグ
    isNumKeyPress = false;
  }

  equalPress(keyType) {
    const {displayNum, calcType} = this.state;
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
    this.setState({calcType: '' });
    // 数字を押したフラグ
    isNumKeyPress = false;
  }

  clearPress(keyType) {
    const {displayNum, calcType} = this.state;
    console.log('クリア')
    memoryNum = 0;
    calculationType = '';
    this.setState({displayNum: memoryNum });
    this.setState({calcType: '' });
    // 数字を押したフラグ
    isNumKeyPress = false;
  }
}

App.defaultProps = {
  displayNum: 0,
  calcType: ''
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
)