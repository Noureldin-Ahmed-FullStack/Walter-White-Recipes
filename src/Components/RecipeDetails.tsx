import { useParams } from "react-router-dom";
import { useRecipeDetails } from "../Hooks/useRecipes";
import CenteredPage from "../CenteredPage";
import NotFoundPage from "./NotFoundPage";
import { ScaleLoader } from "react-spinners";
import { Paper } from "@mui/material";
import IngredientsTable from "./IngredientsTable";
import InstructionTypography from "./InstructionTypography";
import TagsTypography from "./tagsTypography";
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
                <div className="container">
                    <Paper className="alert text-start w-100 p-4" sx={{ backgroundColor: 'grey-900' }}>

                        <div className="row">
                            <div className="col-md-5 col-sm-5">
                                <img className="w-100" src={data.strMealThumb} alt={data.strMeal} />
                                <h2>{data.strMeal}</h2>
                                <TagsTypography tags={data.strTags}/>
                            </div>
                            <div className="col-md-7 col-sm-7">
                                <h2>Instructions</h2>
                                {/* <h6 className="text-secondary-emphasis">{data.strInstructions}</h6> */}
                                <InstructionTypography instructions="STEP 1 TO MAKE SUSHI ROLLS: Pat out some rice. Lay a nori sheet on the mat, shiny-side down. Dip your hands in the vinegared water, then pat handfuls of rice on top in a 1cm thick layer, leaving the furthest edge from you clear. STEP 2 Spread over some Japanese mayonnaise. Use a spoon to spread out a thin layer of mayonnaise down the middle of the rice. STEP 3 Add the filling. Get your child to top the mayonnaise with a line of their favourite fillings – here we’ve used tuna and cucumber. STEP 4 Roll it up. Lift the edge of the mat over the rice, applying a little pressure to keep everything in a tight roll. STEP 5 Stick down the sides like a stamp. When you get to the edge without any rice, brush with a little water and continue to roll into a tight roll. STEP 6 Wrap in cling film. Remove the mat and roll tightly in cling film before a grown-up cuts the sushi into thick slices, then unravel the cling film. STEP 7 TO MAKE PRESSED SUSHI: Layer over some smoked salmon. Line a loaf tin with cling film, then place a thin layer of smoked salmon inside on top of the cling film. STEP 8 Cover with rice and press down. Press about 3cm of rice over the fish, fold the cling film over and press down as much as you can, using another tin if you have one. STEP 9 Tip it out like a sandcastle. Turn block of sushi onto a chopping board. Get a grown-up to cut into fingers, then remove the cling film. STEP 10 TO MAKE SUSHI BALLS: Choose your topping. Get a small square of cling film and place a topping, like half a prawn or a small piece of smoked salmon, on it. Use damp hands to roll walnut-sized balls of rice and place on the topping. STEP 11 Make into tight balls. Bring the corners of the cling film together and tighten into balls by twisting it up, then unwrap and serve."/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Category: {data.strCategory}</p>
                            <p>Region: {data.strArea}</p>
                        </div>
                        <IngredientsTable recipe={data}/>
                    </Paper>
                </div>

            </CenteredPage>
        )
    } else {
        return <CenteredPage><NotFoundPage /></CenteredPage>
    }

}
