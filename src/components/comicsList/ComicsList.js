import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsLict) => {
        let ended = false;
        if (newComicsLict.length < 8) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsLict])
        setNewComicsLoading(newComicsLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended)
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className='comics__item'
                    key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className='comics__item-img' />
                        <div className='comics__item-name'>{item.title}</div>
                        <div className='comics__item-price'>{item.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className='comics__grid'>
                {items}
            </ul>
        )
    }
    const items = renderItems(comicsList);

    const spinner = loading && !newComicsLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className='comics__list'>
            {spinner}
            {errorMessage}
            {items}
            <button className='button button__main button__long'
                disabled={newComicsLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className='inner'>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;