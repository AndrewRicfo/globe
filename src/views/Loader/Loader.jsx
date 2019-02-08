import React from 'react';
import styled from 'styled-components';
import logo from 'assets/icons/logo.svg';

const StyledLoader = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    background: url('./assets/images/starfield.png') no-repeat center center;
    transition: opacity 1.5s;
    pointer-events: none;
`;

const LoaderIcon = styled.div`
        &:before {
            content: url(\'${logo}\');
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            left: 15%;
            width: 685px;
            height: 175px;
        }
`;

const Progress = styled.span`
    position: absolute;
    transform: translateY(-50%);
    top: calc(50% + 100px);
    left: calc(15% + 8px);
    width: 677px;
    height: 10px;
    border: 1px solid deepskyblue;
    border-radius: 10px;
    animation: progress 2s;
`;

const ProgressBar = styled.span`
    position: absolute;
    width: 1%;
    height: 100%;
    border-radius: 10px;
    background: white;
    transition: width .5s;
`;

export const Loader = (props) => {
    return (
        <StyledLoader className={props.className}>
            <LoaderIcon/>
            <Progress className="progress">
                <ProgressBar className="progress__bar"/>
            </Progress>
        </StyledLoader>
    );
};