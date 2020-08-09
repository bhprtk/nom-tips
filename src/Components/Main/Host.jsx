import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
import CustomTips from './CustomTips'

class Host extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            customTips: false
        }

        this._submitTips = this._submitTips.bind(this)
    }

    _submitTips = e => {
        const { value } = e.currentTarget
        this.props.addTips('host', value, 'dish')
    }

    _customTips = () => {
        this.setState({ customTips: true })
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <div className={classes.tipsInputDisplay}>
                    <h3 
                        style={{
                            color: '#8d6e63',
                            marginBottom: 40
                        }}>
                        How much are you tipping the host?
                    </h3>
                    
                    <Button 
                        onClick={this._submitTips}
                        value={0.03}
                        className={classes.button}>3%</Button>
                    {this.state.customTips ?
                        <CustomTips initialTip={3} submitTips={this._submitTips} />
                        :
                        <Button 
                            onClick={this._customTips}
                            className={classes.button}>Custom</Button>
                    }
                    <Button 
                        onClick={this._submitTips}
                        value={0}
                        className={classes.button}>No Host</Button>

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Host)