const styles = () => ({
    button: {
        border: '2px solid #8d6e63',
        color: '#8d6e63',
        fontSize: 20,
        margin: 20,
        height: 50,
        width: 250,
        textTransform: 'Capitalize',
        '&:focus': {
          outline: 0
        },
      },
    tipsInputDisplay: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '90vh',
        alignItems: 'center',
        textAlign: 'center'
    }
})

export default styles