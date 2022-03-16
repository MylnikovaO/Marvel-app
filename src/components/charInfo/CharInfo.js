import { useEffect } from 'react';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';
import { useState } from 'react/cjs/react.development';
import { Link } from 'react-router-dom';



const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const { error, loading, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        clearError();
        const { charId } = props;
        if (!charId) {
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const skeleton = char || loading || error ? null : <Skeleton />;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
        <div className='char__info'>
            {spinner}
            {errorMessage}
            {skeleton}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }
    return (
        <>
            <div className='char__basics'>
                <img src={thumbnail} alt='abyss' style={imgStyle} />
                <div>
                    <div className='char__info-name'>{name}</div>
                    <div className='char__btns'>
                        <a href={homepage} className='button button__main'>
                            <div className='inner'>homepage</div>
                        </a>
                        <a href={wiki} className='button button__secondary'>
                            <div className='inner'>Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className='char__descr'>
                {description}
            </div>
            <div className='char__comics'>Comics:</div>

            <ul className='char__comics-list'></ul>
            {comics.length > 0 ? null : 'There is no comics with this character'}
            {
                comics.map((item, i) => {
                    // eslint-disable-next-line
                    if (i > 9) return;
                    return (
                        <li key={i} className='char__comics-item'>
                            <Link to={`/comics/${item.resourceURI.match(/\d/g).join('').slice(1)}`}>
                                {item.name}
                            </Link>

                        </li>
                    )
                })
            }
            <ul />
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}
View.propTypes = {
    char: PropTypes.object.isRequired
}
export default CharInfo;