import React, { Component } from 'react';

class MediaBlock extends Component {
    constructor(props){
        super(props);
        this.state = props.data;

        this.mainElement = React.createRef();
        this.image = React.createRef();
        this.startDrag = this.startDrag.bind(this);
        this.endAction = this.endAction.bind(this);
        this.draging = this.draging.bind(this);
        this.startResize = this.startResize.bind(this);
        this.resizing = this.resizing.bind(this);

        this.offsetX = 0;
        this.offsetY = 0;
        this.offsetLeft = 0;
        this.offsetTop = 0;
        this.offsetWidth = 0;
        this.offsetHeight = 0;
        this.isDraging = false;
        this.isResizing = false;

        this.imageW = 0;
        this.imageH = 0; 
    }

    startDrag(event){

        if(event.target !== this.mainElement.current){
            return;
        }

        event.stopPropagation();
        this.isDraging =true;
        this.offsetX = this.mainElement.current.offsetLeft - event.clientX;
        this.offsetY = this.mainElement.current.offsetTop - event.clientY;
    }

    endAction(event){
        this.isDraging =false;
        this.isResizing = false;
    }

    draging(event){
        if(this.isDraging){
            event.stopPropagation();
            this.mainElement.current.style.left = (event.clientX + this.offsetX) + 'px';
            this.mainElement.current.style.top  = (event.clientY + this.offsetY) + 'px';
        }
    }

    startResize(event){
        event.stopPropagation();
        this.isResizing = true;
        this.offsetX = this.mainElement.current.offsetWidth - event.clientX;
        this.offsetY = this.mainElement.current.offsetHeight - event.clientY;
        this.offsetLeft = this.mainElement.current.offsetLeft;
        this.offsetTop = this.mainElement.current.offsetTop;
        this.offsetWidth = this.mainElement.current.offsetWidth;
        this.offsetHeight = this.mainElement.current.offsetHeight;
    }

    resizing(event){
        if(this.isResizing){
            event.stopPropagation();
            var newW = event.clientX + this.offsetX;
            var newH = event.clientY + this.offsetY;
            

            if(event.target.className.indexOf("-left") > 0){
                var dW = this.offsetWidth - newW;
                this.mainElement.current.style.width = (this.offsetWidth+dW) + 'px';
                this.mainElement.current.style.left = (this.offsetLeft-dW)+ 'px';
            }
            else{
                this.mainElement.current.style.width   = newW  + 'px';
            }
            if(event.target.className.indexOf("-top") > 0){
                var dH = this.offsetHeight - newH;
                this.mainElement.current.style.height = (this.offsetHeight+dH) + 'px';
                this.mainElement.current.style.top = (this.offsetTop-dH)+ 'px';
            }
            else{
                this.mainElement.current.style.height  = newH + 'px';
            }
        }
    }

    
      render() {
    
        const state = this.state;
        var mediaBlockSize = {
            width: state.imageW,
            height: state.imageH,
            top: state.offsetTop
          };
        return (
            <div    className="media-block" 
                    ref={this.mainElement}
                    style={mediaBlockSize}
                    onMouseDown={this.startDrag}
                    onMouseUp={this.endAction}
                    onMouseMove={this.draging}
                    onMouseLeave={this.endAction}>
                <img    alt=""  
                        src={state.src}
                        ref={this.image}/>
                <div className="edit-squere edit-squere-top-left"
                    onMouseDown={this.startResize}
                    onMouseUp={this.endAction}
                    onMouseMove={this.resizing}
                    onMouseLeave={this.endAction}>
                </div>
                <div className="edit-squere edit-squere-top-right"
                    onMouseDown={this.startResize}
                    onMouseUp={this.endAction}
                    onMouseMove={this.resizing}
                    onMouseLeave={this.endAction}>
                </div>
                <div className="edit-squere edit-squere-bottom-left"
                    onMouseDown={this.startResize}
                    onMouseUp={this.endAction}
                    onMouseMove={this.resizing}
                    onMouseLeave={this.endAction}></div>
                <div className="edit-squere edit-squere-bottom-right"
                    onMouseDown={this.startResize}
                    onMouseUp={this.endAction}
                    onMouseMove={this.resizing}
                    onMouseLeave={this.endAction}>
                </div>
            </div>
        );
      }
    }
    
    export default MediaBlock;