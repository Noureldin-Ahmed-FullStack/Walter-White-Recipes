import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { recipes } from "../types";
import APICall from "./APICall";

const fetchRecipes = async ({ queryKey }: { queryKey: [string, number, string, string] }): Promise<recipes[]> => {
    const [_key, page, sort, order] = queryKey;
    const response = await APICall.get(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sort}.${order}`);
    return response.data.results;
}

const useRecipes = () => {
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('desc');
    const [sort, setSort] = useState('popularity');

    const handleOrderChange = () => {
        setOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const { data: Recipes = [], isLoading } = useQuery({
        queryKey: ['Recipes', page, sort, order],
        queryFn: fetchRecipes,
    });

    return {
        Recipes,
        isLoading,
        handleOrderChange,
        handleSortChange,
        handlePageChange,
        sort,
        order,
        page
    }
}

export default useRecipes;
