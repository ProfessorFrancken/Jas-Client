import React from 'react';
import spades from './assets/Spade.png';
import hearts from './assets/Heart.png';
import diamonds from './assets/Diamond.png';
import clubs from './assets/Club.png';
import sans from './assets/Sans2.png';

const SuitIcon = (props) => {

    const imgStyle = {
        width: props.width ? props.width : "20px",
        maxHeight: "100%",
        marginRight: "0.5em"
    };

    return <img src={props.src} style={imgStyle} alt={props.alt}/>;
};

const suitStringToComponent = (suit) => {
    switch (suit) {
    case 'spades': return <Spade />;
    case 'hearts': return <Heart />;
    case 'diamonds': return <Diamond />;
    case 'clubs': return <Club />;
    case 'sans': return <Sans />;
    default: throw Error(`${suit} is not a valid suit choice`);
    }

};

export const Spade =   () => <SuitIcon src={spades} alt="Suit of spades"/>;
export const Heart =   () => <SuitIcon src={hearts} alt="Suit of hearts"/>;
export const Diamond = () => <SuitIcon src={diamonds} alt="Suit of diamonds"/>;
export const Club =    () => <SuitIcon src={clubs} alt="Suit of clubs"/>;
export const Sans =    () => <SuitIcon src={sans} width="60px" alt="Choose to play sans"/>;

export const Bid = (props) => <span>
    <strong className="mr-2">{props.bid}</strong>
    {suitStringToComponent(props.suit)}
</span>;
