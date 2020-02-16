import React, { Component } from 'react';
import { Button,Checkbox} from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import iziToast from 'izitoast'
import axios from 'axios'

export class Login extends Component {

  state={
    email:'',
    password:'',
    rememberchecked:true,
    forgotemail:'',
    forgotpassword:false,
    validcredentials:[
      {
        email:'ashwinashes@gmail.com',
        password:'urmxdwidme'
      },
      {
        email:'ananthakumar@gmail.com',
        password:'L0st!nL0ve'
      },
    ],
    boolean:[]
  
  }

  handleSubmit = async (e)=>{
    e.preventDefault()
    console.log("in handlesubmit",this.state)
    for(let i=0;i<this.state.validcredentials.length;i++){
      console.log("inside for")
      if(this.state.email == this.state.validcredentials[i].email){
      console.log("inside if")

        if(this.state.password == this.state.validcredentials[i].password){
      console.log("inside if if")
          this.state.boolean[i]=true
        }
        else{
      console.log("inside if else")
      this.state.boolean[i]=false
        }
      }
      else{
      console.log("inside else")

      this.state.boolean[i]=false

      }
    }
    if(this.state.boolean.indexOf(true) == -1){
      iziToast.error({
        title: 'Authendication',
        message:'Please check the Credentials',
        timeout: 1400,
        close: true,
        theme: 'light',
        color: 'red',
        displayMode: 'once',
        zindex: 1999,
        position:'topCenter'
    });
    }
    else{
      iziToast.success({
        title: 'Authendication',
        message:'Login successful',
        timeout: 1400,
        close: true,
        theme: 'light',
        color: 'green',
        displayMode: 'once',
        zindex: 1999,
        position:'topCenter'
    });
    let token='dummytoken'
    await localStorage.setItem('zomatotoken',token)
    this.props.history.push('/')
    }
  }

  onChange=async(e)=>{
    await this.setState({rememberchecked:e.target.checked})
  }
  // handleforgotpassword=async(e)=>{
  //   e.preventDefault()
  //   let prod={
  //     userType:"salesadmin",
  //     email:this.state.forgotemail
  //   }
  //   await axios.post(port+'/createRequest',prod)
  //   .then(res=>{
  //     console.log("forgotres",res.data)
  //   })
  // }


    render() {
        return (
            <div id="app">
            <section  className="section">
              <div className="container mt-5">
                <div  className="row">
                  <div  className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <div  className="login-brand">
                      <img style={{}} src="./dist/img/souledstore.png" alt="logo" width="100" className="shadow-light rounded-circle" />
                    </div>
        
                    <div  className="card card-primary">
                      <div  className="card-header"><h4 style={{textAlign:'center'}}><b>Login</b></h4></div>
        
                      <div className="card-body">
                        {!this.state.forgotpassword?
                        <form  className="needs-validation" noValidate="">
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" className="form-control"
                             name="email" tabIndex="1" required autoFocus           
                             value={this.state.email}
                              onChange={(e) => this.setState({ email: e.target.value })}                
                              />
                            <div className="invalid-feedback">
                              Please enter your email
                            </div>
                          </div>
        
                          <div className="form-group">
                            <div className="d-block">
                                <label htmlFor="password" className="control-label">Password</label>
                            </div>
                            <input id="password" type="password" 
                             className="form-control"
                             name="password"
                             tabIndex="2" required                  
                             value={this.state.password}
                              onChange={(e)=>this.setState({password:e.target.value})}/>        
                            
                            <a onClick={async()=>await this.setState({forgotpassword:true})}><p style={{color:'blue',textAlign:'right'}}>Forgot Password ?</p></a>
    
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox">
                              {/* <input type="checkbox" name="remember" className="custom-control-input" tabIndex="3" id="remember-me" default={true} onChange={(e)=>this.setState({rememberchecked:e.target.value})}/> */}
                              <Checkbox style={{marginLeft:'-8%'}} checked={this.state.rememberchecked} onChange={(e)=>this.setState({rememberchecked:e.target.checked})}>Remember me</Checkbox>
                              {/* <label className="custom-control-label" htmlFor="remember-me">Remember Me</label> */}

                            </div>
                          </div>
        
                          <div className="form-group">
                            <button 
                             className="btn btn-primary btn-lg btn-block" tabIndex="4" style={{backgroundColor:'blue'}}
                             disabled={this.state.email && this.state.password?false:true }
                              onClick={this.handleSubmit}
                             >
                              Login
                            </button>
                          </div>

                        

      
                        </form>
                        :
                        <form  className="needs-validation" noValidate="">
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" className="form-control"
                            name="email" tabIndex="1" required autoFocus           
                            value={this.state.forgotemail}
                              onChange={(e) => this.setState({ forgotemail: e.target.value })}                
                              />
                            <div className="invalid-feedback">
                              Please enter your email
                            </div>
                          </div>
                          <div className="form-group">
                            <button 
                             className="btn btn-primary btn-lg btn-block" tabIndex="4" style={{backgroundColor:'blue'}}
                             disabled={this.state.forgotemail?false:true }
                              onClick={(e)=>this.handleforgotpassword(e)}
                             >
                              Submit
                            </button>
                          </div>
                        </form>
                        }
                        
                        
        
                      </div>
                    </div>
                   
                    <div className="simple-footer">
                      Copyright &copy; The Souled Store 2020
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
      
        )
    }
}

export default Login
