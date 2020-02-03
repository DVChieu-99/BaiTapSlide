import React from 'react';
import ReactDOM from 'react-dom';
import "./upload.css";

 
class SlideShow extends React.Component {
constructor(props)
{
    super(props)
    this.state={
        images:[{id:1,src:'https://hocwebchuan.com/common/images/btn_facebook.png',tieude:'Hình ảnh 1'},
                {id:2,src:'https://hocwebchuan.com/common/images/btn_short_url.png',tieude:'Hình ảnh 2'},
                {id:3,src:'https://cdn4.buysellads.net/uu/1/57095/1576856619-ad3.png',tieude:'Hình ảnh 3'},
                {id:4,src:'https://hocwebchuan.com/common/images/btn_rabbie_theme.png',tieude:'Hình ảnh 4'},
                {id:5,src:'https://cdn4.buysellads.net/uu/1/57095/1576856619-ad3.png',tieude:'Hình ảnh 5'}
                ],
        x:0        
    }
    this.ClickLeft = this.ClickLeft.bind(this);
    this.ClickRight = this.ClickRight.bind(this);

}


ClickLeft() {
    let legth=this.state.images.length-1
    this.state.x===0
    ?
    (
      this.setState(state => ({
      x: state.x *0
    }))
    )
    :
    (
    this.setState(state => ({
      x: state.x +63
    }))
    )
  }

ClickRight() {
     let legth=this.state.images.length-1
    this.state.x <=(-63*legth)
    ? (
        this.setState(state => ({
          x: state.x
        }))
    )
    :
    (
        this.setState(state => ({
          x: state.x -63
        }))
    )
  }



   render() {
      const array=this.state.images.map((e)=>{return (
        console.log(e.id),
        <div key={e.id}  className="SlideShow" style={{transform:`translateX(${this.state.x}%)`}}>
            <div className="Slide">
                          
                            <div className="Hinhanh">
                            <img src={e.src}></img>
                            <b><p>{e.tieude}</p></b>
                            <button type="button" className="btn">Chọn</button>
                            <button type="button">Xem</button>
                            <button type="button">Xóa</button>
                            </div>
            </div>
        </div> 
        )})
    return (
        <div className="container">
            <div className="head">
            <input type="file"></input>
            <button type="button"> Upload</button>
            <div className="search">
            <input type="text" placeholder="Search"></input>
            </div>
            </div>
        <div className="SlideShowmain">
                { 
                    ///// cách 1
                    // this.state.images.map((e)=>{
                    //     return(
                    //         <div key={e.id}  className="Slide" style={{transform:`translateX(${this.state.x}%)`}}  >
                    //         <div className="Hinhanh">
                    //         <img src={e.src}></img>
                    //         <p>{e.tieude}</p>
                    //         <button type="button" className="btn">Chọn</button>
                    //         <button type="button">Xem</button>
                    //         <button type="button">Xóa</button>
                    //         </div>

                    //         <div className="Hinhanh">
                    //         <img src={e.src}></img>
                    //         <p>{e.tieude}</p>
                    //         <button type="button" className="btn">Chọn</button>
                    //         <button type="button">Xem</button>
                    //         <button type="button">Xóa</button>
                    //         </div>

                    //         </div>
                    //         )

                    
                    // })


                }

                {array}
            <button className="left" onClick={this.ClickLeft}><i className="material-icons">navigate_before</i></button>

            <button className="right" onClick={this.ClickRight}><i className="material-icons">navigate_next</i></button>
        </div>

        
   </div>
    );
  }
}
export default SlideShow;