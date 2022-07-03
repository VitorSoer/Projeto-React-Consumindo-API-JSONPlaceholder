import './styles.css';

export const TextInput = ({ searchValue, handleChange }) => {
    return (
        <div className='input-container'>
            <h2>Search Bar:</h2>
            <input
                type="search"
                value={searchValue}
                onChange={handleChange}
                className="inputField"
                placeholder='Search Here...'
            />
        </div>
    )
}