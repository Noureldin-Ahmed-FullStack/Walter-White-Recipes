import { recipes } from '../types'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
const columns: GridColDef[] = [
    { field: 'Measure', headerName: 'Measure', width: 160 },
    { field: 'Ingredient', headerName: 'Ingredient', width: 160 },

];
type props = {
    recipe: recipes
}
export default function IngredientsTable(props: props) {
    const { recipe } = props
    const ingredientsData = [];
    for (let i = 0; i < 20; i++) {
        const key = `strIngredient${i}` as keyof typeof recipe;
        const measurekey = `strMeasure${i}` as keyof typeof recipe;
        const ingredient = recipe[key];
        const measure = recipe[measurekey];
        if (ingredient && measurekey) {
            ingredientsData.push({ id: i, Measure: measure, Ingredient: ingredient });
        }
    }
    const rows = ingredientsData
    return (
        <div style={{ height: 400, width: '100%' , maxHeight: 200}}>
            <DataGrid
                density='compact'
                rows={rows}
                hideFooter
                columns={columns}
            />
        </div>
    );
}
