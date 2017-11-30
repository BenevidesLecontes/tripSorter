import React, {Component} from 'react';
import {Layout, Menu, Row} from 'antd';
import {Icon} from 'react-fa'
import './home.component.css'
import SearchBoxForm from "../search-box/search-box.component";
import ResultsComponent from "../results/results.component";

const {Header, Sider, Content} = Layout;

class HomeComponent extends Component {
  toggleForm = () => {
    this.form.resetFields();
  };
  
  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider width={500}>
          <div className="home-bg">
            <a href="/home" className="logo-alt">
              <i className="icon-logo"/>
            </a>
          </div>
        </Sider>
        <Layout>
          <Header>
            <Menu
              mode="inline">
              <Menu.Item><a href="#"><Icon name="facebook"/></a></Menu.Item>
              <Menu.Item><a href="#"><Icon name="twitter"/></a></Menu.Item>
              <Menu.Item><a href="#"><Icon name="instagram"/></a></Menu.Item>
              <Menu.Item><a href="#">Buy</a></Menu.Item>
              <Menu.Item><a href="#">Rent</a></Menu.Item>
              <Menu.Item><a href="#">Commercial</a></Menu.Item>
            </Menu>
          </Header>
          <Content>
            <main className="main-content">
              <Row type="flex" justify="center">
                <div className="intro">
                  <span className="logo">TripSorter</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi iure minima provident quae.
                    Architecto, consectetur debitis dolores ex, explicabo incidunt, iure libero numquam perferendis
                    quibusdam quidem similique soluta. Maiores.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi impedit sit temporibus?
                    Accusantium alias, aliquam amet architecto.</p>
                </div>
              </Row>
              <SearchBoxForm ref={form => this.form = form}/>
              <ResultsComponent resetForm={this.toggleForm}/>
            </main>
          </Content>
        </Layout>
      </Layout>)
  }
}

export default HomeComponent;