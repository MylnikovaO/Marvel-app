import AppHeader from '../appHeader/AppHeader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';
import ErrorPage from '../pages/404';
import SingleComicPage from '../pages/SingleComicPage';

const App = () => {

    return (
        <Router>
            <div className='app'>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/comics' element={<ComicsPage />} />
                        <Route path='/comics/:comicId' element={<SingleComicPage />} />
                        <Route path='*' element={< ErrorPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;