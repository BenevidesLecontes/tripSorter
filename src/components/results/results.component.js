import React, {Component} from 'react';
import {Button, Card, Col, Row} from 'antd';
import './results.component.css';

class ResultsComponent extends Component {
  render() {
    return (
      <Row type="flex" justify="center" className="mt-10">
        <Col xs={10} sm={10} md={21} lg={12}>
          <Card style={{marginTop: 20}} title={'Search Results'}>
            <div className="result">
              <div className="result-item">
                <div className="countryInfoAndPrice">
                  <span className="from">London </span>
                  <span className="fa fa-angle-right"/>
                  <span className="to"> Paris</span>
                  <span className="price"> 100€</span>
                </div>
                <div className="transport">
                  <span className="transport-type">bus</span>
                  <span className="reference"> TLA0500</span>
                  <span className="for"> for 01h30</span>
                </div>
              </div>
              <div className="total">
                <p><span className="title">Total</span> 08h15 <span className="price">480€</span></p>
              </div>
            </div>
            <Button size="large"
                    style={{width: '100%'}}
                    onClick={() => this.props.resetForm()}
                    type="danger"
                    icon="rollback">Reset</Button>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default ResultsComponent;