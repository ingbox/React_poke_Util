import React, { Component } from 'react';
import './App.css';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Pokemon from './components/Pokemon';
import PokemonAdd from './components/PokemonAdd';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@material-ui/core/Typography';
import { styled, alpha } from '@mui/material/styles';
import { fade } from '@material-ui/core/styles/colorManipulator'



/*
컴포넌트 불러오는 순서(Life Cycle)
1. constructor()
2. componentWillMount() 컴포넌트가 마운트 되기 전
3. render()
4. componentDidMount() 

업데이트 되었을 때는
5. shouldComponentUpdate()
 
*/

const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto'
    minWidth: 1080
  },
  // 고객 데이터가 담기는
  paper: {
    marginLeft : 18,
    marginRight: 18,
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  tableHead: { 
    fontSize: '2.0rem'
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center',
  }
}
);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: ''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  componentDidMount() { // 모든 컴포넌트가 Mount가 된 후 실행됨 & 일부로 지연을 시켜서 ProgressBar가 나오는지 확인해보자(callAPI 함수 지워버리기)
    this.timer = setInterval(this.progress, 20); 
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/pokemon');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 }) // 100이 되는 순간 0으로 줄어들 수 있도록
  }

  //Filter 기능
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render(){
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Pokemon stateRefresh={this.stateRefresh} key={c.id} image={c.image} name={c.name} type={c.type} classi={c.classi} descr={c.descr}/>
      })
    }
    const { classes } = this.props;
    const cellList = ["도감번호", "이미지", "이름", "타입", "분류", "설명", "설정"]
   
      return(
        <div className={classes.root}>
           <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          > 
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            포켓몬 도감
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="검색하기"
              inputProps={{ 'aria-label': 'search' }}
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
            />
          </Search>
        </Toolbar>
      </AppBar>

        {/* 추가하기 버튼 */}
      <div className={classes.menu}>
        <PokemonAdd stateRefresh = {this.stateRefresh}/>
      </div>

        {/* 여기서부터는 테이블 내용들 */}
      <Paper className={classes.paper}>
        <Table className={classes.table}> 
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
             {this.state.customers ?
              filteredComponents(this.state.customers) :  
              <TableRow>
                <TableCell colSpan= "6" align="center">
                  <CircularProgress className={classes.progress} variant="indeterminate" value={this.state.completed}/> 
                </TableCell>
              </TableRow> } 
              {/* 아무것도 없을 때에는 ProgressBar 출력 Animation = value */}
          </TableBody>   
        </Table>
    </Paper>
    
    </div>
    );
  }
}

export default withStyles(styles)(App);
