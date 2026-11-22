import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  const addFavorite = (id) => {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id) ? prevIds : [...prevIds, id]
    );
  };

  const removeFavorite = (id) => {
    setFavoriteIds((prevIds) => prevIds.filter((favId) => favId !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites должен использоваться внутри FavoritesProvider');
  }
  return context;
}
