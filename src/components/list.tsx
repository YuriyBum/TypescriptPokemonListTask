import React from 'react';
import useSWR from 'swr'
import * as config from 'config'
import { pageData } from 'types'
import { fetcher } from '../state/hooks'
import PokemonCard from './card';
import Paginator from './paginator';
import { CircularProgress } from '@mui/material';

const Pokemons = ({ page } : pageData) => {

    const dataUrl = `${config.apiUrl}?limit=${page.limit}\&offset=${page.offset}`

    const { data, error } = useSWR<any, Error>( dataUrl , fetcher);

    if (error || !data) {
        return(
            <div className="list--progress">
                <CircularProgress  color="secondary" />
            </div>
        )
    }

    return(
        <>
          <Paginator itemCount={Number(data.count)} />
          <div className="pokemon--list">
           {
             data.results.map((item, index) => {
               return <PokemonCard key={"card_".concat(String(index * 3))} card={{
                 name: item.name,
                 url: item.url
               }} />
           })}
          </div>
        </>
    )
}

export default Pokemons
