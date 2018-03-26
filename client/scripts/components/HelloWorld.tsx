import * as React from 'react';

export interface HelloWorldProps {
    name: string;
}

export const HelloWorld = (props: HelloWorldProps) => <h1>Hello {props.name}</h1>;

