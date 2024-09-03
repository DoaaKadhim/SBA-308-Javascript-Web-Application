

const apiKey = 'f2d4eca442e483f78f19f886f68b97c2';
const base_url = 'https://api.themoviedb.org/3';

document.addEventListener('DOMContentLoaded', () => {
  const movieCategorySelect = document.getElementById('movieCategorySelect');
  if (movieCategorySelect) {
    movieCategorySelect.addEventListener('change', loadMoviesByCategory);
  }

  loadMoviesByCategory();

  const getFavouritesBtn = document.getElementById('getFavouritesBtn');
  if (getFavouritesBtn) {
    getFavouritesBtn.addEventListener('click', () => {
      document.getElementById('movieDisplayContainer').style.display = 'none';
      document.getElementById('favoritesContainer').style.display = 'block';
      document.getElementById('backToMoviesBtn').style.display = 'block';
      updateFavoritesDisplay();
    });
  }

  const backToMoviesBtn = document.getElementById('backToMoviesBtn');
  if (backToMoviesBtn) {
    backToMoviesBtn.addEventListener('click', () => {
      document.getElementById('favoritesContainer').style.display = 'none';
      document.getElementById('movieDisplayContainer').style.display = 'block';
      backToMoviesBtn.style.display = 'none';
    });
  }
});

async function getRequestToken() {
  const response = await fetch(`${base_url}/authentication/token/new?api_key=${apiKey}`);
  const data = await response.json();
  return data.request_token;
}

async function createSession(requestToken) {
  const response = await fetch(`${base_url}/authentication/session/new?api_key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ request_token: requestToken })
  });
  const data = await response.json();
  return data.session_id;
}

async function deleteFavoriteMovie(sessionId, movieId) {
  const response = await fetch(`${base_url}/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: movieId,
      favorite: false
    })
  });
  const data = await response.json();
  return data;
}

async function loadMoviesByCategory() {
  const movieCategorySelect = document.getElementById('movieCategorySelect');
  const selectedCategory = movieCategorySelect ? movieCategorySelect.value : 'popular';
  let endpoint;
  let params = {
    api_key: apiKey,
    language: 'en-US',
    page: 1
  };

  switch (selectedCategory) {
    case 'scaryMovies':
      endpoint = '/discover/movie';
      params.with_genres = 27; // Horror genre ID
      break;
    case 'familyMovies':
      endpoint = '/discover/movie';
      params.with_genres = 10751; // Family genre ID
      break;
    case 'kidsMovies':
      endpoint = '/discover/movie';
      params.with_genres = [16, 10751]; // Animation (16) and Family (10751) genre IDs
      break;
    default:
      endpoint = '/movie/popular';
  }

  try {
    const response = await axios.get(`${base_url}${endpoint}`, { params });
    console.log('API Response:', response.data);
    const movies = response.data.results;

    const container = document.getElementById('movieDisplayContainer');
    if (!container) {
      console.error('Element with id "movieDisplayContainer" not found');
      return;
    }

    if (movies && movies.length > 0) {
      container.innerHTML = movies.map(movie =>
        `<div class="movie-item mb-3">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" style="width: 200px; height: auto;">
                    <p>${movie.title} (${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'})</p>
                    <button class="favorite-btn btn ${isFavorite(movie.id) ? 'btn-success' : 'btn-outline-primary'}" data-id="${movie.id}">
                        ${isFavorite(movie.id) ? 'Unfavorite' : 'Favorite'}
                    </button>
                </div>`
      ).join('');

      container.querySelectorAll('.favorite-btn').forEach(button => {
        const movieId = button.getAttribute('data-id');
        button.addEventListener('click', () => toggleFavorite(movieId, button));
      });
    } else {
      console.log('No movies found for this category.');
      container.innerHTML = '<p>No movies found.</p>';
    }
  } catch (error) {
    console.error('Error loading movies by category:', error);
  }
}

async function updateFavoritesDisplay() {
  try {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    console.log('Favourites List:', favourites);

    const favoritesList = document.getElementById('favoritesContainer');
    if (!favoritesList) {
      console.error('Element with id "favoritesContainer" not found');
      return;
    }

    const template = document.getElementById('carouselItemTemplate').content;
    const carouselInner = document.getElementById('carouselInner');
    if (!carouselInner) {
      console.error('Element with id "carouselInner" not found');
      return;
    }

    carouselInner.innerHTML = ''; // Clear the current carousel

    if (favourites.length === 0) {
      carouselInner.innerHTML = '<p>No favorites selected yet.</p>';
      return;
    }

    for (let movieId of favourites) {
      try {
        const response = await axios.get(`${base_url}/movie/${movieId}`, {
          params: {
            api_key: apiKey,
            language: 'en-US'
          }
        });
        console.log('API Response for Favorite Movie:', response.data);
        const movie = response.data;

        if (!movie.poster_path || !movie.title) {
          console.error('Invalid movie data:', movie);
          continue;
        }

        const clone = document.importNode(template, true);
        const img = clone.querySelector('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;

        const favButton = clone.querySelector(".favourite-button");
        favButton.setAttribute('data-id', movie.id);
        favButton.classList.add('active');

        favButton.addEventListener("click", () => {
          toggleFavorite(movie.id);
          updateFavoritesDisplay();
        });

        carouselInner.appendChild(clone);
      } catch (error) {
        console.error('Error fetching favorite movie data:', error);
      }
    }
  } catch (error) {
    console.error('Error updating favorites display:', error);
  }
}

async function toggleFavorite(movieId) {
  try {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    const favBtn = document.querySelector(`button[data-id="${movieId}"]`);

    if (favourites.includes(movieId)) {
      // Remove from favorites
      favourites = favourites.filter(id => id !== movieId);
      if (favBtn) favBtn.textContent = 'Favorite';

      // Remove from local favorites list
      localStorage.setItem('favourites', JSON.stringify(favourites));

    } else {
      // Add to favorites
      favourites.push(movieId);
      if (favBtn) favBtn.textContent = 'Unfavorite';
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }

    console.log(`Favorites updated: ${JSON.stringify(favourites)}`);
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
}

function isFavorite(movieId) {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  return favourites.includes(movieId);
}