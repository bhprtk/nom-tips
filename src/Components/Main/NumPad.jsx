import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    button: {
        border: 'none',
        color: '#8d6e63',
        fontSize: 32,
        margin: 10,
        '&:focus': {
          outline: 0
        },
      },
      doneButton: {
        border: 'none',
        color: '#8d6e63',
        fontSize: 32,
        margin: 10,
        '&:focus': {
          outline: 0
        },
      }
})

class NumPad extends Component {
    render() {
        const { classes, click, done } = this.props
        return (
            <Grid container spacing={3} justify='center'>
                <Grid item>
                    <ButtonGroup fullWidth>
                        <Button 
                            onClick={click}
                            value={1}
                            className={classes.button}>1</Button>
                        <Button 
                            onClick={click}
                            value={2}
                            className={classes.button}>2</Button>
                        <Button 
                            onClick={click}
                            value={3}
                            className={classes.button}>3</Button>
                    </ButtonGroup>
                    <ButtonGroup fullWidth>
                        <Button 
                            onClick={click}
                            value={4}
                            className={classes.button}>4</Button>
                        <Button 
                            onClick={click}
                            value={5}
                            className={classes.button}>5</Button>
                        <Button 
                            onClick={click}
                            value={6}
                            className={classes.button}>6</Button>
                    </ButtonGroup>
                    <ButtonGroup fullWidth>
                        <Button 
                            onClick={click}
                            value={7}
                            className={classes.button}>7</Button>
                        <Button 
                            onClick={click}
                            value={8}
                            className={classes.button}>8</Button>
                        <Button 
                            onClick={click}
                            value={9}
                            className={classes.button}>9</Button>
                    </ButtonGroup>
                    <ButtonGroup fullWidth>
                        <Button 
                            onClick={click}
                            value={'del'}
                            className={classes.button}>&#8249;</Button>
                        <Button 
                            onClick={click}
                            value={0}
                            className={classes.button}>0</Button>
                        <Button 
                            onClick={done}
                            className={classes.doneButton}>&#10003;</Button>
                    </ButtonGroup>
                    
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(NumPad)