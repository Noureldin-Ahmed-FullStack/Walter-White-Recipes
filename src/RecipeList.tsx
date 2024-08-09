import { Card, CardActionArea, CardActions, CardContent, CardMedia, MenuItem, Paper, Select, SelectChangeEvent, Tooltip, Typography } from "@mui/material";
import { useRecipes } from "./Hooks/useRecipes";
import './Styles/Home.css'
import { useState } from "react";
import CenteredPage from "./CenteredPage";
import { ScaleLoader } from "react-spinners";
import { recipeAreas } from "./types";
export default function RecipeList() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const [Letter, setLetter] = useState('k')
  const [Area, setArea] = useState('American')
  const [Querry, setQuerry] = useState('/search.php?f=k')
  const [FilterMethod, setFilterMethod] = useState('letter')
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setLetter(event.target.value as string);
  };
  const handleAreaChange = (event: SelectChangeEvent) => {
    setLetter(event.target.value as string);
  };
  const handleFilterMethodChange = (event: SelectChangeEvent) => {
    setFilterMethod(event.target.value as string);
  };
  const renderContent = () => {
    switch (FilterMethod) {
      case 'letter':
        return <Select
          fullWidth
          className="overflow-hidden"
          labelId="Letter-select"
          id="Letter-select"
          value={Letter}
          label="Letter-select"
          onChange={handleCategoryChange}
        >
          {alphabet.map((letter) => (
            <MenuItem key={letter} value={letter}>
              {letter}
            </MenuItem>
          ))}
        </Select>;
      case 'ingredient':
        return <h1>About View</h1>;
      case 'area':
        return <Select
        fullWidth
        className="overflow-hidden"
        labelId="Letter-select"
        id="Letter-select"
        value={Area}
        label="Letter-select"
        onChange={handleAreaChange}
      >
        {recipeAreas.map((area) => (
          <MenuItem key={area.strArea} value={area.strArea}>
            {area.strArea}
          </MenuItem>
        ))}
      </Select>;
      case 'recipe':
        return <h1>Contact View</h1>;
      default:
        return <h1>404 - Not Found</h1>;
    }
  };

  const { data, isLoading, error } = useRecipes(`/search.php?f=${Letter}`);
  if (isLoading) return (
    <CenteredPage>
      <ScaleLoader />
    </CenteredPage>
  );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className='w-100 flex-grow-1 d-flex flex-column'>
      <div className="container mt-3 mb-3">
        <Paper className="alert text-start w-100" sx={{ backgroundColor: 'grey-900' }}>
          <div className="row align-items-center">
            <div className="col-4 d-flex">
              Sort By:
              <Select
                fullWidth
                className="overflow-hidden"
                labelId="Letter-select"
                id="Letter-select"
                value={FilterMethod}
                label="Letter-select"
                onChange={handleFilterMethodChange}
              >
                <MenuItem value='letter'>
                  Letter
                </MenuItem>
                <MenuItem value='area'>
                  area
                </MenuItem>
                <MenuItem value='ingredient'>
                  ingredient
                </MenuItem>
                <MenuItem value='recipe'>
                  Recipe
                </MenuItem>
              </Select>
            </div>
            <div className="col-8">

              {renderContent()}
            </div>

          </div>

        </Paper>
        <div className="row gy-3">
          {data?.map((item => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-3 " key={item.idMeal}>
              <Card className="h-100">
                <CardActionArea>
                  <CardMedia
                    className="movie-item pointer position-relative"
                    sx={{ height: 140, objectFit: 'cover' }}
                    image={item.strMealThumb}
                    title={item.strMeal}
                  />

                  <CardContent className="text-start pb-0">
                    <Tooltip title={item.strMeal} followCursor className="pointer">
                      <h6 className="m-0 truncate-text">{item.strMeal}</h6>
                    </Tooltip>
                    <Typography variant="body2" color="text.secondary" className="m-0 truncate-text">

                      <Tooltip title={item.strInstructions} followCursor className="pointer">
                        <span className="m-0">{item.strInstructions}</span>
                      </Tooltip>
                    </Typography>
                  </CardContent>
                  <CardActions className="">
                    <h6 className="price exo-2-bold mb-0">{item.idMeal} Egp.</h6>
                    {/* <Button size="small">Learn More</Button> */}
                  </CardActions>
                </CardActionArea>
              </Card>

            </div>
          )))}
        </div>
      </div>

    </div>
  )
}
