import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import DisplayPayPeriodTotal from './DisplayPayPeriodTotal'

class DisplayPayPeriods extends Component {
    render() {
        const { payPeriods } = this.props
        return (
            <div>
                {Object.keys(payPeriods).map((payPeriod, index) => (
                    <ExpansionPanel
                        style={{
                            margin: 20,
                            border: '2px solid #8d6e63',
                            boxShadow: 'none',
                            color: '#8d6e63',
                            fontSize: 20
                        }} 
                        key={index}>
                        <ExpansionPanelSummary>
                                <div 
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: 50
                                    }}>
                                    <span>
                                        <FontAwesomeIcon icon={faHourglassStart} />&nbsp;| {payPeriod}
                                    </span>

                                </div>

                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <DisplayPayPeriodTotal 
                                tipsMade={payPeriods[payPeriod].tipsMade} 
                                tipOuts={payPeriods[payPeriod].tipOuts} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </div>
        )
    }
}

export default DisplayPayPeriods