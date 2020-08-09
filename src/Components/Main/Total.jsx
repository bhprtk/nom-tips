import React, { Component } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app'
import 'firebase/firestore'

const styles = () => ({
    button: {
        border: '2px solid #8d6e63',
        color: '#8d6e63',
        fontSize: 20,
        textTransform: 'capitalize',
        width: '50%',
        margin: 20,
        '&:focus': {
            outline: 0
        },
      }
})

class Total extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            db: firebase.firestore(),
            date: moment().format('MMM Do ddd'),
            currentPayPeriod: Object.assign({}, null)
        }

        this._reset = this._reset.bind(this)
        this._save = this._save.bind(this)
    }

    _reset = () => {
        setTimeout(() => {this.props.transition('addTips')}, 250)
    }

    _save = () => {
        const { made, busser, host, dish, bartender } = this.props.tips
        const { db, date } = this.state
        const { user } = this.props
        let obj = {}
        obj[date] = { made, busser, host, dish, bartender }
        this._getCurrentGlobalPayPeriod()
        db
            .collection("users")
            .doc(`${user.email}`)
            .collection("tips")
            .doc(`${date}`)
            .set({ made, busser, host, dish, bartender })
            .then(() => {
                this.props.saveSuccess()
            })
            .catch(error => {
                console.log('Error saving: ', error)
            })
    }


    _getCurrentGlobalPayPeriod = () => {
        const { db, date } = this.state

        db
            .collection("payPeriods")
            .doc("current")
            .get() // Get the current Global pay period.
            .then(snap => {
                let currentStart = moment(snap.data().start, 'MMM Do ddd')
                let currentEnd = moment(snap.data().end, 'MMM Do ddd')
                let today = moment(date, 'MMM Do ddd')
                if(today.isAfter(currentEnd, 'days')) { // Compare today to the Global pay period.
                    let start = currentStart.add(14, 'days').format('MMM Do ddd')
                    let end = currentEnd.add(14, 'days').format('MMM Do ddd')
                    this._startNewGlobalPayPeriod({ start ,end }) 
                    this._checkUserPayPeriod({ start , end })
                } else {
                    this._checkUserPayPeriod({ start: currentStart, end: currentEnd })
                }
               
            })
    }

    _checkUserPayPeriod = ({ start, end }) => {
        const { db } = this.state
        const { email } = this.props.user

        db
            .collection("users")
            .doc(`${email}`)
            .collection("payPeriods")
            .doc(`${start.format('MMM Do ddd')} - ${end.format('MMM Do ddd')}`)
            .get()
            .then(snap => {
                if(snap.exists) {
                    this._incrementUserCurrentPayPeriod({ start, end })
                } else {
                    this._createNewUserPayPeriod({ start, end })
                }
            }) 

    }

    _incrementUserCurrentPayPeriod = ({ start, end }) => {
        console.log('start', start)
        console.log('end', end)
        const { db } = this.state
        const { email } = this.props.user
        const { made, busser, host, dish, bartender } = this.props.tips
        let tipOuts = busser + host + dish + bartender
        db
            .collection("users")
            .doc(`${email}`)
            .collection("payPeriods")
            .doc(`${start.format('MMM Do ddd')} - ${end.format('MMM Do ddd')}`)
            .update({ 
                tipsMade: firebase.firestore.FieldValue.increment(made), 
                tipOuts: firebase.firestore.FieldValue.increment(tipOuts)
            })
            .then(() => {
                console.log(`Pay period updated for ${email}`)
            })
            .catch(err => {
                console.log(`Error in updating pay period for ${email}`, err)
            })
    }

    _createNewUserPayPeriod = ({ start, end }) => {
        const { db } = this.state
        const { email } = this.props.user
        const { made, busser, host, dish, bartender } = this.props.tips
        console.log('this.props.tips', this.props.tips)
        db
            .collection("users")
            .doc(`${email}`)
            .collection("payPeriods")
            .doc(`${start.format('MMM Do ddd')} - ${end.format('MMM Do ddd')}`)
            .set({ 
                tipsMade: made, 
                tipOuts: busser + host + dish + bartender
            })
            .then(() => {
                console.log('New pay period made for user')
            })
            .catch(err => {
                console.log("Error in making new pay period for user", err)
            })
    }

    _startNewGlobalPayPeriod = ({ start, end }) => {
        const { db } = this.state
        const { email } = this.props.user
        db
            .collection("payPeriods")
            .doc("current")
            .set({ end, start })
            .then(() => {
                console.log('New pay period set!')
            })
            .catch(err => {
                console.log('Error setting new pay period!', err)
            })

    }

    render() {
        const { classes, tips } = this.props
        const { date } = this.state
        // console.log('this.state.currentPayPeriod', this.state.currentPayPeriod)

        let tipsArr = Object.keys(tips).filter(pos => pos !== "made")
        const { made } = tips
        return (
            <div
                style={{
                    color: '#8d6e63',
                    marginTop: '15vh',
                    lineHeight: 1,
                }} 
                className="container">
                <h3 
                    style={{
                        marginBottom: 40
                    }}>
                    <FontAwesomeIcon icon={faCalendarDay} />&nbsp;| {date}
                </h3>
                <h4
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span>You made:</span>
                        <span>${made}</span>
                 </h4>
                 <hr/>

                {tipsArr.map((pos, index) => (
                    <h4 
                        style={{
                            textTransform: 'capitalize',
                            marginTop: 20,
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                        key={index}>
                            <span>{`${pos}:`}</span>
                            <span>{`$${tips[pos]}`}</span>
                    </h4>
                ))}
                <hr/>
                <div 
                    style={{
                        display: 'flex',
                        width: '100%'
                    }}>
                    <Button 
                        onClick={this._reset}
                        className={classes.button}>Reset</Button>
                    <Button 
                        onClick={this._save}
                        className={classes.button}>Save</Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Total)