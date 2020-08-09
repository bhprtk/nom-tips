import React, { Component } from 'react'

class DisplayTotal extends Component {
    render() {
        const { tips } = this.props
        let tipsArr = Object.keys(tips).filter(pos => pos !== "made")
        return (
            <div 
                style={{ 
                    width: '100%'
                }}>
                 <hr/>

                {tipsArr.map((pos, index) => (
                    <p 
                        style={{
                            textTransform: 'capitalize',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        key={index}>
                            <span>{`${pos}:`}</span>
                            <span>{`$${tips[pos]}`}</span>
                    </p>
                ))}
            </div>
        )
    }
}

export default DisplayTotal