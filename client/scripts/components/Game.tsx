import * as React from 'react';
import { Field } from '../field';
import { Player } from '../player';
import { Color } from '../constants';
import { Stone } from '../stone';

export class Game extends React.Component<any, any> {

    private field: Field;
    private player1: Player = new Player(Color.black);
    private player2: Player = new Player(Color.white);

    private initialize = () => {
        this.field = new Field(8);
        this.state = {
            isFinished: false,
            currentPlayer: this.player1,
            field: this.field.getField(),
        }
    }

    constructor(props) {
        super(props);

        this.initialize();
    }

    nextTurn = () => {
        this.setState({
            currentPlayer: this.state.currentPlayer === this.player1 ? this.player2 : this.player1,
            field: this.field.getField(),
        });
    }

    render() {
        return (
            <div>
                <h2>Current Player: {Color[this.state.currentPlayer.getColor()]}</h2>

                {this.renderField()}
            </div>
        );
    }

    renderField() {
        const { field } = this.state;
        return (<table>
            {field.map(this.renderRow.bind(this))}
        </table>);
    }

    renderRow(row: [Stone], rowNumber: number) {
        const styles = [{
            cursor: 'pointer',
            'background-color':  'white',
        }, {
            cursor: 'pointer',
            'background-color':  'orange',
        }, {
            cursor: 'pointer',
        }];
        const clickListener = this.clickField.bind(this);
        return (
            <tr>
                {row.map((stone: Stone, lineNumber: number) => 
                    <td> <div style={stone ? styles[stone.getPlayer()] : styles[2]} onClick={() => clickListener(lineNumber, rowNumber)}>{stone ? stone.getPlayer() : '-'}</div></td>)}
            </tr>
        );
    }

    componentDidUpdate() {        
        if(this.field.isComplete()) {
            setTimeout(() => alert('Game finished'), 0);
            return;
        }
        if(!this.field.possibleTurnAvailable(this.state.currentPlayer.getColor())) {
            setTimeout(() => alert(`Player ${Color[this.state.currentPlayer.getColor()]}: There is no possible turn!`), 0);
            this.nextTurn();
        }
    }

    clickField = (x: number, y: number) => {
        const wasSuccesfull = this.field.putStone({x:x, y:y}, new Stone(this.state.currentPlayer.getColor()));
        
        if(wasSuccesfull) {
            this.nextTurn();
        }
    }
};
