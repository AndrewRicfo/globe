import React, { Component } from 'react';
import styled from 'styled-components';
import { _size } from 'helpers/';

export default class Country extends Component {

    render() {
        const StyledCountry = styled.div`
            text-align: center;
            padding: ${_size(5)};
            cursor: pointer;
            pointer-events: ${props => props.active ? 'none' : 'inherit'};
            background: ${props => props.active ? 'rgba(255,255,255, 0.5)' : 'transparent'};
            border-radius: ${_size(10)};
        
        &:hover {
            background: rgba(255,255,255,0.25);
            border-radius: ${_size(10)};
        }
    `;

        return (
            <StyledCountry active={this.props.active} onClick={this.props.onClick}>
                {this.props.children}
            </StyledCountry>
        );
    }
}