import React from 'react';
import ReactDOM from 'react-dom/client';

export class Bookings extends React.Component {

  constructor(props) {
    super(props)

    this.state = {bookings: []};

    // This binding is necessary to make `this` work in the callback
    this.bookingsList = this.bookingsList.bind(this);
    
  }

  bookingsList(bookings) {
    const listItems = bookings.map((booking) =>
    <tr>
      <td>{booking.hotel_id}</td>
      <td>{booking.user_id}</td>
      <td>{booking.start_date}</td>
      <td>{booking.end_date}</td>
    </tr>
      
    );

    return (
      <tbody>{listItems}</tbody>
    );
  }

  componentDidMount() {
    fetch('http://127.0.0.1:4000/home/bookings')
      .then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        this.setState({bookings: data}); 
      });
    }

  render() {
    return(
      <div className='booking-list'>
        <table>
          <thead>

            <th>Hotel name</th>
            <th>User Name</th>
            <th>Start Date</th>
            <th>End date</th>
          </thead>
          
          {this.bookingsList(this.state.bookings)}
        </table>
      </div>
    )
  }
}

