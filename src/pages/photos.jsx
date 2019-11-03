import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import { getPhotos } from '../actions';
import Thumbnail from '../components/thumbnail';

const select = ({ photos, pages, currentPage }) => ({ photos, pages, currentPage });
const mapDispatchToProps = (dispatch) => ({
  getPhotos: (page) => dispatch(getPhotos((page - 1) * 10, 10)),
});

class Photos extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      match: { params: { page: pageParam } }, pages,
    } = this.props;
    const page = Math.min(pages || 9999, pageParam ? parseInt(pageParam, 10) : 1);
    this.props.getPhotos(page);
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: { page: pageParam } }, pages,
    } = this.props;
    const page = Math.min(pages || 9999, pageParam ? parseInt(pageParam, 10) : 1);
    const {
      match: { params: { page: pageParam2 } }, pages2,
    } = prevProps;
    const page2 = Math.min(pages2 || 9999, pageParam2 ? parseInt(pageParam2, 10) : 1);
    if (page !== page2) {
      this.props.getPhotos(page);
    }
  }

  render() {
    const {
      match: { params: { page: pageParam } }, photos, pages,
    } = this.props;
    const page = Math.min(pages || 9999, pageParam ? parseInt(pageParam, 10) : 1);
    return (
      <div className="container">
        <div className="row">
          {
            photos.map((photo) => (
              <div key={photo} className="col">
                <Thumbnail photoId={photo} />
              </div>
            ))
          }
        </div>
        <div className="row d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              { page > 2 ? <li className="page-item"><Link className="page-link" to="/photos/1">1</Link></li> : null }
              { page > 3 ? <li className="page-item"><span className="page-link">...</span></li> : null }
              { page > 1 ? <li className="page-item"><Link className="page-link" to={`/photos/${page - 1}`}>{page - 1}</Link></li> : null }
              <li className="page-item active"><Link className="page-link" to={`/photos/${page}`}>{page}</Link></li>
              { page < pages ? <li className="page-item"><Link className="page-link" to={`/photos/${page + 1}`}>{page + 1}</Link></li> : null }
              { page < pages - 2 ? <li className="page-item"><span className="page-link">...</span></li> : null }
              { page < pages - 1 ? <li className="page-item"><Link className="page-link" to={`/photos/${pages}`}>{pages}</Link></li> : null }
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default (connect(select, mapDispatchToProps)(Photos));
