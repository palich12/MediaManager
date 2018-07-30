import React, { Component } from 'react';
import './App.css';
import MediaBlaock from './MediaBlock';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class App extends Component {

  constructor(props){
    super(props);
    this.readFile = this.readFile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.imageSelector = React.createRef();

    this.state = {
      Mediablocks:[],
      modalIsOpen: false
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.submitYoutubeUrl = this.submitYoutubeUrl.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateYoutubeUrl = this.updateYoutubeUrl.bind(this);
    this.youtubeUrl = "";
  }

  updateYoutubeUrl(event){
    this.youtubeUrl = event.target.value;
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  submitYoutubeUrl(){
    this.closeModal();
    this.uploadImage(this.getThumbnail(this.youtubeUrl), "youtube");
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  getThumbnail(url) {

    if (url === null) {
      return '';
    }
    var results = url.match('[\\?&]v=([^&#]*)');
    var video   = (results === null) ? url : results[1];
    return 'https://img.youtube.com/vi/' + video + '/0.jpg';
  }

  readFile(event) {

    if (this.imageSelector.current.files && this.imageSelector.current.files[0]) {
      
      var FR= new FileReader();
      
      FR.addEventListener("load", (e) => {
        this.uploadImage(e.target.result, "file");
      }); 
      
      FR.readAsDataURL( this.imageSelector.current.files[0] );
    }
    
  }

  uploadImage(url, type){
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
              src: url,
              imageW: image.width,
              imageH: image.height,
              offsetTop: offsetTop,
              type: type
            });
          this.setState(this.state);
        };
        image.src = url; 
  }

  render() {

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    const MediaBlocks = this.state.Mediablocks.map((data) =>
      <MediaBlaock key={data.key} data={data}/>
    );

    return (
      <div className="App">
        <header className="App-header">
          <input  type="file"  
                  ref={this.imageSelector}
                  onChange={this.readFile} />
          <button onClick={this.openModal}>youtube</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Input youtube video url">
            <div>Input youtube video url</div>
            <input  onChange={this.updateYoutubeUrl}/>
            <button onClick={this.submitYoutubeUrl}>Ok</button>
            <button onClick={this.closeModal}>Cancel</button>
          </Modal>
        </header>
        <div className="editor-field"> 
          {MediaBlocks}
        </div>
        
      </div>
    );
  }
}

export default App;
