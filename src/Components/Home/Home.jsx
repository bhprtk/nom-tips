import React, { Component } from 'react'
import AddButton from './AddButton'
import PayPeriodsButton from './PayPeriodsButton'
import TipsHistoryButton from './TipsHistoryButton'

class Home extends Component {
    render() {
        return (
            <div 
                className="text-center"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100vh',
                }}    
            >
                <span>
                    <img 
                        src="nom-logo.png"
                        height="200px"
                        width="200px"    
                    />

                </span>
                <span>
                    <h1
                        style={{
                            color: '#8d6e63',
                            marginTop: 20
                        }}>TIPS</h1>

                </span>
                <span>
                    <AddButton 
                        transition={this.props.transition} 
                        user={this.props.user} 
                        tipsExists={this.props.tipsExists} />

                </span>
                <span>
                    <TipsHistoryButton 
                        transition={this.props.transition} 
                        getTipsHistory={this.props.getTipsHistory}
                    />

                </span>
                <span>
                    <PayPeriodsButton 
                        transition={this.props.transition} 
                        getPayPeriods={this.props.getPayPeriods}
                    />

                </span>

            </div>
        )
    }
}

export default Home