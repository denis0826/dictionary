import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query : ''
    };
  }

  onChange = (e) => {
    this.setState({ query: this.search.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const post = {
      query: this.state.query
    };
    //REDUX WAY
    this.props.createPost(post);

    //REACT WAY OF FETCHING DATA
    // fetch('/search', { 
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(post)
    // })
    // .then((response) => response.json());

  }

  render() {
    return (
      <div>
        <h1>Search</h1>
        <form action="search" method="POST" onSubmit={this.onSubmit}>
          <div>
            <label>Search for... </label>
            <br />
            <br />
            <input
              placeholder="Search for..."
              type="text"
              ref={input => this.search = input}
              onChange={this.onChange}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
};

export default connect(null, { createPost })(PostForm);
