//서버와의 통신 목적의 라이브러리 Axios 다운

import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none',
        minWidth: 1080,
     
    },
    button: {
        fontSize: '2.0rem'
    }
});

class PokemonAdd extends React.Component {

    constructor(props){ // 변수 선언
        super(props);
        this.state = {
            file: null,
            name: '',
            type: '',
            classi: '',
            descr: '',
            fileName: '',
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            name: '',
            type: '',
            classi: '',
            descr: '',
            fileName: '',
            open: false
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/pokemon';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.name);
        formData.append('type', this.state.type);
        formData.append('classi', this.state.classi);
        formData.append('descr', this.state.descr);
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    handleClickOpen = () => { // 바인딩 처리가 무엇인지 = () => 찾아보기
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            name: '',
            type: '',
            classi: '',
            descr: '',
            fileName: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;

        return(
            <div>
                <Button className={classes.button} variant= "contained" color="primary" onClick={this.handleClickOpen}>포켓몬 추가하기</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>포켓몬 추가</DialogTitle>
                <DialogContent>
                    <input className= {classes.hidden} accept="image/*" id="raised-button-file" type="file" file = {this.state.file} value = {this.state.fileName} onChange= {this.handleFileChange}/>< br/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {this.state.fileName === "" ? "프로필 이미지 선택": this.state.fileName}
                        </Button>
                    </label>
                    <br/>
                    <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
                    <TextField label="타입" type="text" name="type" value={this.state.type} onChange={this.handleValueChange}/><br/>
                    <TextField label="분류" type="text" name="classi" value={this.state.classi} onChange={this.handleValueChange}/><br/>
                    <TextField label="설명" type="text" name="descr" value={this.state.descr} onChange={this.handleValueChange}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
            </div>
            /*
            <form onSubmit = { this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file = {this.state.file} value = {this.state.fileName} onChange= {this.handleFileChange}/>< br/>
                이름: <input type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
                타입: <input type="text" name="type" value={this.state.type} onChange={this.handleValueChange}/><br/>
                분류: <input type="text" name="classi" value={this.state.classi} onChange={this.handleValueChange}/><br/>
                설명: <input type="text" name="descr" value={this.state.descr} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
            */
        );
    }
}

export default withStyles(styles)(PokemonAdd);