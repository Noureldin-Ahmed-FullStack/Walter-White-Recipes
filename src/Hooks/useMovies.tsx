import { useEffect, useState } from "react";
import APICall from "./APICall";

const useMovies = () =>{
    const [Loading, setLoading] = useState(false);
    const [Movies, setMovies] = useState([]);
   
    const GetMovies = async () => {
        setLoading(true)
        const movies = await APICall.get(`/discover`)
        if (movies) {
            console.log(movies.data.results);

            setMovies(movies.data.results);
            setLoading(false)
        } else {
            setLoading(false)
        }
    }
    useEffect(() => {
        GetMovies()
    }, [])
    return {Movies,Loading}
}
export default useMovies