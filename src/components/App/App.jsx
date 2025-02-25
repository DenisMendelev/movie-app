import React, { useEffect, useState, createContext } from 'react';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import MovieList from '../MovieLists/MovieLists';
import Header from '../Header/Header';
import { createGuestSession, fetchGenres, rateMovie } from '../../API/api';

export const GenresContext = createContext();

const App = () => {
  const [searchQuery, setSearchQuery] = useState('return');
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [genres, setGenres] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [userRatings, setUserRatings] = useState({});
  const [searchPage, setSearchPage] = useState(1);
  const [ratedPage, setRatedPage] = useState(1);

  useEffect(() => {
    const initializeApp = async () => {
      const sessionId = await createGuestSession();
      setGuestSessionId(sessionId);
      const genresData = await fetchGenres();
      setGenres(genresData);
    };

    initializeApp();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleRateChange = async (movieId, value) => {
    try {
      const result = await rateMovie(guestSessionId, movieId, value);
      console.log('Rating success:', result);
      setUserRatings((prev) => ({
        ...prev,
        [movieId]: value,
      }));
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  const handleSearchPageChange = (page) => {
    setSearchPage(page);
  };

  const handleRatedPageChange = (page) => {
    setRatedPage(page);
  };

  return (
    <GenresContext.Provider value={genres}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890FF',
            borderRadius: 8,
          },
        }}
      >
        <div
          className="app-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '1010px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
          }}
        >
          <Header
            onSearch={handleSearch}
            activeTab={activeTab}
            onChangeTab={handleTabChange}
          />
          <div className="movie-list-wrapper" style={{ width: '100%' }}>
            {activeTab === '1' && (
              <MovieList
                searchQuery={searchQuery}
                guestSessionId={guestSessionId}
                userRatings={userRatings}
                onRateChange={handleRateChange}
                currentPage={searchPage}
                onPageChange={handleSearchPageChange}
              />
            )}
            {activeTab === '2' && (
              <MovieList
                searchQuery={searchQuery}
                guestSessionId={guestSessionId}
                rated
                userRatings={userRatings}
                onRateChange={handleRateChange}
                currentPage={ratedPage}
                onPageChange={handleRatedPageChange}
              />
            )}
          </div>
        </div>
      </ConfigProvider>
    </GenresContext.Provider>
  );
};

export default App;
