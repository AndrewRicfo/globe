import React from 'react';
import styled from 'styled-components';
import { _size, } from 'helpers/';

const StyledCountryGrid = styled.div`
    z-index: 5;
    width: 50vw;
    height: 50vh;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.5);
    border-radius: ${_size(10)} 0 0 ${_size(10)};
    padding: ${_size(30)};
    opacity: 0;
    pointer-events: ${props => props.isDisabled ? 'none' : 'auto'};
`;

export default props => {
    return (
        <StyledCountryGrid
            isDisabled={props.isDisabled}
            className="country-grid"
        >
            {props.children}
        </StyledCountryGrid>
    )
};