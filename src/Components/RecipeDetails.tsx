import { useParams } from "react-router-dom";
import { useRecipeDetails } from "../Hooks/useRecipes";
import CenteredPage from "../CenteredPage";
import NotFoundPage from "./NotFoundPage";
import { ScaleLoader } from "react-spinners";
import { Chip, Paper } from "@mui/material";
import IngredientsTable from "./IngredientsTable";
import InstructionTypography from "./InstructionTypography";
import LaunchIcon from '@mui/icons-material/Launch';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TagsTypography from "./TagsTypography";
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
            <CenteredPage>
                <div className="container HankenGrotesk">
                    <Paper className="alert text-start w-100 p-4 my-5" sx={{ backgroundColor: 'grey-900' }}>

                        <div className="row">
                            <div className="col-md-5 col-sm-5">
                                <div className=" image-container">
                                    <img className="w-100" src={data.strMealThumb} alt={data.strMeal} />

                                    <a target="_blank" href={data.strYoutube}>

                                        <div className="overlay d-flex flex-column">
                                            <YouTubeIcon sx={{ fontSize: 200 }} />
                                            <h5>Watch Tutorial</h5>
                                        </div>
                                    </a>

                                </div>
                                <div className="row justify-content-between align-items-center mt-2">
                                    <div className="col-6">
                                    <h2>{data.strMeal}</h2>

                                    </div>
                                    <div className="col-6 text-end">
                                    <Chip className="text-white" onClick={()=>{}} component={'a'} href={data.strYoutube} target="_blank" icon={<YouTubeIcon />} color="error" label="Watch Tutorial" />

                                    </div>
                                </div>
                                <TagsTypography tags={data.strTags} />
                            </div>
                            <div className="col-md-7 col-sm-7">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2>Instructions</h2>
                                    <a target="_blank" className="text-end" href={data.strSource}>view recipe source <LaunchIcon /></a>
                                </div>
                                {/* <h6 className="text-secondary-emphasis">{data.strInstructions}</h6> */}
                                <InstructionTypography instructions={data.strInstructions} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Category: {data.strCategory}</p>
                            <p>Region: {data.strArea}</p>
                        </div>
                        <IngredientsTable recipe={data} />
                    </Paper>
                </div>

            </CenteredPage>
        )
    } else {
        return <CenteredPage><NotFoundPage /></CenteredPage>
    }

}
