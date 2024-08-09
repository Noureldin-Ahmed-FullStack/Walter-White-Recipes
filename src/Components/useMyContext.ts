import { useContext } from "react";
import { MyContext } from "./ContextProvider";

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;   

};