import React, { Component } from 'react'

class DisplayPayPeriodTotal extends Component {
    render() {
        const { tipsMade, tipOuts } = this.props
        return (
            <div 
                style={{ 
                    width: '100%'
                }}>
                 <hr/>
                <p 
                    style={{
                        textTransform: 'capitalize',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <span>Tips Made</span>
                        <span>$ {tipsMade}</span>
                </p>
                <p 
                    style={{
                        textTransform: 'capitalize',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <span>Tip Outs</span>
                        <span>$ {tipOuts}</span>
                </p>

            </div>
        )
    }
}

export default DisplayPayPeriodTotal