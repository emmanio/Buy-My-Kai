import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { sendNeighbourhood } from '../../actions/area'
import { mapDraw } from '../../actions/mapDraw'

import MapDrawer from '../MapDrawer/MapDrawer'
import Nav from '../Nav/Nav'
import { selectUser } from '../../actions/userprofile'

import logo from '../../images/logo-4.png'
import '../../styles/styles.css'

import './styles.css'

const DEFAULT_CENTER = [-36.848, 174.763]

class Area extends Component {
  state = {
    suburb: ''
  }

  handleClick() {
    const suburb = this.state.suburb
    this.sendNeighbourhood(suburb)
    this.setState({
      suburb: ''
    })
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendNeighbourhood() {
    const suburb = this.state.suburb
    this.props.dispatch(sendNeighbourhood(suburb))
  }

  openDrawer() {
    this.props.dispatch(mapDraw())
  }

  handleUser(id) {
    this.props.dispatch(selectUser(id))
  }

  render() {
    const growers = this.props.growersList || []
    const center = growers.length ? [growers[0].lat, growers[0].long] : DEFAULT_CENTER

    return (
      <div className="area">
        <MapDrawer />
        <div className="header">
          <Link to='/'>
            <img className="pure-img area-logo" src={logo} />
          </Link>
          <div className='nav-bar'>
            <Nav />
          </div>
        </div>
        <div className="container pure-u-1">
          <div className="pure-img background-profile"></div>
          <div className="pure-form pure-u-1">
            <h2>Search For Growers</h2>
            <div className="pure-form pure-u-1">
              <input
                type="text"
                className="pure-input-rounded"
                placeholder="Suburb e.g. Belmont"
                name='suburb'
                margin="normal"
                value={this.state.suburb}
                onChange={(e) => this.handleChange(e)} />
              <button className="btn btn-primary" onClick={(e) => this.handleClick(e)}>SEARCH</button>
            </div></div>
          <div className="map">
            <Map className="Leaflet" center={center} zoom={13}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {growers.length && growers.map(({
                user_id,
                lat,
                long,
                hours,
                name,
                description,
                email,
                category,
                product_name
              }) => (
                  <Marker onClick={() => this.handleUser(user_id)} key={user_id} position={[lat, long]}>
                    <Popup className="popupMap">
                      <Button className="popupButton" value={user_id} onClick={this.openDrawer.bind(this)}>{product_name}</Button>
                    </Popup>
                  </Marker>
                ))}
            </Map>
          </div>
          <div className='backtotop  pure-u-1'>
            <a href="#top"><h5> Return to top <i className="fas fa-caret-up"></i></h5></a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    growersList: state.areaReducer.growersList
  }
}
export default connect(mapStateToProps)(Area)
