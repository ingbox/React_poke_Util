import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import PokemonDelete from './PokemonDelete';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    tableCell: {
        fontSize: '2.0rem'
    }
});

class Pokemon extends Component{ 
    render(){
        const { classes } = this.props;

        return(
            <TableRow>
                <TableCell className={classes.tableCell}>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt='profile'/></TableCell>
                <TableCell className={classes.tableCell}>{this.props.name}</TableCell>
                <TableCell className={classes.tableCell}>{this.props.type}</TableCell>
                <TableCell className={classes.tableCell}>{this.props.classi}</TableCell>
                <TableCell className={classes.tableCell}>{this.props.descr}</TableCell>
                <TableCell><PokemonDelete stateRefresh={this.props.stateRefresh} id = {this.props.id}/></TableCell>
                {/* <CustomerProfile name={this.props.name} id={this.props.id} image={this.props.image}/>
                <CustomerInfo gender={this.props.gender} job={this.props.job}/> */}
            </TableRow>
        );
    }

}

export default withStyles(styles)(Pokemon);