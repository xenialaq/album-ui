import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faDownload } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { getPhotoById } from '../actions';

const select = ({ photosData, baseUrl }, { photoId }) => ({ baseUrl, photo: photosData[photoId] });
const mapDispatchToProps = (dispatch) => ({
  getPhotoById: (id) => dispatch(getPhotoById(id)),
});
class Thumbnail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('componentWillMount', this.props);
    this.props.getPhotoById(this.props.photoId);
  }

  render() {
    const { photo, baseUrl } = this.props;
    if (!photo) {
      return (
        <div className="card" style={{ width: '18rem', marginBottom: '2rem' }}>
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      );
    }
    return (
      <div className="card" style={{ width: '18rem', marginBottom: '2rem' }}>
        <img src={`${baseUrl + photo.thumb}?d=${photo.thumbSize}`} alt={photo.name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{photo.name}</h5>
          <div className="d-flex justify-content-between">
            <a href={`${baseUrl + photo.url}`} className="card-link">
              <FontAwesomeIcon icon={faDownload} />
            </a>
            <small>{`${photo.size.width} x ${photo.size.height}`}</small>
            <small>{`${photo.size.onDisk}`}</small>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(select, mapDispatchToProps)(Thumbnail);
