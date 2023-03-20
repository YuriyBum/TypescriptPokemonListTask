import React from 'react';
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import { RootState } from 'state/reducer'
import * as config from 'config'
import Heading from 'components/heading'
import Pokemons from 'components/list';
import './App.css';

function App() {

  const State = useSelector((state: RootState) => {
    return state
  })

  return (
    <div className="App">
      <Heading />
      <Pokemons page={{
        limit: State.pageSize,
        offset: (State.pageNumber * State.pageSize)
      }} />
    </div>
  );
}

export default App;
