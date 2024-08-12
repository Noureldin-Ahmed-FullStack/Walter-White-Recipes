import { Button } from "@mui/material";
import GlobalStates from "./GlobalState";

export default function HomePage() {
  const { Theme } = GlobalStates()
  return (
    <div className={`HomeDiv ${Theme == 'light' ? "HomeWhite lightTheme-text" : "HomeDivDark darkTheme-text"}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 col-6">
              <h2>Cook Like a pro with Our Eeasy and Tasty Recipes</h2>
              <p className="text-secondary">Quick and easy Recipes provided to you by the Cook and his assistant Jessie</p>
              <Button sx={{color:'white'}} variant="contained" color="warning">Explore all Recipes</Button>
            </div>
            <div className="col-md-4 col-6">
            <img className="w-100" src="https://ssniper.sirv.com/Images/Recipe%20Site/compressed-image.jpg" alt="Hero Image" />
            </div>
          </div>
        </div>
    </div>
  )
}
