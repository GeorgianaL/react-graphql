import React, { Component } from 'react';

import ImageSlide from './ImageSlide';
import Arrow from './Arrow';

import img1 from '../../../public/img1.jpeg';
import img2 from '../../../public/img2.jpg';
import img3 from '../../../public/img3.jpg';

import './style.scss';

const imgUrls = [ img1, img2, img3 ];

class Carousel extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      'currentImageIndex': 0,
    };

    this.carouselNode = null;
    this.previousSlide = this.previousSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  previousSlide () {
     const lastIndex = imgUrls.length - 1;
     const { currentImageIndex } = this.state;
     const shouldResetIndex = currentImageIndex === 0;
     const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;

     this.setState({
       currentImageIndex: index
     });
 }

 nextSlide () {
     const lastIndex = imgUrls.length - 1;
     const { currentImageIndex } = this.state;
     const shouldResetIndex = currentImageIndex === lastIndex;
     const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

     this.setState({
       currentImageIndex: index
     });
 }

  render() {
    return (
      <div className="carousel" ref={node => this.carouselNode = node}>
        <Arrow
          direction="left"
          clickFunction={ this.previousSlide }
          glyph="&#9664;"
        />
        <ImageSlide url={ imgUrls[this.state.currentImageIndex] } />
        <Arrow
          direction="right"
          clickFunction={ this.nextSlide }
          glyph="&#9654;"
        />
      </div>
    );
  }
}

export default Carousel;
