import './styles.css';

import { PostCard } from '../PostCard/Index';

export const Posts = ({ posts }) => (
    <section className='posts'>
        {
            posts.map(post => (
                <PostCard
                    cover={post.cover}
                    key={post.id}
                    title={post.title}
                    body={post.body}
                />
            ))
        }
    </section>
)