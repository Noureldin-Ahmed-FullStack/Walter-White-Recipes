import { Autocomplete, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, MenuItem, Paper, Select, SelectChangeEvent, TextField, Tooltip, Typography } from "@mui/material";
import { useRecipes } from "./Hooks/useRecipes";
import './Styles/Home.css'
import { useState } from "react";
import CenteredPage from "./CenteredPage";
import { ScaleLoader } from "react-spinners";
import { recipeAreas, recipeIngredients } from "./types";
export default function RecipeList() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const [Letter, setLetter] = useState('k')
  const [Area, setArea] = useState<string | null>('American')
  const [RecipeName, setRecipeName] = useState('')
  const [Ingredient, setIngredient] = useState<string | null>('Chicken')
  const [QuerryTitle, setQuerryTitle] = useState('/search.php?s=')
  const [Querry, setQuerry] = useState('/search.php?s')
  const [QuerryValue, setQuerryValue] = useState<string | null>('k')
  const [FilterMethod, setFilterMethod] = useState('recipe')
  const FilterData = ()=>{
    setQuerry(QuerryTitle + QuerryValue)
    console.log(QuerryTitle + QuerryValue);
    
  }
  const handleIngredientChange = (_event: any, newValue: string | null) => {
    setIngredient(newValue);
    setQuerryValue(newValue)
  };
  const handleRecipeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeName(event.target.value);
    setQuerryValue(event.target.value)
  };
  const handleAreaChange = (_event: any, newValue: string | null) => {
    setArea(newValue);
    setQuerryValue(newValue)
  };
  const handleLetterChange = (event: SelectChangeEvent) => {
    setLetter(event.target.value as string);
    setQuerryValue(event.target.value)
  };
  const handleFilterMethodChange = (event: SelectChangeEvent) => {
    setFilterMethod(event.target.value as string);

    switch (event.target.value as string) {
      case 'letter':
        setQuerryTitle('/search.php?f=')
        setQuerryValue(Letter as string)
        break
      case 'area':
        setQuerryTitle('/filter.php?a=')
        setQuerryValue(Area as string)
        break
      case 'ingredient':
        setQuerryTitle('/filter.php?i=')
        setQuerryValue(Ingredient as string)
        break
      case 'recipe':
        setQuerryTitle('/search.php?s=')
        setQuerryValue(RecipeName as string)
        break
      default:
        // Optional: Handle any unexpected cases
        setQuerryTitle('/search.php?s=');
        setQuerryValue('b');
        break;
    }
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
          onChange={handleLetterChange}
        >
          {alphabet.map((letter) => (
            <MenuItem key={letter} value={letter}>
              {letter}
            </MenuItem>
          ))}
        </Select>;
      case 'ingredient':
        return <Autocomplete
          options={recipeIngredients}
          value={Ingredient} // Set the default value
          onChange={handleIngredientChange} // Handle value changes
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          isOptionEqualToValue={(option, value) => option === value}
        />;
      case 'area':
        return <Autocomplete
          options={recipeAreas}
          value={Area} // Set the default value
          onChange={handleAreaChange} // Handle value changes
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          isOptionEqualToValue={(option, value) => option === value}
        />;
      case 'recipe':
        return <TextField onChange={handleRecipeNameChange} variant="outlined" fullWidth placeholder="Koshary" />;
      default:
        return <h1>404 - Not Found</h1>;
    }
  };

  const { data, isLoading, error } = useRecipes(Querry);
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
          {/* {QuerryTitle + QuerryValue} */}
          {/* {RecipeName} */}
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
          <Button onClick={FilterData} fullWidth className="mt-2" color="secondary" variant="outlined">Filter</Button>
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
