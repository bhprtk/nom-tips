import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    backButton: {
        border: '2px solid #8d6e63',
        color: '#8d6e63',
        fontSize: 14,
        margin: 10,
        height: 40,
        width: 120,
        textTransform: 'Capitalize',
        '&:focus': {
          outline: 0
        }
    }
})

class BackButton extends Component {
    constructor(props) {
        super(props)

        this._goBack = this._goBack.bind(this)
    }

    _goBack = () => {
        const { currentPage, transition } = this.props
        switch(currentPage) {
            case 'busser':
                transition('addTips')
                break;
            case 'host':
                transition('busser')
                break;
            case 'dish':
                transition('host')
                break;
            case 'bartender':
                transition('dish')
                break;
            case 'total':
                transition('bartender')
                break;
            case 'addTips':
                transition('home')
                break;
            case 'tipsHistory':
                transition('home')
                break;
            case 'payPeriods':
                transition('home')
                break;
            default:
                
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Button 
                    onClick={this._goBack}
                    variant="outlined" 
                    className={classes.backButton}>
                    <FontAwesomeIcon icon={faChevronLeft} />&nbsp;| Go Back
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(BackButton)