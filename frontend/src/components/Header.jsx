import React from 'react';

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Vesting App</div>
      <w3m-button />
    </header>
  );
};

export default Header;

