import React, { Component } from 'react';
import Main from './Components/Main/Main'
import SignIn from './Components/SignIn/SignIn'
import firebase from 'firebase/app'


class App extends Component {
  // constructor(props) {
  //   super(props)

  //   // this.state = {
  //   //   user: null
  //   // }
  // }

  componentWillMount() {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if(user) {
          const { uid, email, displayName } = user
          this.setState({ 
            user: {
              uid, email, displayName
            }
          })
        } else {
          this.setState({ user: null })
        }
      })
  }

  render() {
    if(this.state) {
      if(this.state.user) {
        return <Main user={this.state.user} />
      } else {
        return (
          <div className="container">
            <div className="text-center">
              <SignIn />             
            </div>
    
          </div>
        )
      }
    } else {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <h4 style={{color: '#8d6e63'}}>Loading...</h4>
        </div>
      )
    }
  }
}

export default App;
