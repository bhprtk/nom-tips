import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import styles from '../Main/styles'
import * as actions from '../../actions/creators'

class TipsHistoryButton extends Component {

    constructor(props) {
        super(props)

        this._transition = this._transition.bind(this)
    }

    _transition = () => {
        this.props.actions.getTipsHistory()
        // this.props.getTipsHistory()
        setTimeout(() => {this.props.transition("tipsHistory")}, 250)
    }

    render() {
        const { classes } = this.props
        return (
            <div className="text-center">
              
                <Button 
                    onClick={this._transition}
                    variant="outlined" 
                    className={classes.button}>
                    <FontAwesomeIcon icon={faHistory} />&nbsp;| Tips History
                </Button>
            </div>
        )
    }
}

const TipsHistoryButtonWithStyles = withStyles(styles)(TipsHistoryButton)

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TipsHistoryButtonWithStyles)
