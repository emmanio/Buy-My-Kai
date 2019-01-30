import React from 'react'
// import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { sendProduct } from '../../actions/products'
import { Button } from '@material-ui/core'

export class Addproduct extends React.Component {
  state = {
    productName: '',
    price: '',
    quantity: '',
    productDescription: '',
    organic: false,
    freerange: false,
    productSubmitted: false
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOrganic() {
    this.setState({
      organic: !this.state.organic
    })
  }

  handleFreerange() {
    this.setState({
      freerange: !this.state.freerange
    })
  }

  handleSubmit() {
    this.props.dispatch(sendProduct(this.state))
    this.setState({
      productSubmitted: !this.state.productSubmitted,
      productName: '',
      price: '',
      quantity: '',
      productDescription: ''
    })
  }

  render() {
    const state = state
    return (
      <div className='container pure-u-1'>
        <div className="pure-form pure-u-1">
          <div className='productname'>
            <input
              type="text"
              className="pure-input-rounded"
              name='productName'
              value={state.productName}
              placeholder='Product name'
              onChange={() => this.handleChange}></input>
          </div>
          <div className='price'>
            <input
              type="text"
              className="pure-input-rounded"
              name='price'
              value={state.price}
              placeholder='Price'
              onChange={() => this.handleChange}></input>
          </div>
          <div className='price'>
            <input
              name='quantity'
              className="pure-input-rounded"
              value={state.quantity}
              placeholder='Quantity'
              onChange={() => this.handleChange}></input>
          </div>
          <div className='price'>
            <textarea
              name='productDescription'
              className="pure-input-rounded"
              value={state.productDescription}
              placeholder='Description'
              onChange={() => this.handleChange} />
          </div>
          <div className="organic">
            <h5>Organic</h5>
            <input
              className="checkbox"
              type='checkbox'
              name='organic'
              value={state.organic}
              onClick={() => this.handleOrganic}></input>
          </div>
        </div>

        <Button className='btn btn-third' onClick={this.handleSubmit}>Done</Button>
        <div>{state.productSubmitted ? <h5>Successfully added</h5> : <div></div>}</div>
      </div>
    )
  }
}

export default connect()(Addproduct)
