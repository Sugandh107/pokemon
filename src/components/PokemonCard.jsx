import React from 'react';

const PokemonCard = ({ name, imageUrl }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 text-center capitalize">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default PokemonCard;
