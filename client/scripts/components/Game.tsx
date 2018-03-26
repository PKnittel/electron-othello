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
    }

    constructor(props) {
        super(props);

        this.initialize();
        this.state = {
            isFinished: false,
            currentPlayer: this.player1,
            field: this.field.getField(),
        }
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
            {field.map(this.renderRow)}
        </table>);
    }

    renderRow(row: [Stone]) {
        return (
            <tr>
                {row.map((stone) => <td>{stone ? stone.getPlayer() : '-'}</td>)}
            </tr>
        );
    }
};
