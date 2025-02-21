import React, { useEffect, useState, useContext } from 'react';
import { List, Spin, Pagination, Alert } from 'antd';
import MovieCards from '../MovieCards/MovieCards';
import { fetchMovies, getRatedMovies, rateMovie } from '../../API/api';
import { GenresContext } from '../App/App';

const MovieList = ({ searchQuery, guestSessionId, rated = false }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const genres = useContext(GenresContext);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = rated
          ? await getRatedMovies(guestSessionId, currentPage)
          : await fetchMovies(searchQuery, currentPage);
        setMovies(data.results);
        setTotalResults(data.total_results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [searchQuery, currentPage, rated, guestSessionId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRateChange = async (movieId, value) => {
    await rateMovie(guestSessionId, movieId, value);
  };

  return (
    <div
      className="movie-list-container"
      style={{ width: '100%', maxWidth: '1010px' }}
    >
      {' '}
      {}
      {loading ? (
        <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <>
          {movies.length > 0 ? (
            <>
              <List
                className="movie-grid"
                grid={{
                  gutter: 16,
                  column: 2,
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 2,
                }}
                dataSource={movies}
                renderItem={(movie) => (
                  <List.Item
                    className="movie-item"
                    style={{ width: '450px', height: '280px' }}
                  >
                    <MovieCards
                      movie={movie}
                      genres={genres}
                      onRateChange={handleRateChange}
                    />
                  </List.Item>
                )}
                style={{
                  display: 'flex',
                  justifyContent:
                    rated && movies.length === 1
                      ? 'flex-start'
                      : 'space-between',
                  width: '100%',
                }}
              />
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Pagination
                  current={currentPage}
                  total={totalResults}
                  pageSize={20}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  style={{ display: 'inline-block' }}
                />
              </div>
            </>
          ) : (
            <Alert
              message="No movies found."
              type="info"
              style={{ marginTop: 20 }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MovieList;
