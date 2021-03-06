import React from 'react';
import EPICCamera from '../util/EPICCamera';
import { getHumanDateTime } from '../util/DataFormatter';

const camera = new EPICCamera();
const RIGHT_KEY = 39;
const LEFT_KEY = 37;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      image: null,
      identifier: null,
      imagePath: null,
      imageDate: null,
      imageIndex: null
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    camera
      .getLatestMetadata()
      .then(res => {
        if (!res) return console.error('error fetching image');
        this.setState({ data: res, ...this.updateImage(res.length-1, res) });
      })
  }

  handleKeyDown = (e) => {
    switch(e.keyCode) {
      case RIGHT_KEY:
        this.getNextImage();
        break;
      case LEFT_KEY:
        this.getPrevImage();
        break;
    }
  };

  getNextImage = () => {
    const { imageIndex, data } = this.state;
    if (imageIndex >= data.length - 1) return;
    this.setState({ ...this.updateImage(imageIndex + 1, data) });
  }

  getPrevImage = () => {
    const { imageIndex, data } = this.state;
    if (imageIndex <= 0) return;
    this.setState({ ...this.updateImage(imageIndex - 1, data) });
  }

  updateImage = (imageIndex, data) => {
    const { image, identifier } = data[imageIndex];
    const imagePath = camera.getMedImageFilePath(image, identifier);
    const imageDate = camera.getImageDate(identifier);
    return { imageIndex, image, identifier, imagePath, imageDate };
  };

  handleRangeChange = e => {
    console.log(e.target.value);
    const { data } = this.state;
    this.setState({ ...this.updateImage(e.target.value, data) });
  }

  render() {
    const { imagePath, identifier } = this.state;
    let backgroundStyle = {};
    let dateTime = '';
    if (imagePath) {
      backgroundStyle = {
        backgroundImage: `url(${imagePath})`
      };
      dateTime = getHumanDateTime(identifier);
    }

    return (
      <div className="space_background" style={backgroundStyle}>
        <div className="info">
          image taken on: {dateTime}
          <div className="controls">
            <span className="info_arrows">
              use keyboard or click arrows to move in time:
            </span>
            <span className="arrows">
              <i onClick={this.getPrevImage} className="large material-icons">arrow_back</i>
              <i onClick={this.getNextImage} className="large material-icons">arrow_forward</i>
            </span>
            <div className="range_wrapper">
              <input orient="horizontal" type="range" min="0" id="range" max="19" onChange={e => this.handleRangeChange(e)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}