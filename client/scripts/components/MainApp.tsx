import * as React from 'react';
import { IntroPage } from './IntroPage';
import { Game } from './Game';

export class MainApp extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            isRunning: false,
        }
    }

    start = () => {
        this.setState({
            isRunning: true,
        });
    } 

    render() {
        return (
            <div>
                <h1>Simple Othello</h1>
                {this.state.isRunning ? <Game/> : <IntroPage onStart={this.start} />}
            </div>);
    }
}
