import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Form, FormControl, Row, Col, Card, Button, Carousel, Navbar, Nav, NavDropdown, DropdownItem } from 'react-bootstrap'
import {GENRES} from './utils/genres'

function TopCarousel() {
  return (
    <Carousel className="carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/600"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/600"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/600"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}



function Navigation(props) {
  let allGenreIds = []
  props.movies.map(movie => allGenreIds.push(movie.genre_ids))
  allGenreIds = allGenreIds.flat(Infinity) 
  
  let currentGenreList = GENRES.filter(genre => allGenreIds.includes(genre.id))
  
  function genreFilter(id) {
    props.setFilteredMovies(props.movies.filter(movie  =>  movie.genre_ids.includes(id)))
  }


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home"></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#action/3.1" onClick={props.getTopRated}>Top Rated</Nav.Link>
          <Nav.Link href="#action/3.2" onClick={props.getPopular}>Most Popular</Nav.Link>
          <Nav.Link href="#action/3.3" onClick={props.getUpcomingReleases}>Upcoming Releases</Nav.Link>
          <NavDropdown title="Filter" id="collapsible-nav-dropdown" >
            
          
           {currentGenreList.map(genre => {
           return <DropdownItem href="#filter" onClick={() => genreFilter(genre.id)} value={genre.id}>{genre.name}  </DropdownItem>
           })}
             

              
          </NavDropdown>
        </Nav>
        <Nav>
          <Form inline onSubmit={(event) => props.getSearchResults(event)} onChange={event => props.setQuery(event.target.value)} >
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
          
          <Nav.Link eventKey={2} href="https://www.dictionary.com/e/slang/dank-meme/">
            Dank memes
            </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )

}

// function Genres(props) {
//   genreName.map((genre) => {
//   return (
//     <NavDropdown.Item href='#action' >{props.GENRES.name} </NavDropdown.Item>
//   })
// }



function MovieCard(props) {
 

  return (
    <div className="flip-card col-4-md">  
      <Card className="container-fluid  h-100 " style={{ width: '20rem' }}> 
        <div className="flip-card-inner align-items-center ">   
          <div className="flip-card-front mx-auto"> 
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/original/${props.movie && props.movie.poster_path}`}
            />
          </div>
          <div className="flip-card-back mx-auto">
            <Card.Body >  
              <Card.Title>{props.movie.title}</Card.Title>
              <Card.Text>
                {props.movie.overview}
              </Card.Text>
              <Card.Text><h4>Rating: {props.movie.vote_average}/10 </h4> </Card.Text>
              <Button variant="primary">Watch Trailer</Button>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  )
}


function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  console.log("query", query)
  useEffect(() => {
    getTMDB()
  }, []);

  const getTMDB = async () => {
   
    const apiKey = "13aa7028a9a45c7bfe58d96beb50f819"
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNumber} `
    const response = await fetch(url)
    const data = await response.json()
    const currentMovieArray = movies.concat(data.results)
    setMovies(currentMovieArray)
    setFilteredMovies(currentMovieArray)
    setPageNumber(pageNumber + 1)
  }
  

  const getSearchResults = async (event) => {
    event && event.preventDefault()
    console.log('wejewkjdew', query)
    const apiKey = "13aa7028a9a45c7bfe58d96beb50f819"
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    const response = await fetch(url)
    const data = await response.json()
    const currentMovieArray = data.results
    setMovies(currentMovieArray)
    setFilteredMovies(currentMovieArray)
    
  }
 
  const getTopRated = async () => {
    const apiKey = "13aa7028a9a45c7bfe58d96beb50f819"
    const url= `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
    const response = await fetch(url)
    const data = await response.json()
    const currentMovieArray = data.results
    setMovies(currentMovieArray)
    setFilteredMovies(currentMovieArray)
    
  }

  const getUpcomingReleases = async () => {
    const apiKey = "13aa7028a9a45c7bfe58d96beb50f819"
    const url= `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    const response = await fetch(url)
    const data = await response.json()
    const currentMovieArray = data.results
    setMovies(currentMovieArray)
    setFilteredMovies(currentMovieArray)
    
  }

  const getPopular = async () => {
    const apiKey = "13aa7028a9a45c7bfe58d96beb50f819"
    const url= `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    const response = await fetch(url)
    const data = await response.json()
    const currentMovieArray = data.results
    setMovies(currentMovieArray)
    setFilteredMovies(currentMovieArray)
    
  }
  
  return (
    <div className="App">
      <Navigation
        query={query}
        setQuery={setQuery}
        getSearchResults={getSearchResults}
        getTopRated={getTopRated}
        getUpcomingReleases = {getUpcomingReleases}
        getPopular ={getPopular}
        movies={movies}
        setFilteredMovies={setFilteredMovies}
      />
      {/* <ToastMessage /> */}
      {/* <TopCarousel /> */}
      <div className="row" >
        {filteredMovies.map((movie) => {
          return <MovieCard 
          movie={movie} 
         
          />
        })}
      </div>
      <Row>
        <Col><button onClick={() => getTMDB()} className="btn btn-success">Show More Movies</button></Col>
      </Row>
    </div>
  );
}

export default App;
