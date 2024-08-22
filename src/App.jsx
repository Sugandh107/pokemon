import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => response.json())
      .then(data => {
        const fetches = data.results.map(poke =>
          fetch(poke.url).then(res => res.json())
        );
        Promise.all(fetches).then(results => {
          setPokemon(results);
        });
      });
  }, []);

  const filteredPokemon = pokemon.filter(poke =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-500 p-4 flex flex-col items-center">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="p-2 mb-8 w-72 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map(poke => (
            <PokemonCard
              key={poke.id}
              name={poke.name}
              imageUrl={poke.sprites.front_default}
            />
          ))
        ) : (
          <p className="text-white text-lg font-semibold col-span-full text-center animate-pulse">
            No Pokémon found 😢
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
