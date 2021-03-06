import React, { Component } from 'react';
import './App.css';
import EventList from './components/EventList';

const api = 'https://fraud-api.herokuapp.com/events'

class App extends Component {

  state = {
    events: []
  }

  componentDidMount = async () => {
    const eventsJSON = await fetch(api);
    const events = await eventsJSON.json();
    this.setState({...this.state, events});
  }

  toggleFraud = async (event) => {
    if (event.fraud === null) {
      event.fraud = true
    } else if (event.fraud === true) {
      event.fraud = false
    } else {
      event.fraud = null
    }
    await fetch(api + '/' + event.id, {
      headers: {  'Content-Type': 'application/json' },
      method: "PATCH",
      body: JSON.stringify(event)
    })
    this.setState({})
  }

  render() {
    return (
      <div className='container'>
        <h3>Fraud Monitor</h3>
        <EventList events={this.state.events} toggleFraud={this.toggleFraud} />
      </div>
    );
  }
}

export default App;
