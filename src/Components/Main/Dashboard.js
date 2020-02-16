import React, { Component } from 'react'
import { Input,Upload,Select,Row,Col,Button,Card,Icon,Tag,Tooltip,Modal,Collapse} from 'antd';
import { RotateSpinner } from "react-spinners-kit";
import Sidebar from '../reuse/Sidebar'
import axios from 'axios'

const {Panel} = Collapse
const { Option } = Select;

class Dashboard extends Component {
    constructor() {
        super()
        this.getMyLocation = this.getMyLocation.bind(this)
      }
    state={
        webview:true,
        loaded:false,
        showmodal:false,
        token:'',
        value:'',
        cuty_id:'',
        count:20,
        latitude:'',
        longitude:'',
        availablerestdata:[],
        data:[
            {
                id:'123',
                name:'Coimbatore',
            },
            {
                id:'234',
                name:'Chennai'
            }
        ],
        restaurantdata:{R:{has_menu_status:{}},location:{},timings:"",highlights:[],offers:[],photos:[],has_menu_status:{},establishment:[]},
        previewImage:'',
        previewVisible:false,

    }

    async componentWillMount(){
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        console.log(isMobile,"mobilee")
        if(isMobile){
        await this.setState({webview:false})
        }
        else{
        await this.setState({webview:true})
        }
        // this.handleChange()
        //     this.restaurantdetailsclicked()
    }

    componentDidMount=async()=>{
        let auth=localStorage.getItem('zomatotoken')
        if(auth==undefined || auth==null){
            this.props.history.push('/login')
        }
        else{
            
            // await axios.get('https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318',{headers:{
            //     'user-key':'e118cd047d86e7b1ba31ed63d545b11e'
            //   }})
            // .then(async(res)=>{
            //     console.log("res.data",res.data)
            // })
            
        }
        await this.setState({loaded:true})
    }

    handlesubmit = async()=>{
        // await axios.get(`https://developers.zomato.com/api/v2.1/collections?city_id=${}&lat=${}&lon=${}&count=${}`,{headers:{
        //     'user-key':'e118cd047d86e7b1ba31ed63d545b11e'
        //   }})
        // .then(async(res)=>{
        //     console.log("res.data",res.data)
        // })
        
    }

    handleSearch=async(e)=>{
        // let data=this.state.data
        console.log("searchee",e)
        if (e) {
            fetch(e, data => this.setState({ data }));
          } else {
            this.setState({ data: [] });
          }
    }

    getMyLocation=async()=> {
        const location = window.navigator && window.navigator.geolocation
        
        if (location) {
          location.getCurrentPosition(async(position) => {
              console.log("position",position)
            await this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          }, (error) => {
            this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
          })
        }

        console.log(`lat${this.state.latitude}&&long${this.state.longitude}`)
    
      }

    handleChange=async(e)=>{
        console.log("handlechange",e)
       await this.setState({ value:e });
    //    if all the values are known........use below endpoint
    //    await axios.get(`https://developers.zomato.com/api/v2.1/collections?city_id=${this.state.city_id}&lat=${this.state.latitude}&lon=${this.state.longitude}&count=${this.state.count}`,{headers:{
    //         'user-key':'e118cd047d86e7b1ba31ed63d545b11e'
    //       }})
    //     .then(async(res)=>{
    //         console.log("res.data",res.data)
    //     })
    // else use the given below
    await axios.get('https://developers.zomato.com/api/v2.1/collections?city_id=280',{headers:{
                'user-key':'e118cd047d86e7b1ba31ed63d545b11e'
              }})
    .then(async(res)=>{
        console.log("res.data",res)
        await this.setState({availablerestdata:res.data.collections})
    })
    }

    selecthandleChange=async(e)=>{
        console.log(`selected ${e}`);
    }

    restaurantdetailsclicked=async()=>{
        await this.props.history.push('/details')
    }
   
    renderdata=()=>{
        const uploadButton = (
            <Card>
            <div style={{textAlign:'center'}}>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
            </Card>
        );
        if(this.state.loaded){
        return(
            <div style={{paddingTop:'3%'}}>
                <Row>
                    <Col span={8} style={{textAlign:'end'}}>
                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.selecthandleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                                Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Col>
                    <Col span={8}>
                    <Select
                        showSearch
                        value={this.state.value}
                        placeholder="Search for Restaurants or Cuisines"
                        showArrow={true}
                        style={{width:'100%'}}
                        // filterOption={false}
                        onSearch={this.handleSearch}
                        onChange={this.handleChange}
                        notFoundContent={null}
                    >
                        {this.state.data.map((p,i)=>{
                            return(
                                <Option key={p.id}>{p.name}</Option>
                            )
                        })}
                    </Select>
                    </Col>
                    <Col span={8} >
                        <Button type="dashed" onClick={()=>this.getMyLocation()}>Get My Location</Button>
                    </Col>
                </Row>
                {this.state.webview?
                <Row  gutter={[40, 32]}>
                    {this.state.availablerestdata.map((p,i)=>{
                        return(
                            <Col span={12} style={{}}>
                            <Card size={'small'} cover={
                                <img height='250px'
                                    alt="example"
                                    src={p.collection.image_url}
                            />}
                            actions={[
                                <a href={p.collection.url} target><Icon type="eye" key="setting"/></a>,
                                <Icon type="small-dash" key="small-dash" onClick={()=>this.restaurantdetailsclicked()}/>,
                              ]}
                              >
                                <div style={{color:'black',textOverflow: 'ellipsis',overflow: 'hidden',height: '1.2em',whiteSpace: 'nowrap'}}><b>{p.collection.title}</b></div>
                                <div style={{color:'grey',textOverflow: 'ellipsis',overflow: 'hidden',height: '1.2em',whiteSpace: 'nowrap'}}><b>Description:</b>{p.collection.description}</div>
                                <div style={{color:'grey',textOverflow: 'ellipsis',overflow: 'hidden',height: '1.2em',whiteSpace: 'nowrap'}}><b>Counts:</b>{p.collection.res_count}</div>
                                <div style={{color:'grey',textOverflow: 'ellipsis',overflow: 'hidden',height: '1.2em',whiteSpace: 'nowrap'}}><b>Share URL:</b><a>{p.collection.share_url}</a></div>
                            </Card>
                        </Col>
                    )
                })}
                </Row>
                :
                <Row  gutter={[40, 32]}>
                    {this.state.availablerestdata.map((p,i)=>{
                        return(
                <Col span={24} style={{}}>
                            <Card size={'small'} cover={
                                <img
                                    alt="example"
                                    src={p.image_url}
                            />}
                            actions={[
                                <a href={p.url} target><Icon type="eye" key="setting"/></a>,
                                <Icon type="small-dash" key="small-dash" onClick={()=>this.restaurantdetailsclicked()}/>,
                              ]}
                              >
                                <div style={{color:'black',textOverflow: 'ellipsis',overflow: 'hidden',height: '1.2em',whiteSpace: 'nowrap'}}><b>{p.title}</b></div>
                                <div style={{color:'grey',textOverflow: 'ellipsis',overflow: 'hidden',height: '1.2em',whiteSpace: 'nowrap'}}><b>Description:</b>{p.description}</div>
                                <div style={{color:'grey',textOverflow: 'ellipsis',overflow: 'hidden',height: '1.2em',whiteSpace: 'nowrap'}}><b>Counts:</b>{p.res_count}</div>
                                <div style={{color:'grey',textOverflow: 'ellipsis',overflow: 'hidden',height: '1.2em',whiteSpace: 'nowrap'}}><b>Share URL:</b>{p.share_url}</div>
                            </Card>
                        </Col>
                        )
                    })}
                </Row>
                }
            </div>
            
        )
        }
        else{
            return(
                <div style={{width:'100vH',height:'100vH',marginLeft:'auto',marginRight:'auto',display:'block',paddingTop:'5%'}}>
                    <p style={{textAlign:'center'}}>
                        <p style={{paddingLeft:'46%'}}>
                            <RotateSpinner size={60} color="blue" loading={!this.state.loaded} style={{}}/>
                        </p>
                    </p>
                </div>
            )
        }
    }

    render(){
        return(

                <Sidebar renderdata={this.renderdata} selected={['1']} history={this.props.history}/>
        )
    }
}

export default Dashboard