import React, { Component } from 'react';
import { _size, _import } from 'helpers/';
import CountryGrid from '../CountryGrid';
import Country from '../Country';
import styled from 'styled-components';

const CountryTitle = styled.p`
    color: white;
    margin: ${_size(10)} 0;
`;

export default class Countries extends Component {
    state = {
        countries: {
            UAE: {
                id: 784,
                scale: 1500
            },
            UK: {
                id: 826,
                scale: 1100
            },
            USA: {
                id: 840,
                scale: 750
            },
            AUSTRALIA: {
                id: 36,
                scale: 700
            },
            BANGLADESH: {
                id: 50,
                scale: 1750
            },
            CANADA: {
                id: 124,
                scale: 700
            },
            HONGKONG: {
                id: 344,
                scale: 3000
            },
            INDIA: {
                id: 356,
                scale: 1200
            },
            IRELAND: {
                id: 372,
                scale: 1750
            },
            MALAYSIA: {
                id: 458,
                scale: 1300
            },
            MEXICO: {
                id: 484,
                scale: 800
            },
            PAKISTAN: {
                id: 586,
                scale: 1200
            },
            PHILIPPINES: {
                id: 608,
                scale: 1000
            },
            SINGAPORE: {
                id: 702,
                scale: 3000
            },
            THAILAND: {
                id: 764,
                scale: 1100
            }
        }
    };

    selectCountry = name => {
        const id = this.state.countries[name.toUpperCase().replace(/\s/g, '')].id;
        const scale = this.state.countries[name.toUpperCase().replace(/\s/g, '')].scale;
        const arr = [{ countries: [id] }];

        this.props.selectCountry(arr, id, scale);
    };

    render() {
        const { isGridDisabled, activeId, } = this.props;
        const icons = _import(require.context('assets/icons/', false, /\.svg$/));
        const filteredIcons = icons.filter(icon => icon.indexOf('logo') === -1);
        const parseName = path => path.split('/').pop().split('.')[0];

        return (
            <CountryGrid isDisabled={isGridDisabled} className="country-grid">
                {filteredIcons && filteredIcons.map((path, index) => {
                    const isCountryActive = activeId
                        && activeId === this.state.countries[parseName(path).toUpperCase()].id;

                    return (
                        <Country
                            active={isCountryActive}
                            onClick={this.selectCountry.bind(this, parseName(path))}
                            key={index}
                        >
                            <img src={path} width="107" height="70" alt={parseName(path)}/>
                            <CountryTitle>{parseName(path).toUpperCase()}</CountryTitle>
                        </Country>
                    );
                })}
            </CountryGrid>
        );
    }
}