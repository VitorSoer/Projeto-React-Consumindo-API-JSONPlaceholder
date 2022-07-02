import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');


    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    })

    this.setState({ posts: postsAndPhotos });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="container">
        <section className='posts'>
          {
            posts.map(post => (
              <div className='posts__content'>
                <img src={post.cover} alt='Description' />
                <div key={post.id}>
                  <h1>{post.title}</h1>
                  <p>{post.body}</p>
                </div>
              </div>
            ))
          }
        </section>
      </div>
    )
  };
}

export default App;
