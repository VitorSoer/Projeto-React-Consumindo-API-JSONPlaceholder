import './styles.css';

import { Component } from 'react';
import { loadPosts } from '../../utilities/loadPosts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
      })
      :
      posts;

    return (
      <div className="container">
        <TextInput searchValue={searchValue} handleChange={this.handleChange} />

        {filteredPosts.length > 0 && (<Posts posts={filteredPosts} />)}
        {filteredPosts.length === 0 && (<h1>Not Found...</h1>)}


        {!searchValue &&
          (<Button
            buttonText='Load more Posts'
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />)
        }
      </div>
    )
  };
}

export default Home;
