import React, { useEffect, useState, createContext } from 'react';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd'; // Добавляем ConfigProvider для стилизации
import MovieList from '../MovieLists/MovieLists';
import Header from '../Header/Header';
import { createGuestSession, fetchGenres } from '../../API/api';

export const GenresContext = createContext();

const App = () => {
  const [searchQuery, setSearchQuery] = useState('return');
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [genres, setGenres] = useState([]);
  const [activeTab, setActiveTab] = useState('1');

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

  return (
    <GenresContext.Provider value={genres}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890FF', // Фиолетовый для активных элементов, как на макете
            borderRadius: 8,
          },
        }}
      >
        <div
          className="app-container" // Добавляем класс для CSS
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '1010px', // Десктопная ширина
            margin: '0 auto', // Центрируем весь контент
            padding: '20px',
            backgroundColor: '#f5f5f5', // Светлый фон, как на макете
            minHeight: '100vh', // Заполняем всю высоту экрана
          }}
        >
          <Header
            onSearch={handleSearch}
            activeTab={activeTab}
            onChangeTab={handleTabChange}
          />
          <div className="movie-list-wrapper" style={{ width: '100%' }}>
            {' '}
            {/* Обеспечиваем фиксированную ширину для MovieList */}
            {activeTab === '1' && (
              <MovieList
                searchQuery={searchQuery}
                guestSessionId={guestSessionId}
              />
            )}
            {activeTab === '2' && (
              <MovieList
                searchQuery={searchQuery}
                guestSessionId={guestSessionId}
                rated
              />
            )}
          </div>
        </div>
      </ConfigProvider>
    </GenresContext.Provider>
  );
};

export default App;
