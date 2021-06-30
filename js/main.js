const API_KEY = 'api_key=f329bd0d4b596891f3f9ae62b68ea7cc'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=f329bd0d4b596891f3f9ae62b68ea7cc'
const trending = 'https://api.themoviedb.org/3/trending/movie/week?' +API_KEY
const treiler = 'https://www.youtube.com/results?search_query='

const buttonElement = document.querySelector('#search')
const inputElement = document.querySelector('#inputValue')
const imgElement = document.querySelector('#main')

buttonElement.onclick = function(event) {
    event.preventDefault()
    const value = inputElement.value

    const newUrl = SEARCH_URL + '&query=' + value

        if (value){
        fetch(newUrl)
            .then(res => res.json())
            .then(data => {
                showMovies(data.results)        
            })
        }
        else {
            return getMovies(API_URL)
        }
    }
    console.log(API_URL)


getMovies(API_URL)

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showMovies(data.results)
        })
}

function showMovies(data) {
    main.innerHTML = ''
      

    data.sort((a, b) => (a.vote_average > b.vote_average) ? -1 : 1)

    data.forEach(movie => {
        const { title, poster_path, vote_average,overview, release_date } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
           <img id="img" src="${IMG_URL + poster_path}" alt="${title}">
           
          <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getColor(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
          <h3>Overview</h3>
          ${overview}
          <h4>Release date:${release_date}</h4>
          <br>
          <a href=" ${treiler} + ${title}">Click to see the trailer</a>
      </div>
      
      
      `
        main.appendChild(movieEl)
    })
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 6) {
        return 'orange'
    } else {
        return 'red'
    }
}



