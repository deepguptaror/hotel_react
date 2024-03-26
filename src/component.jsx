import React from 'react';
import ReactDOM from 'react-dom/client';

export class Hotels extends React.Component {

  constructor(props) {
    super(props)

    this.state = {hotels: [], hotel_id: undefined, hotel_name: undefined};

    // This binding is necessary to make `this` work in the callback
    this.hotelsList = this.hotelsList.bind(this);
    this.searchHotels = this.searchHotels.bind(this);
    this.handleBookClick = this.handleBookClick.bind(this);
    
  }

  componentDidMount() {
    fetch('http://127.0.0.1:4000')
      .then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        this.setState({hotels: data}); 
      });
    }

  hotelsList(hotels) {
    const listItems = hotels.map((hotel) =>
      <HotelCard key={hotel.id} id={hotel.id} name={hotel.name} desc={"Hello this is " + hotel.name + " and this hoteal has number of rooms is " + hotel.no_of_rooms} location={hotel.location} handleClick={this.handleBookClick.bind(this)} />
    );

    return (
      <div>{listItems}</div>
    );
  }

  handleBookClick(e) {
    e.preventDefault();
    this.setState({hotel_id: e.target.getAttribute('data-value'), hotel_name: e.target.getAttribute('data-name') });
    console.log(this.state)
  }

  searchHotels(event) {
    fetch('http://127.0.0.1:4000/home/index?query=' + event.target.value)
      .then((res) => {
        return res.json();
      }).then((data) => {
        this.setState({hotels: data})
      });
  }

  render() {
    let form;
    if (this.state.hotel_id) {
      form = <BookingForm name={this.state.hotel_name} id={this.state.hotel_id} />;
    } 

    return (
      <div className="container">

        <div className='search-box'>
          <input onKeyUp={this.searchHotels} type='text' placeholder='Search String'/>
        </div>
        
        <div className='hotel-list'>
          {this.hotelsList(this.state.hotels)}
        </div>

        <div className='booking-box-container' id='booking-box-container'>
          {form}
          
        </div>

        
      </div>
  	);
  }
}


export class HotelCard extends React.Component {

  constructor(props) {
    super(props);
    this.bookHotel = this.bookHotel.bind(this);
  }

  bookHotel(e) {
    e.preventDefault();
    console.log("it is a hotel Booking")
  }

  render() {
    return(
      <div className='hotel-card' id='hotel_id'>
        <h2>{this.props.name}</h2>
        <p>{this.props.desc}</p>
        <p>{this.props.location}</p>
        <a href={this.props.id} data-value={this.props.id} data-name={this.props.name} onClick={this.props.handleClick} > Book</a>
      </div>
    )
  }
}


export class BookingForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleChnage = this.handleChnage.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {id: this.props.id ,name: this.props.name , start_date: '', end_date: ''}
  }

  handleChnage(event) {
    if(event.target.name === 'start_date') {
      this.setState({start_date: event.target.value});
    } else if(event.target.name === 'end_date') {
      this.setState({end_date: event.target.value});
    }
  }

  submitForm(event) {
    event.preventDefault();
    fetch("http://127.0.0.1:4000/home/book_hotel?id=" + this.state.id + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date)
      .then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        this.setState = (() => ({hotels: data}))
      });
    console.log('form is submitted')

  }
  
  render() {
    return(
      <div className='booking-box'>
        <h1>Book {this.state.name}</h1>
        <form onSubmit={this.submitForm} >
          
          <label>Start Date</label>
          <input type='text' value={this.state.start_date} name='start_date' placeholder='MM/DD/YYYY' onChange={this.handleChnage}/>

          <br/><br/>

          <label>End Date</label>
          <input type='text' value={this.state.end_date} name='end_date' placeholder='MM/DD/YYYY' onChange={this.handleChnage}/>
          <br/><br/>

          <input type='submit' />
          <input type='button' value="Hide Form" name='Hide Form' />
        </form>
      </div>
    )
  }
}

