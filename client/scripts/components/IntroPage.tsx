import * as React from 'react';

interface IntroPageProps {
    onStart: () => void;
};

export const IntroPage = (props: IntroPageProps) => <div>
    <div id="game_start" onClick={props.onStart}>
        <img width="17%" height="17%" src="Game3.png" />
        <h4>let the game begin!</h4>
    </div>
    <div id="rules">
        <img width="17%" height="17%" src="Rules.png" />
        <h4>Rules</h4>
    </div>
</div>;
