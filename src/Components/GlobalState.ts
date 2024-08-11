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

// Create the store
const GlobalStates = create<StoreState>((set) => ({
    Theme: 'light',
    ToggleTheme: () =>
        set((state) => ({
            Theme: state.Theme === 'light' ? 'dark' : 'light'
        })),
    favouriteRecipies: [],
    favouriteRecipiesIDs: [],
    addFavourite: (Recipe) =>
        set((state) => ({
            favouriteRecipies: [...state.favouriteRecipies, Recipe],
            favouriteRecipiesIDs: [...state.favouriteRecipiesIDs, Recipe.idMeal],
        })),
    removeFavourite: (RecipeId) =>
        set((state) => ({
            favouriteRecipies: state.favouriteRecipies.filter(
                (Recipe) => Recipe.idMeal !== RecipeId
            ),
            favouriteRecipiesIDs: state.favouriteRecipiesIDs.filter(
                (id) => id !== RecipeId
            ),
        })),
    clearFavourites: () => set({ favouriteRecipies: [], favouriteRecipiesIDs: [] }),
}));

export default GlobalStates;
