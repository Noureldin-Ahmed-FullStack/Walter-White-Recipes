import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Test() {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
            let Arr = []
            for (let i = 0; i < response.data.meals.length; i++) {
                Arr.push( response.data.meals[i].strIngredient)
            }
            console.log(Arr);
            return response;
        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        const data = fetchData()
    }, [])

    return (
        <div>Test</div>
    )
}
