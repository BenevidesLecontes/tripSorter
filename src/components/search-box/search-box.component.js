import React, {Component} from 'react';
import axios from 'axios';
import {Button, Col, Radio, Row} from 'antd';
import './search-box.component.css'
import UserSelectComponent from "../search-combo/search-combo.component";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
  
  render() {
    return (
      <Row type="flex" justify="center" className="mt-10">
        <Col xs={20} sm={20} md={21} lg={6}>
          <UserSelectComponent placeholder={'From'}
                               sourceData={this.state.citiesFrom}
                               handleChange={(origin) => this.setState({origin})}/></Col>
        <Col xs={20} sm={20} md={21} lg={6} className="ml-6-lg">
          <UserSelectComponent placeholder={'To'}
                               sourceData={this.state.citiesTo}
                               handleChange={(destination) => this.setState({destination})}/></Col>
        <Col xs={20} sm={20} md={21} lg={6} className="text-right-md">
          <RadioGroup
            size="large"
            defaultValue="a">
            <RadioButton value="a">Cheapest</RadioButton>
            <RadioButton value="b">Fastest</RadioButton>
          </RadioGroup>
        </Col>
        <Col xs={20} sm={20} md={21} lg={3} xl={4} className="v-align">
          <Button size="large"
                  type="danger"
                  icon="search">Search</Button></Col>
      </Row>
    )
  }
  findPath(){
    const problem = {
      start: {A: 5, B: 2},
      A: {C: 4, D: 2},
      B: {A: 8, D: 7},
      C: {D: 6, finish: 3},
      D: {finish: 1},
      finish: {}
    };
  
    const lowestCostNode = (costs, processed) => {
      return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
          if (!processed.includes(node)) {
            lowest = node;
          }
        }
        return lowest;
      }, null);
    };

// function that returns the minimum cost and path to reach Finish
    const dijkstra = (graph) => {
    
      // track lowest cost to reach each node
      const costs = Object.assign({finish: Infinity}, graph.start);
    
      // track paths
      const parents = {finish: null};
      for (let child in graph.start) {
        parents[child] = 'start';
      }
    
      // track nodes that have already been processed
      const processed = [];
    
      let node = lowestCostNode(costs, processed);
    
      while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
          let newCost = cost + children[n];
          if (!costs[n]) {
            costs[n] = newCost;
            parents[n] = node;
          }
          if (costs[n] > newCost) {
            costs[n] = newCost;
            parents[n] = node;
          }
        }
        processed.push(node);
        node = lowestCostNode(costs, processed);
      }
    
      let optimalPath = ['finish'];
      let parent = parents.finish;
      while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
      }
      optimalPath.reverse();
    
      const results = {
        distance: costs.finish,
        path: optimalPath
      };
    
      return results;
    };
  
    console.log(dijkstra(problem));
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
    this.findPath();
  }
}

export default SearchBoxComponent;