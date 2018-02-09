import React, {Component} from 'react';
import {TextField} from './styled';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue
    };
  }

  onChangeValue = (e) => {
    this.setState({value: e.target.value});
  };

  render() {
    const {value} = this.state;
    return <TextField onChange={this.onChangeValue} value={value} />;
  }
}
