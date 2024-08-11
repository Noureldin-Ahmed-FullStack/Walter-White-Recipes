import { useParams } from "react-router-dom";
import { useRecipeDetails } from "../Hooks/useRecipes";
import { recipes } from "../types";
import CenteredPage from "../CenteredPage";
import NotFoundPage from "./NotFoundPage";
import { ScaleLoader } from "react-spinners";
export default function RecipeDetails() {
    const { RecipeId } = useParams();
    if (RecipeId) {
        const { data, isLoading, error } = useRecipeDetails(RecipeId)
        if (isLoading) return (
            <CenteredPage>
                <ScaleLoader />
            </CenteredPage>
        );
        if (error) return <div>Error: {error.message}</div>;
        if (!data) return <CenteredPage><NotFoundPage /></CenteredPage>;
        return (
            <div>{RecipeId}</div>
        )
    } else {
        return <CenteredPage><NotFoundPage /></CenteredPage>
    }

}
