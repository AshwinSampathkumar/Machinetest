import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon,Dropdown,Avatar } from 'antd';
import axios from 'axios'
// const { Layout, Menu, Breadcrumb, Icon } = antd;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default class Sidebar extends Component {

    state = {
        collapsed: false,selected:this.props.selected,webview:true
      };

      
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };

      async componentWillMount(){
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        console.log(isMobile,"mobilee")
        if(isMobile){
        await this.setState({collapsed:true,webview:false})
        }
        else{
        await this.setState({collapsed:false,webview:true})
        }
    }
    logout=async()=>{
        await localStorage.removeItem('zomatotoken')
        this.props.history.push('/login')
    }
      
    render(){
        // console.log("renderselected",this.state.selected)
        const menu = (
            <Menu>
              <Menu.Item>
                <a onClick={()=>this.logout()} >
                  LogOut
                </a>
              </Menu.Item>
            </Menu>
          );
        return(
                <Layout>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" style={{textAlign:'center',paddingTop:'0.5%',paddingBottom:'1%'}}
          >
            <img style={{}} src="./dist/img/souledstore.png" alt="logo" width="100" className="shadow-light rounded-circle" />
            </div>
                    <Menu theme="dark" defaultSelectedKeys={this.state.selected} mode="inline">
                        <Menu.Item key="1">
                            <a href="/">
                                <Icon type="pie-chart" />
                                <span>Dashboard</span></a>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <a onClick={()=>this.logout()}>
                                <Icon type="logout" />
                                <span>LogOut</span>
                            </a>
                        </Menu.Item>
                    </Menu>
        </Sider>
        <Layout style={{minHeight:'150vh'}}>
        <Header className="header" 
            // style={{width:'100%'}}
            >
              <div style={{display:'flex'
              // ,width:'120%'
            }}
              >
                <div style={{marginLeft:'auto'}}>
                  <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="#">
                      {/* <Avatar shape="square" icon={ */}
                      <Icon type="user" style={{color:'white',fontSize:24}} /> 
                      {/* /> */}
                      <Icon type="down" style={{color:'white',fontSize:12}}/>
                    </a>
                  </Dropdown>
                </div>
              </div>
            </Header>
            {this.state.webview?
          <Content style={{ margin: '0 16px',width:'95%' }}>
            {this.props.renderdata()}
          </Content>
          :
          <Content style={{ margin: '0 16px',width:'80%' }}>
          {this.props.renderdata()}
        </Content>
            }
          <Footer style={{ textAlign: 'center'}}>Zomato ©2020 Created by XXX</Footer>
        </Layout>
      </Layout>
        )
    }
}