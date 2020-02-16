import React, { Component } from 'react'
import { Input,Upload,Select,Row,Col,Button,Card,Icon,Tag,Tooltip,Modal,Collapse} from 'antd';
import { RotateSpinner } from "react-spinners-kit";
import Sidebar from '../reuse/Sidebar'
import Restaurantlocationmap from './bin/Restaurantlocationmap'
import axios from 'axios'

const {Panel} = Collapse
const { Option } = Select;

class Details extends Component {
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
        restaurantdata:{uid:1,R:{has_menu_status:{}},location:{},all_reviews:{},timings:"",highlights:[],offers:[],photos:[],has_menu_status:{},establishment:[]},
        // restaurantdata:{},
        previewImage:'',
        previewVisible:false,
        photosdata:[],
        restlivelatitude:'',
        restlivelongitude:''


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
    }

    componentDidMount=async()=>{
        let auth=localStorage.getItem('zomatotoken')
        if(auth==undefined || auth==null){
            this.props.history.push('/login')
        }
        // await this.setState({loaded:true})
        await axios.get('https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318',{headers:{
            'user-key':'e118cd047d86e7b1ba31ed63d545b11e'
          }})
        .then(async(res)=>{
            console.log("res.data",res.data)
            let data=res.data
            await this.setState({restaurantdata:res.data})
            // for(let i=0;i<data.photos.length;i++){
            //     data.photos[i]['uid']=data.photos[i].id
            // }
            // console.log("data",data)
            // await this.setState({restaurantdata:data})
        })
        console.log("this.state.res",this.state.restaurantdata.photos)
        let photos=this.state.restaurantdata.photos
        let prodarr=[]
        for(let i=0;i<photos.length;i++){
            let prod={
                uid:1,
                name:photos[i].photo.id,
                url:`${photos[i].photo.url}`,
                status: 'done',
                response:
                    {
                        success:true,
                        filename:photos[i].photo.url
                    }
            }
            prodarr.push(prod)
        }
        await this.setState({photosdata:prodarr})
        console.log("photosdata",this.state.photosdata)
        await this.setState({loaded:true})
        
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

    getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  showModal=async()=>{


    await this.setState({restlivelatitude:this.state.restaurantdata.location.latitude,restlivelongitude:this.state.restaurantdata.location.longitude,showmap:true})
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
                {this.state.restaurantdata !={}&&
                <Card>
                    <Row>
                            <Col span={12}>
                                <b>Name</b>
                            </Col>
                            <Col span={12}>
                            <Tooltip placement="topLeft" title={"Please click to Open in a new window"}>
                                <a href={this.state.restaurantdata.url}>{this.state.restaurantdata.name}</a>
                                </Tooltip>
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Delivery</b>
                            </Col>
                            {console.log("rthis.state.restaurantdat",this.state.restaurantdata)}
                            <Col span={12}>
                            {this.state.restaurantdata.R.has_menu_status.delivery == -1&&
                                <Tag color="#f50">Not Available</Tag>
                                }
                                {this.state.restaurantdata.R.has_menu_status.delivery == 1&&
                                <Tag color="#87d068">Available</Tag>
                                }
                                {this.state.restaurantdata.R.has_menu_status.delivery == 0&&
                                <Tag color="#2db7f5">Waiting for Update</Tag>
                                }
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>TakeAway</b>
                            </Col>
                            <Col span={12}>
                            {this.state.restaurantdata.R.has_menu_status.delivery == -1&&
                                <Tag color="#f50">Not Available</Tag>
                                }
                                {this.state.restaurantdata.R.has_menu_status.delivery == 1&&
                                <Tag color="#87d068">Available</Tag>
                                }
                                {this.state.restaurantdata.R.has_menu_status.delivery == 0&&
                                <Tag color="#2db7f5">Waiting for Update</Tag>
                                }
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                        <Collapse accordion>
                            <Panel header={`Location`} key={'1'}>
                                <Row>
                                    <Col span={12}>
                                        <b>Address</b>
                                    </Col>
                                    <Col span={12}>
                                        <Input disabled={true} value={this.state.restaurantdata.location.address}/></Col>
                                </Row>
                                <div style={{paddingTop:'2%'}} />
                                <Row>
                                    <Col span={12}>
                                        <b>Locality</b>
                                    </Col>
                                    <Col span={12}>
                                        <Input disabled={true} value={this.state.restaurantdata.location.locality}/></Col>
                                </Row>
                                <div style={{paddingTop:'2%'}} />
                                <Row>
                                    <Col span={12}>
                                        <b>City</b>
                                    </Col>
                                    <Col span={12}>
                                        <Input disabled={true} value={this.state.restaurantdata.location.city}/></Col>
                                </Row>
                                <div style={{paddingTop:'2%'}} />
                                <Row>
                                    <Col span={12}>
                                        <b>ZipCode</b>
                                    </Col>
                                    <Col span={12}>
                                        <Input disabled={true} value={this.state.restaurantdata.location.zipcode}/></Col>
                                </Row>
                                <div style={{paddingTop:'2%'}} />
                                <Row>
                                    <Col span={12}>
                                        <b>Location</b>
                                    </Col>
                                    <Col span={12}>
                                        <Button type="dashed" onClick={async()=>this.showModal()} >Show Map</Button>
                                    </Col>
                                </Row>
                                <div style={{paddingTop:'2%'}} />
                                <Row>
                                    <Col span={12}>
                                        <b>Locality Verbose</b>
                                    </Col>
                                    <Col span={12}>
                                        <Input disabled={true} value={this.state.restaurantdata.location.locality_verbose}/></Col>
                                </Row>
                            </Panel>
                        </Collapse>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Cuisines</b>
                            </Col>
                            <Col span={12}>
                                <Tag color="blue">{this.state.restaurantdata.cuisines}</Tag>
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Timing</b>
                            </Col>
                            <Col span={12}>
                            {this.state.restaurantdata.timings.split(',').map((p,i)=>{
                                return(
                                <Row>
                                    {`${p}`}
                                </Row>
                                )
                            })}  
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Average Cost For Tow</b>
                            </Col>
                            <Col span={12}>
                            {this.state.restaurantdata.average_cost_for_two}
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Price Range</b>
                            </Col>
                            <Col span={12}>
                            {this.state.restaurantdata.price_range}
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Currency</b>
                            </Col>
                            <Col span={12}>
                                <Tag>{this.state.restaurantdata.currency}</Tag>
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>HighLights</b>
                            </Col>
                            <Col span={12}>
                                {this.state.restaurantdata.highlights.map((p,i)=>{
                                    return(
                                <Tag>{p}</Tag>
                                )
                                })}
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Offers</b>
                            </Col>
                            <Col span={12}>
                                {}
                                {this.state.restaurantdata.offers.length >0?this.state.restaurantdata.offers.map((p,i)=>{
                                    return(
                                <Tag>{p}</Tag>
                                )
                                })
                                :
                                    `No Offers Available for your current location`
                                }
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Gallary</b>
                            </Col>
                            <Col span={12}>
                                <Tooltip placement="topLeft" title={`Available photos : ${this.state.restaurantdata.photo_count}`}>
                                    <a href={this.state.restaurantdata.photos_url}>Open Gallary</a>
                                </Tooltip>
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Images</b>
                            </Col>
                            <Col span={12}>
                                <div className="clearfix">
                                    <Upload
                                    listType="picture-card"
                                    fileList={this.state.photosdata}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                    >
                                    {this.state.photosdata.length >= 10 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                    </Modal>
                                </div>
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Menus</b>
                            </Col>
                            <Col span={12}>
                                <Tooltip placement="topLeft" title={`Available Menus are listed here`}>
                                    <a href={this.state.restaurantdata.menu_url}>Click Here</a>
                                </Tooltip>
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Support Table Reservation</b>
                            </Col>
                            <Col span={12}>
                                {this.state.restaurantdata.is_table_reservation_supported == -1&&
                                <Tag color="#f50"><Icon type="close" /></Tag>
                                }
                                {this.state.restaurantdata.is_table_reservation_supported == 1&&
                                <Tag color="#87d068"><Icon type="check" /></Tag>
                                }
                                {this.state.restaurantdata.is_table_reservation_supported == 0&&
                                <Tag color="#2db7f5">Waiting for Update</Tag>
                                }
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Availability for Table Reservation</b>
                            </Col>
                            <Col span={12}>
                                {this.state.restaurantdata.has_table_booking == -1&&
                                <Tag color="#f50">Not Available</Tag>
                                }
                                {this.state.restaurantdata.has_table_booking == 1&&
                                <Tag color="#87d068">Available</Tag>
                                }
                                {this.state.restaurantdata.has_table_booking == 0&&
                                <Tag color="#2db7f5">Waiting for Update</Tag>
                                }
                            </Col>
                        </Row>
                        <div style={{paddingTop:'2%'}} />
                        <Row>
                            <Col span={12}>
                                <b>Contact Numbers available</b>
                            </Col>
                            <Col span={12}>
                                {this.state.restaurantdata.phone_numbers}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <b>Establishment</b>
                            </Col>
                            <Col span={12}>
                            {this.state.restaurantdata.establishment.map((p,i)=>{
                                console.log("p",p)
                                return(
                                    <Tag>{p}</Tag>
                                    
                                )
                            })}
                            </Col>
                        </Row>
                        <Modal  title='Restaurant Location'
                                visible={this.state.showmap}
                                onOk={()=>this.setState({showmap:false,showModal:true})}
                                footer={null}
                                width="1000px" height="auto"
                                onCancel={()=>this.setState({showmap:false})}>
                                {/* <Card style={{ height:'450px' }}> */}
                                <Restaurantlocationmap latitude={this.state.restlivelatitude} 
                                                longitude={this.state.restlivelongitude} 
                                />
                        </Modal>
                        </Card>
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

export default Details