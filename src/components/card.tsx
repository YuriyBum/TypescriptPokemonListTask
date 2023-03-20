import React from 'react';
import useSWR from 'swr'
import * as config from 'config'
import { pokemonCard } from 'types'
import { fetcher } from '../state/hooks'
import { CircularProgress } from '@mui/material';


const PokemonCard = ({ card } : pokemonCard) => {

    const { data, error } = useSWR<any, Error>( card.url , fetcher);
    
    if (error) {
        return(
            <div>
                Failed to load card
            </div>
        )
    }

    const pokemonWeight = data ? data.weight || 0 : 0
    const pokemonHeight = data ? data.height || 0 : 0

    return(
        <div className="pokemon--single">
            {!data ? <CircularProgress  color="secondary" /> : 
            <>
               <h5>{card.name}</h5>
               <p>Weight: {pokemonWeight} points</p>
               <p>Height: {pokemonHeight} points</p>
            </>}
        </div>
    )
}

export default PokemonCard