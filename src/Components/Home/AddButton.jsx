import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'
import styles from '../Main/styles'


class AddButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            db: firebase.firestore(),
            date: moment().format('MMM Do ddd')
        }

        this._addTips = this._addTips.bind(this)
    }

    _addTips = () => {
        const { db, date } = this.state
        const { user, tipsExists } = this.props
        db
            .collection("users")
            .doc(`${user.email}`)
            .collection("tips")
            .doc(`${date}`)
            .get()
            .then(snap => {
                if(snap.exists) {
                    tipsExists()
                } else {
                    setTimeout(() => {this.props.transition('addTips')}, 250)
                }
            })        
    }

    render() {
        const { classes } = this.props
        return (
            <div className="text-center">
                <Button 
                    onClick={this._addTips}
                    variant="outlined" 
                    className={classes.button}>
                    <FontAwesomeIcon icon={faMoneyBillAlt} />&nbsp;| Add Tips
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(AddButton)
