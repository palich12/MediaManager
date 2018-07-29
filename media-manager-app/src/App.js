import React, { Component } from 'react';
import './App.css';
import MediaBlaock from './MediaBlock';

class App extends Component {

  constructor(props){
    super(props);
    this.readFile = this.readFile.bind(this);
    this.imageSelector = React.createRef();

    this.state = {Mediablocks:[]};
  }

  readFile(event) {

    if (this.imageSelector.current.files && this.imageSelector.current.files[0]) {
      
      var FR= new FileReader();
      
      FR.addEventListener("load", (e) => {

        var image = new Image(); 
        image.onload = () => {

          var mbs = document.querySelectorAll(".media-block");
          var offsetTop = 0
          for(var i = 0; i < mbs.length; i++){
            var b = mbs[i].offsetTop+mbs[i].offsetHeight;
            if(b > offsetTop){
              offsetTop = b;
            }
          }
          offsetTop += 10;

          this.state.Mediablocks.push(
            {
              key: this.state.Mediablocks.length.toString(),
              src: e.target.result,
              imageW: image.width,
              imageH: image.height,
              offsetTop: offsetTop
            });
          this.setState(this.state);
        };
        image.src = e.target.result; 
      }); 
      
      FR.readAsDataURL( this.imageSelector.current.files[0] );
    }
    
  }

  render() {

    const MediaBlocks = this.state.Mediablocks.map((data) =>
      <MediaBlaock key={data.key} data={data}/>
    );

    return (
      <div className="App">
        <header className="App-header">
          <input  type="file"  
                  ref={this.imageSelector}
                  onChange={this.readFile} />
        </header>
        <div className="editor-field"> 
          {MediaBlocks}
        </div>
        
      </div>
    );
  }
}

export default App;
