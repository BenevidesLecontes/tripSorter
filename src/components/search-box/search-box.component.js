import React, {Component} from 'react';
import axios from 'axios';
import {Button, Col, Form, Radio, Row, Select} from 'antd';
import './search-box.component.css'

const Option = Select.Option;

class SearchBoxComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: '',
      destination: '',
      deals: [],
      citiesTo: [],
      citiesFrom: []
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  
  handleFormChanges = (value, field) => {
    this.props.form.setFieldsValue({
      [field]: value
    });
  };
  customValueValidator = (rule, value, callback) => {
    const formValues = this.props.form.getFieldsValue(['origin', 'destination']);
    if (formValues && formValues.destination === formValues.origin) {
      callback(true);
    } else {
      callback();
    }
  };
  
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row type="flex" justify="center" className="mt-10">
          <Col xs={20} sm={20} md={21} lg={6}>
            <Form.Item>
              {getFieldDecorator('origin', {
                rules: [{required: true, message: 'Please select your origin!'}],
                initialValue: undefined
              })(
                <Select
                  combobox={false}
                  allowClear
                  className="from"
                  size="large"
                  onChange={origin => this.handleFormChanges(origin, 'origin')}
                  style={{width: '100%'}}
                  placeholder="From">
                  {this.state.citiesFrom.sort().map((d, index) => <Option value={d} key={index}>{d}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xs={20} sm={20} md={21} lg={6} className="ml-6-lg">
            <Form.Item>
              {getFieldDecorator('destination', {
                rules: [{required: true, message: 'Please select your destination!'},
                  {
                    message: 'Your destination must be different from your origin.',
                    validator: (rule, value, cb) => this.customValueValidator(rule, value, cb)
                  }],
                initialValue: undefined
              })(
                <Select
                  className="to"
                  combobox={false}
                  allowClear
                  size="large"
                  onChange={destination => this.handleFormChanges(destination, 'destination')}
                  style={{width: '100%'}}
                  placeholder="To">
                  {this.state.citiesTo.sort().map((d, index) => <Option value={d} key={index}>{d}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xs={20} sm={20} md={21} lg={6} className="text-right-md">
            <Form.Item>
              {getFieldDecorator('option', {
                initialValue: 'a'
              })(
                <Radio.Group
                  size="large"
                  name="options"
                  onChange={(option) => this.handleFormChanges(option, 'option')}>
                  <Radio.Button value="a">Cheapest</Radio.Button>
                  <Radio.Button value="b">Fastest</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          <Col xs={20} sm={20} md={21} lg={3} xl={4} className="align-search-btn">
            <Form.Item>
              <Button size="large"
                      htmlType="submit"
                      type="danger"
                      icon="search">Search</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
  
  filterDuplicated(deals) {
    const citiesFrom = deals.map(t => t.departure);
    const citiesTo = deals.map(t => t.arrival);
    this.setState({
      deals, citiesFrom: Array.from(new Set(citiesFrom)),
      citiesTo: Array.from(new Set(citiesTo))
    });
  }
  
  componentDidMount() {
    axios.get('./data/response.json').then(res => this.filterDuplicated(res.data.deals));
  }
}

const SearchBoxForm = Form.create({})(SearchBoxComponent);
export {SearchBoxForm};
export default SearchBoxForm;