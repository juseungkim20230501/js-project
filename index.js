// DOMContentLoaded 이벤트를 통해 html document를 전부 읽고 DOM트리를 완성하는 즉시 이벤트가 발생됩니다.
document.addEventListener('DOMContentLoaded', async () => {
    // api를 요청하는 기능을 변수로 저장한뒤 posting 기능이 실행됩니다.
    const get = await getData();
    posting(get);
});

// let movie = [] 전역변수로 사용합니다.
let movie = []

// api를 요청하는 기능입니다.
async function getData() {
    // api 인증키
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2E2MTIwODQ3MGU2NmIxYzQ3NzhmNTc3MDU2YzIzZSIsInN1YiI6IjY0NzMwMTBjYmUyZDQ5MDBmOTk0MDEzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mf7DH--mdOf5roTRGplgCqjABQrKJcgHdqMJoeLHysU'
        }
    };
    // api를 json 형태로 받아와서 변수로 저장합니다.
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    const data = await response.json();
    const source = data['results'];
    movie.push(source)
    return source;
};

// 영화정보를 포스팅해주는 기능입니다.
function posting(movies) {
    // html에 있는 cardsBox를 변수로 설정합니다.
    const cardsBox = document.querySelector('.cardsBox');
    // forEach가 실행되기 전에 cardBox를 비워줍니다.
    cardsBox.innerHTML = '';
    // forEach문을 통해 배열의 요소를 반복합니다.
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
        // forEach문을 통해 반복하며 얻은 정보를 tempHTML 변수로 지정하여 돌때마다 더해줍니다.
        cardsBox.innerHTML += tempHTML;
    })
}

// html에 있는 searchBtn과 searchInput을 변수로 지정합니다.
const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');

// searchBtn 를 클릭했을때 이벤트가 발생합니다.
searchBtn.addEventListener('click', searchMovie);

// searchInput에 엔터를 입력하면 이벤트가 발생합니다.
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchMovie();
    }
})

// 검색 기능입니다.
function searchMovie() {
    // searchInput에 value를 변수로 저장합니다.
    const searchInput = document.querySelector('#searchInput').value;
    const cardsBox = document.querySelector('.cardsBox');
    cardsBox.innerHTML = '';
    movie[0].forEach((data) => {
        // includes를 사용하여 searchInput을 소문자로 변경하고 소문자로 변경된 영화제목에 포함되면 true를 반환합니다.
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