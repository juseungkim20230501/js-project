document.addEventListener('DOMContentLoaded', async () => {
    const get = await getData();
    posting(get);
});

let movie = []

async function getData() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2E2MTIwODQ3MGU2NmIxYzQ3NzhmNTc3MDU2YzIzZSIsInN1YiI6IjY0NzMwMTBjYmUyZDQ5MDBmOTk0MDEzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mf7DH--mdOf5roTRGplgCqjABQrKJcgHdqMJoeLHysU'
        }
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    const data = await response.json();
    const source = data['results'];
    movie.push(source)
    return source;
};

function posting(movies) {
    const cardsBox = document.querySelector('.cardsBox');
    cardsBox.innerHTML = '';
    movies.forEach((a) => {
        let originalTitle = a.original_title
        let overView = a.overview
        let voteAverage = a.vote_average
        let posterPath = a.poster_path
        let id = a.id
        posterPath = 'https://image.tmdb.org/t/p/w300' + posterPath;
        tempHTML = `<div class="cards" onclick="alert('영화 id: ${id}')">
                        <img src="${posterPath}">
                        <div class="details">
                            <h3>${originalTitle}</h3>
                            <p>${overView}</p>
                            <p>Rating : ${voteAverage}</p>
                        </div>
                    </div>`
        cardsBox.innerHTML += tempHTML;
    })
}

const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
searchBtn.addEventListener('click', searchMovie);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchMovie();
    }
})

function searchMovie() {
    const searchInput = document.querySelector('#searchInput').value;
    const cardsBox = document.querySelector('.cardsBox');
    cardsBox.innerHTML = '';
    movie[0].forEach((data) => {
        if (data.original_title.toLowerCase().includes(searchInput.toLowerCase())) {
            let originalTitle = data.original_title
            let overView = data.overview
            let voteAverage = data.vote_average
            let posterPath = data.poster_path
            let id = data.id
            posterPath = 'https://image.tmdb.org/t/p/w300' + posterPath;
            tempHTML = `<div class="cards" onclick="alert('영화 id: ${id}')">
                            <img src="${posterPath}">
                            <div class="details">
                                <h3>${originalTitle}</h3>
                                <p>${overView}</p>
                                <p>Rating : ${voteAverage}</p>
                            </div>
                        </div>`
            cardsBox.innerHTML += tempHTML;
        }
    })
}