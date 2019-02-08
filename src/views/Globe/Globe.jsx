import React, { Component } from 'react';
import styled from 'styled-components';
import earth from 'libs/Earth';
import * as d3 from 'libs/d3.min';

import texture from 'assets/images/earth.jpg';
import pattern from 'assets/images/pattern.png';

const GlobeCanvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-37.5%);
`;

const GlobeShadow = styled.div`
    pointer-events: none;
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    border-radius: 50%;
    box-shadow: inset -50px -50px 100px 5px rgb(0, 0, 0), inset 5px 0 50px -1px rgba(255, 255, 255, 1), inset 0 0 1000px 0px rgba(255, 255, 255, .3);
    opacity: 1;
    transition: opacity .5s;
`;

export default class Globe extends Component {
    constructor(props) {
        super(props);
        this.initialScale = null;
        this.globeShadow = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            document.querySelector('.progress__bar').style.width = "5%";
            const { offsetWidth, offsetHeight } = d3.select('body').node();
            this.g = earth({ width: offsetWidth, height: offsetHeight, padding: 10 })
                .register(earth.plugins.selectCountryMix())
                .register(earth.plugins.imageThreejs(texture));

            this.g.inertiaPlugin.selectAll('#globe');
            this.g.ready(() => {
                // const progressBar = document.querySelector('.progress__bar');
                // if (parseInt(progressBar.style.width) < 25) {
                //     progressBar.style.width = "25%";
                // }

                this.g.create();
                this.g.selectCountryMix.multiRegion([{
                    color: 'transparent',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    countries: [784]
                }], 784);
                this.g._.options.spin = true;
                this.initialScale = this.g._.proj.scale();
            });
        }, 100);
    }

    componentDidUpdate = prevProps => {
        if (prevProps.id !== this.props.id) {
            this.scaleToCallback();
        }
    };

    scaleTo = (animation) => {
        const start = performance.now();
        const globeShadowEl = this.globeShadow.current;
        const scaleDuration = 1000;

        requestAnimationFrame(function animate(time) {
            let timePassed = time - start;

            if (timePassed >= scaleDuration) timePassed = scaleDuration;

            animation(timePassed);

            if (timePassed < scaleDuration) {
                requestAnimationFrame(animate);
            } else {
                globeShadowEl.style.display = "block";
                setTimeout(() => globeShadowEl.style.opacity = "1", 10);
            }
        });
    };

    scaleToCallback = () => {
        const {
            country,
            id,
            scale,
            disableCountriesGrid,
            enableCountriesGrid,
        } = this.props;
        const globeShadowEl = this.globeShadow.current;

        disableCountriesGrid();
        if ((this.g._.proj.scale() - this.initialScale) > 10) {
            globeShadowEl.style.opacity = "0";

            setTimeout(() => {
                globeShadowEl.style.display = "none";

                this.scaleTo(timePassed => {
                    const timeToScale = this.g._.proj.scale() - (timePassed / 1000 * this.g._.proj.scale());

                    if (timeToScale > 0 && this.initialScale - timeToScale < 50) {
                        this.g._.scale(timeToScale)
                    }
                });
            }, 500);

            setTimeout(() => {
                this.g._.scale(this.initialScale);
                this.g.selectCountryMix.multiRegion(country, id);
            }, 1000);

            setTimeout(() => {
                globeShadowEl.style.opacity = "0";
            }, 3000);

            setTimeout(() => {
                globeShadowEl.style.display = "none";
                this.scaleTo(timePassed => {
                    const timeToScale = timePassed / 1000 * scale;

                    if (timePassed > 0 && timeToScale >= this.initialScale) {
                        this.g._.scale(timeToScale);
                    }
                });
            }, 3500);

            setTimeout(() => enableCountriesGrid(), 4500);
        } else {
            this.g._.scale(this.initialScale);
            this.g.selectCountryMix.multiRegion(country, id);

            setTimeout(() => {
                globeShadowEl.style.opacity = "0"
            }, 2000);

            setTimeout(() => {
                globeShadowEl.style.display = "none";

                this.scaleTo(timePassed => {
                    const timeToScale = timePassed / 1000 * scale;

                    if (timePassed > 0 && timeToScale >= this.initialScale) {
                        this.g._.scale(timeToScale)
                    }
                });
            }, 2500);

            setTimeout(() => enableCountriesGrid(), 3500);
        }
    };

    render() {
        return (
            <>
                <GlobeCanvas id="globe"/>
                <GlobeShadow className="globe-shadow" ref={this.globeShadow}/>
                <canvas className="ej-canvas"/>
                <img
                    src={pattern}
                    style={{ display: "none" }}
                    id="pattern"
                    alt=""
                />
            </>
        );
    }
}