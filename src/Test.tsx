import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Test() {
    const [Data, setData] = useState([])
    const fetchData = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
            console.log(response);
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
