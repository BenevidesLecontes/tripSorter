import React, {Component} from 'react';
import {Select} from 'antd';
import './search-combo.component.css'

const Option = Select.Option;

class UserSelectComponent extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Select
        size="large"
        onChange={this.props.handleChange}
        style={{width: '100%'}}
        placeholder={this.props.placeholder}>
        {this.props.sourceData.sort().map((d, index) => <Option key={index}>{d}</Option>)}
      </Select>
    );
  }
}

export default UserSelectComponent;