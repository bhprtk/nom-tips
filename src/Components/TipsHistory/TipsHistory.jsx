import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import DisplayTotal from './DisplayTotal'
import moment from 'moment'

class TipsHistory extends Component {
    render() {
        const { tipsHistory } = this.props
        const sortedDates = Object.keys(tipsHistory).sort((a,b) => moment(b, 'MMM Do ddd') - moment(a, 'MMM Do ddd'))
        return (
            <div>
                {sortedDates.map((date, index) => (
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
                                        <FontAwesomeIcon icon={faCalendarDay} />&nbsp;| {date}
                                    </span>
                                    <span>${tipsHistory[date].made}</span>

                                </div>

                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                           <DisplayTotal tips={tipsHistory[date]} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </div>
        )
    }
}

export default TipsHistory