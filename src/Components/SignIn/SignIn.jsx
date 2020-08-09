import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    button: {
      background: '#fff',
      border: '2px solid #8d6e63',
      color: '#8d6e63',
      height: 50,
      width: 250,
      marginTop: '35vh',
      textTransform: 'Capitalize',
      '&:hover': {
        outline: 0
      }
    }
})

class SignIn extends Component {
    
    constructor(props) {
        super(props)
        this._signIn = this._signIn.bind(this)
    }

    _signIn = () => {
        console.log('google signin')
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                const { user } = result
                console.log('user', user)
            })
            .catch(error => {
                console.log('Google Sign in error: ', error)
            })
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Button 
                    onClick={this._signIn}
                    variant="outlined" 
                    className={classes.button}>
                    <FontAwesomeIcon icon={faGoogle} />&nbsp;| Google Login
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(SignIn);
