import React, { Component } from 'react';
import Pokemon from './Pokemon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    button: {
        fontSize: '2.0rem'
    }
});

class PokemonDelete extends Component{

    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => { // 바인딩 처리가 무엇인지 = () => 찾아보기
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deletePokemon(id) {
        const url = '/api/pokemon/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    //Dialog 태그는 open이 필수적 16강 15분
    render() {
        const { classes } = this.props;

        return (
            <div>
            <Button className={classes.button} variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}> 
                <DialogTitle onClose={this.handleClose}>
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        선택한 포켓몬 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e) => {this.deletePokemon(this.props.id)}}>삭제</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
            </div>
        )

    }
}

export default withStyles(styles)(PokemonDelete);