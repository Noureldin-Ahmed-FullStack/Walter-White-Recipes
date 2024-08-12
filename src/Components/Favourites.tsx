import GlobalStates from "./GlobalState";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Tooltip } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

export default function Favourites() {
    const { favouriteRecipies, favouriteRecipiesIDs, addFavourite, removeFavourite } = GlobalStates();
    const navigate = useNavigate();
    const goToRecipe = (id: string) => {
        navigate(`/Recipes/${id}`); // Replace '/desired-path' with your desired URL
    };
    return (
        <div className="container mt-5">
            <div className="row gy-3">
                {favouriteRecipies?.map((item => (
                    <div className="col-6 col-sm-4 col-md-3 col-lg-3" onClick={() => goToRecipe(item.idMeal)} key={item.idMeal}>
                        <Card className="h-100">
                            <CardActionArea>
                                <Tooltip title={item.strMeal} followCursor className="pointer">
                                    <div>
                                        <CardMedia
                                            className="movie-item pointer position-relative"
                                            sx={{ height: 140, objectFit: 'cover' }}
                                            image={item.strMealThumb}
                                        // title={item.strMeal}
                                        />
                                    </div>
                                </Tooltip>

                                <CardContent className="text-start pb-0">
                                    <div className="row align-items-center">
                                        <div className="col-6">
                                            <h6 className="m-0 truncate-text">{item.strMeal}</h6>
                                        </div>
                                        <div className="col-6 text-end">
                                            {favouriteRecipiesIDs.includes(item.idMeal) ? (
                                                <Tooltip title="Remove From Favourites" followCursor className="pointer">
                                                    <FavoriteIcon
                                                        sx={{
                                                            color: '#af0000', // Set the default color
                                                            transition: 'color 0.2s', // Transition for color change
                                                            '&:hover': {
                                                                color: 'black', // Set the color on hover
                                                            },
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevents the goToRecipe function from being triggered
                                                            removeFavourite(item.idMeal);
                                                        }}
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Add to Favourites" followCursor className="pointer">
                                                    <FavoriteBorderIcon
                                                        sx={{
                                                            color: 'defaultColor', // Set the default color
                                                            transition: 'color 0.2s', // Transition for color change
                                                            '&:hover': {
                                                                color: 'red', // Set the color on hover
                                                            },
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevents the goToRecipe function from being triggered
                                                            addFavourite(item);
                                                        }}
                                                    />
                                                </Tooltip>
                                            )}

                                        </div>
                                    </div>
                                </CardContent>
                                <CardActions></CardActions>
                            </CardActionArea>
                        </Card>
                    </div>
                )))}
            </div>
        </div>
    )
}
