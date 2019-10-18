import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Form, FormControl, Row, Col, Card, Button, Carousel, Navbar, Nav, NavDropdown } from 'react-bootstrap'


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
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Filter" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Top Rated</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Most Popular</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">New Releases</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Coming Soon</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Form inline onSubmit={() => props.getTMBD(props.query)} onChange={event => props.setQuery(event.target.value)} >
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
          <Nav.Link href="#deets">More deets</Nav.Link>
          <Nav.Link eventKey={2} href="https://www.dictionary.com/e/slang/dank-meme/">
            Dank memes
            </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

// function ToastMessage() {
//   const [showA, setShowA] = useState(true);
//   const toggleShowA = () => setShowA(!showA);
//   return (
//     // <Row>
//     //   <Col xs={6}>
//         <Toast className="toast" show={showA} onClose={toggleShowA}>
//           <Toast.Header>
//             <img
//               src="holder.js/20x20?text=%20"
//               className="rounded mr-2"
//               alt=""
//             />
//             <strong className="mr-auto">Bootstrap</strong>
//             <small>11 mins ago</small>
//           </Toast.Header>
//           <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
//         </Toast>
//     //   </Col>
//     // </Row>
//   )
// }

function MovieCard(props) {
  return (
    <div className="flip-card col-4-md">  
      <Card className="container-fluid  h-100 " style={{ width: '20rem' }}> 
        <div class="flip-card-inner align-items-center ">   
          <div class="flip-card-front mx-auto"> 

            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/original/${props.movie && props.movie.poster_path}`}
            />
          </div>
          <div class="flip-card-back mx-auto">
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
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('')


  useEffect(() => {
    getTMDB()
  }, []);
  const getTMDB = async () => {
    const apiKey = "13aa7028a9a45c7bfe58d96beb50f819"
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&page=${pageNumber}&query=${query}`
    const response = await fetch(url)
    const data = await response.json()
    const currentMovieArray = movies.concat(data.results)
    setMovies(currentMovieArray)
    setPageNumber(pageNumber + 1)
    console.log(currentMovieArray)
  }


  const getSearchResults = async () => {
    const apiKey = "13aa7028a9a45c7bfe58d96beb50f819"
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    const response = await fetch(url)
    const data = await response.json()
    console.log('datatdsearch', data)
    setPageNumber(pageNumber + 1)
  }

  return (
    <div className="App">
      <Navigation
        setQuery={setQuery}
        getSearchResults={getSearchResults}
      />
      {/* <ToastMessage /> */}
      {/* <TopCarousel /> */}
      <div className="row " >
        {movies.map((movie) => {
          return <MovieCard movie={movie} />
        })}
      </div>
      <Row>
        <Col><button onClick={() => getTMDB()} className="btn btn-success">Show More Movies</button></Col>
      </Row>
    </div>
  );
}

export default App;
