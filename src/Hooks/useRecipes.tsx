import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { recipes } from '../types';
const BaseURL = import.meta.env.VITE_BASE_URL;
const fetchRecipes = async (query: string) => {
    try {
        const response = await axios.get(BaseURL + query);
        if (response) {
        return response.data.meals as recipes[];
        }
        return []
    } catch (error) {
        console.error(error);
        return []
    }

};
const fetchProductDetails = async (productId: string) => {
    try {
        const response = await axios.get(`${BaseURL}/products/${productId}`);
        return response.data.meals;
    } catch (error) {
        console.error(error);
        return null
    }

};

export const useRecipes = (query: string) => {
    return useQuery({
        queryKey: ['recipes', query],
        queryFn: () => fetchRecipes(query),
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false, // Do not refetch on window focus
    });
};

export const useProductDetails = (productId: string) => {
    return useQuery({
        queryKey: ['productDetails', productId],
        queryFn: () => fetchProductDetails(productId),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};
