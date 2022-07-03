import './styles.css';

export const PostCard = ({ cover, title, body }) => {
    return (
        <div className='posts__content'>
            <img src={cover} alt='Description' />
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        </div>
    );
}