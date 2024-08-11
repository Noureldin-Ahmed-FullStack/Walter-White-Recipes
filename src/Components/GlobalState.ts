import { create } from 'zustand'
import { recipes } from '../types';
import { PaletteMode } from '@mui/material';

// Define the Recipe type


// Define the state and actions types
interface StoreState {
    favouriteRecipies: recipes[];
    favouriteRecipiesIDs: string[];
    addFavourite: (Recipe: recipes) => void;
    removeFavourite: (RecipeId: string) => void;
    clearFavourites: () => void;
    Theme: PaletteMode;
    ToggleTheme: () => void
}
const LOCAL_STORAGE_KEY = 'favouriteRecipes';

// Function to load state from local storage
const loadStateFromLocalStorage = (): { favouriteRecipies: recipes[], favouriteRecipiesIDs: string[] } => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedState) {
    return JSON.parse(savedState);
  }
  return { favouriteRecipies: [], favouriteRecipiesIDs: [] };
};

// Function to save state to local storage
const saveStateToLocalStorage = (state: { favouriteRecipies: recipes[], favouriteRecipiesIDs: string[] }) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  };

// Create the store
const GlobalStates = create<StoreState>((set) => ({
    ...loadStateFromLocalStorage(),
    Theme: 'light',
    ToggleTheme: () =>
        set((state) => ({
            Theme: state.Theme === 'light' ? 'dark' : 'light'
        })),
    // favouriteRecipies: [],
    // favouriteRecipiesIDs: [],
    addFavourite: (recipe) =>
        set((state) => {
          const newState = {
            favouriteRecipies: [...state.favouriteRecipies, recipe],
            favouriteRecipiesIDs: [...state.favouriteRecipiesIDs, recipe.idMeal],
          };
          saveStateToLocalStorage(newState); // Save to local storage
          return newState;
        }),
      removeFavourite: (recipeId) =>
        set((state) => {
          const newState = {
            favouriteRecipies: state.favouriteRecipies.filter(
              (recipe) => recipe.idMeal !== recipeId
            ),
            favouriteRecipiesIDs: state.favouriteRecipiesIDs.filter(
              (id) => id !== recipeId
            ),
          };
          saveStateToLocalStorage(newState); // Save to local storage
          return newState;
        }),
      clearFavourites: () =>
        set(() => {
          const newState = { favouriteRecipies: [], favouriteRecipiesIDs: [] };
          saveStateToLocalStorage(newState); // Save to local storage
          return newState;
        }),
}));

export default GlobalStates;
