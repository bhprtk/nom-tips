import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';


import firebase from 'firebase/app'
import 'firebase/firestore'

import AddButton from '../Home/AddButton'
import AddTips from './AddTips'
import BackButton from './BackButton'
import Bartender from './Bartender'
import Busser from './Busser'
import Dish from './Dish'
import Home from '../Home/Home'
import Host from './Host'
import TipsHistory from '../TipsHistory/TipsHistory'
import Total from './Total'
import DisplayPayPeriods from '../PayPeriods/DisplayPayPeriods';


class Main extends Component {
    
    constructor(props) {
        super(props)
        this._signOut = this._signOut.bind(this)

        this.state = {
            transition: {
                home: true, 
                addTips: false, 
                busser: false, 
                host: false, 
                bartender: false,
                dish: false, 
                total: false,
                tipsHistory: false,
                payPeriods: false,
            },
            tips: {
                made: 0
            },
            currentPage: 'addButton',
            openSnackbar: false,
            tipsExists: false,
            db: firebase.firestore(),
            tipsHistory: Object.assign({}, null),
            payPeriods: Object.assign({}, null),
        }

        this._addTipsMade = this._addTipsMade.bind(this)
        this._addTips = this._addTips.bind(this)
        this._transition = this._transition.bind(this)
        this._saveSuccess = this._saveSuccess.bind(this)
        this._closeSnackbar = this._closeSnackbar.bind(this)
        this._tipsExists = this._tipsExists.bind(this)
        this._closeTipsExists = this._closeTipsExists.bind(this)
        this._getTipsHistory = this._getTipsHistory.bind(this)
        this._getPayPeriods = this._getPayPeriods.bind(this)
    }

    _signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('Sign Out Successful')
            })
            .catch(error => {
                console.log('Sign Out Error: ', error)
            });
    }

    _getPayPeriods = () => {
        const { db } = this.state
        const { email } = this.props.user
        let payPeriods = this.state.payPeriods
        db
            .collection("users")
            .doc(`${email}`)
            .collection("payPeriods")
            .get()
            .then(snap => {
                snap.forEach(doc => {
                    payPeriods[doc.id] = doc.data()
                })
                this.setState({ payPeriods })
            })
            .catch(error => {
                console.log('Read database error', error)
            })
    }

    _getTipsHistory = () => {
        const { db } = this.state
        const { user } = this.props
        let tipsHistory = this.state.tipsHistory
        db
            .collection("users")
            .doc(`${user.email}`)
            .collection("tips")
            .get()
            .then(snap => {
                snap.forEach(doc => {
                    tipsHistory[doc.id] = doc.data()
                })
                this.setState({ tipsHistory })
            })
            .catch(error => {
                console.log('Read database error', error)
            })
    }

    _addTipsMade = tipsMade => {
        let tips = { made: tipsMade }
        this.setState({ tips })
        this._transition('busser')
    }

    _addTips = (position, value, transitionTo) => {
        let tips = this.state.tips
        tips[position] = Math.round(tips.made * value)
        this.setState({ tips })
        setTimeout(() => {this._transition(transitionTo)}, 250)
        
    }

    _transition = key => {
        let transition = this.state.transition
        for(let k in transition) {
            transition[k] = (k === key) ? true : false
        }
        this.setState({ transition, currentPage: key })
    }

    _saveSuccess = () => {
        this.setState({ openSnackbar: true })
        this._transition("home")
    }

    _closeSnackbar = () => {
        this.setState({ openSnackbar: false })
    }

    _tipsExists = () => {
        this.setState({ tipsExists: true })
    }

    _closeTipsExists = () => {
        this.setState({ tipsExists: false })
    }

    render() {
        const { transition } = this.state
        return (
            <div>
                {/* <button onClick={this._signOut}>
                    Sign Out
                </button> */}
                {!transition.home && <BackButton currentPage={this.state.currentPage} transition={this._transition} />}
                {transition.home && 
                    <Home 
                        transition={this._transition} 
                        user={this.props.user} 
                        tipsExists={this._tipsExists} 
                        getTipsHistory={this._getTipsHistory} 
                        getPayPeriods={this._getPayPeriods} />  }
                {transition.addTips && <AddTips addTipsMade={this._addTipsMade} tips={this.state.tips.made} />}
                {transition.busser && <Busser transition={this._transition} addTips={this._addTips} />}
                {transition.host && <Host transition={this._transition} addTips={this._addTips} /> }
                {transition.dish && <Dish transition={this._transition} addTips={this._addTips} /> }
                {transition.bartender && <Bartender transition={this._transition} addTips={this._addTips} /> }
                {transition.total && <Total tips={this.state.tips} saveSuccess={this._saveSuccess} user={this.props.user} transition={this._transition} /> }
                {transition.tipsHistory && <TipsHistory tipsHistory={this.state.tipsHistory} /> }
                {transition.payPeriods && <DisplayPayPeriods payPeriods={this.state.payPeriods} /> }
                
                <Snackbar 
                    open={this.state.openSnackbar}
                    autoHideDuration={3000}
                    onClose={this._closeSnackbar}
                    message={<h5>Tips Saved Successfully!</h5>}
                />
                <Snackbar 
                    open={this.state.tipsExists}
                    autoHideDuration={3000}
                    onClose={this._closeTipsExists}
                    message={<h5>Tips already entered for today!</h5>}
                />
            </div>
        )
    }
}

export default Main