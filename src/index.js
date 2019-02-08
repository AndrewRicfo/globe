import React, { Component, } from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import "babel-polyfill";

import Globe from './views/Globe';
import Countries from './views/Countries';
import Starfield from './views/Starfield';
import Loader from './views/Loader';

const GlobalStyle = createGlobalStyle`
    ${reset}

    body {
        background: black;
        overflow: hidden;
        height: 100vh;
    }
    
    #earth-js, #three-js, .ej-svg, .ej-canvas, .top {
        position: absolute;
        left: 0;
        top: 0;
    }
    #globe, .globe-shadow {
        opacity: 0;
    }
    /* .ej-center {
        right: 0;
        margin-left: auto;
        margin-right: auto;
    } */
    #earth-js {
        z-index: 2;
    }
    #three-js, .ej-svg, .ej-canvas, .top {
        /*position: relative;*/
        z-index: 3;
    }
    .land path{
        fill: rgb(117, 87, 57);
        stroke-opacity: 1;
    }
    .lakes path {
        fill: rgb(80, 87, 97);
        stroke-opacity: 1;
    }
    .countries path {
        stroke: rgb(239, 237, 234);
        stroke-linejoin: round;
        stroke-width: 0.1;
        fill: rgb(117, 87, 57);
        opacity: 1;
    }
    .countries path:hover {
        stroke-width:1;
        fill: rgb(187, 187, 27);
        opacity: 1;
    }
    .countries path:not([d]),
    .points path:not([d]) {
        opacity: 0;
    }
    .ocean {
        fill: url(#ocean);
    }
    .halo {
        fill: url(#halo);
    }
    .graticule path {
        fill: none;
        opacity: 0.2;
        stroke: black;
        stroke-width: 0.5;
    }
    .dot path {
        fill: rgba(100,0,0,.4);
        stroke: rgba(100,0,0,.6);
        stroke-width: 0.2;
    }
    .labels {
        font: 8px sans-serif;
        fill: black;
        opacity: .5;
    }
    #three-js, .ej-canvas, .noclicks {
        pointer-events:none;
    }
    .point{
        opacity:.6;
        fill: #A80;
    }
    .ej-country-tooltip,
    .ej-bar-tooltip,
    .ej-dot-tooltip {
        background: #fff;
        border: solid #ccc 1px;
        color: #666;
        display: none;
        font-family: sans-serif;
        font-size: 14px;
        padding: 5px;
        pointer-events: none;
        position: absolute;
        text-align: left;
        z-index: 3;
    }
    .ej-hidden {
        display: none;
    }
    .input-area {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
        background-color: #b7b7b7;
        position: absolute;
        padding: 0 20px;
        z-index: 5;
    }
    .input-area button {
        padding: 15px;
    }
    .set-options, .set-options2 {
        display: inline-block;
        position: absolute;
        z-index: 999;
        /*top: 25px;*/
    }
    .set-options2 {
        z-index: 998;
    }

    @keyframes progress {
        from {
            opacity: 0
        }

        to {
            opacity: 1
        }
    }
`;

class Application extends Component {
    state = {
        country: [],
        id: null,
        scale: null,
        isCountriesGridDisabled: false,
    };

    selectCountry = (country, id, scale) => {
        this.setState({
            country,
            id,
            scale,
        });
    };

    disableCountriesGrid = () => {
        this.setState({
            isCountriesGridDisabled: true,
        });
    };

    enableCountriesGrid = () => {
        this.setState({
            isCountriesGridDisabled: false,
        });
    };

    render() {
        return (
            <>
                <GlobalStyle/>

                <Loader className="loader" />
                <Globe
                    {...this.state}
                    disableCountriesGrid={this.disableCountriesGrid}
                    enableCountriesGrid={this.enableCountriesGrid}
                />
                <Countries
                    selectCountry={this.selectCountry}
                    isGridDisabled={this.state.isCountriesGridDisabled}
                    activeId={this.state.id}
                />
                <Starfield/>
            </>
        );
    }
}

ReactDOM.render(
    <Application/>,
    document.getElementById('app')
);
