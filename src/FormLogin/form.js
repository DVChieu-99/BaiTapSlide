import React from 'react';
import ReactDOM from 'react-dom';
import "./form.css";

 


class Form extends React.Component {
    constructor(props)
{
    super(props)
    this.state={
        email:'',
        password: '',
        isInputValid: false,
        isInputValidPass: false,
        errorMessage: null,
        errorMessagePass: null,
        devicecode:null
    }

}

Error=null;
ErrorPass=null;
 validateInput = () => {
   
    const regexp =  /^[a-z][a-z0-9_\.]{2,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
      let Email, ValueEmail , Password, ValuePass;
    if (regexp.exec(this.Error.value) === null||this.Error.value.length ===0) {
         Email= "Username không hợp lệ";
                 ValueEmail= false;
    }
    else {
                 ValueEmail= true;
    }
    if (this.ErrorPass.value.length ===0) {
         Password= "Password không hợp lệ";
                 ValuePass= false;
    }
    else {
                 ValuePass= true;
    }
    this.setState({
        isInputValid: ValueEmail,
        errorMessage: Email,
        isInputValidPass: ValuePass,
        errorMessagePass: Password
    })
}

handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value   //thuộc tính có name lấy từ target.name
    });
  } 

  handleSubmit = (event) => {
    if(!this.state.isInputValid||!this.state.isInputValidPass)
      {
        event.preventDefault(); 
      }
    else
    {
      this.ajax("POST","http://a.vipn.net/api/auth/login",this.state.devicecode);      
    }
  
 }
componentDidMount() {

    let xhr = new XMLHttpRequest()
   let jsondevice;
    // get a callback when the server responds
    xhr.onreadystatechange = ()=> {
      // update the state of the component with the result here
       if (xhr.readyState === 4 && xhr.status === 200)
        {
        console.log(xhr)
        let studen=xhr.response;
        let changeJosn=JSON.parse(studen);
       

        let jsondevice=changeJosn.data.device_code;
        console.log("device_code : " +jsondevice);

        this.setState({devicecode:jsondevice})
     }
  
    }

    xhr.onloadstart = function () {
  alert("Download underway");
};
xhr.onerror = function () {
  alert("** An error occurred during the transaction");
};
     

    // open the request with the verb and the url
      xhr.open("POST", "http://a.vipn.net/api/device/init", true);
      xhr.send();
   
  }

  ajax = (method,url,RequestHeader) => {
      let xhr = new XMLHttpRequest()
       xhr.open(method,url, true);
       xhr.onload = () => {
        let jsonsuccess;
        let studen=xhr.response;
        let changeJosn=JSON.parse(studen);
        jsonsuccess=changeJosn.success;
        console.log(jsonsuccess);
        if(!jsonsuccess)
        {
           alert('Thông tin đăng nhập không thành công');
        }
        else
        {
          alert('Thông tin đăng nhập thành công');
        }
     }
   
     xhr.setRequestHeader("device-code",RequestHeader);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // send the request
    xhr.send(`email=${this.state.email}&password=${this.state.password}`);

  }
 
render() { 
    return (
        <div className="classForm">
        <h3>Form Login</h3>
       <div >
       <lable className="lable">Username :</lable>
       <input type="text" 
              name="email"
              ref={(item) => { this.Error = item }}
              placeholder="Username" 
              onChange={this.handleChange}
              value={this.state.email} 
              onBlur={this.validateInput}
              />
       
    <h6>{this.state.errorMessage}</h6>
       
       <lable className="lable">Password :</lable>
       <input type="password"
              name="password" 
              ref={(item) => { this.ErrorPass = item }}
              placeholder="Password"
              onChange={this.handleChange} 
              value={this.state.password}
              onBlur={this.validateInput}/>
       
    <h6>{this.state.errorMessagePass}</h6>

       <input type="button" onClick={this.handleSubmit} className="submit" value="Login"/>
       </div>
       </div>
    );
  }
}
export default Form;