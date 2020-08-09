import React, { Component } from 'react'

class DisplayValue extends Component {
    render() {
        return (
            <p style={{
                fontSize: 160,
                color: '#8d6e63'
            }}>
                <sup>$</sup>{this.props.displayValue}
            </p>
        )
    }
}

export default DisplayValue