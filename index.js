const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2E2MTIwODQ3MGU2NmIxYzQ3NzhmNTc3MDU2YzIzZSIsInN1YiI6IjY0NzMwMTBjYmUyZDQ5MDBmOTk0MDEzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mf7DH--mdOf5roTRGplgCqjABQrKJcgHdqMJoeLHysU'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));