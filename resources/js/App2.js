import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';



class App2 extends React.Component {
    // State will apply to the posts object which is set to loading by default

    constructor() {
        super();
        this.state = {
            posts: [],
            isLoading: true,
            errors: null
        };
    }
    // Now we're going to make a request for data using axios
    async getPosts() {
        const response = await axios.get("https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/posts.json");
        try {
          this.setState({
            posts: response.data.posts,
            isLoading: false
          });
        } catch (error) {
          this.setState({ error, isLoading: false });
        }
      }
    // Let's our app know we're ready to render the data
    componentDidMount() {
        this.getPosts();
    }
    // Putting that data to use
    render() {
        const { isLoading, posts } = this.state;
        return (
            <React.Fragment>
                <h2>Random Post</h2>
                <div>
                    {!isLoading ? (
                        posts.map(post => {
                            const { _id, title, content } = post;
                            return (
                                <div key={_id}>
                                    <h2>{title}</h2>
                                    <p>{content}</p>
                                    <hr />
                                </div>
                            );
                        })
                    ) : (
                            <p>Loading...</p>
                        )}
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(App2);