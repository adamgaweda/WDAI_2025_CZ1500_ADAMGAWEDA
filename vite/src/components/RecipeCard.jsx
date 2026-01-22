import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";

export default function RecipeCard({ recipe }) {
    const navigate = useNavigate();
    const { removeRecipe } = useRecipes();

    return (
        <div className="card">
            <h3 onClick={() => navigate(`/recipe/${recipe.id}`)}>
                {recipe.name}
            </h3>
            <p>Kuchnia: {recipe.cuisine}</p>
            <p>Trudność: {recipe.difficulty}</p>
            <button onClick={() => removeRecipe(recipe.id)}>Usuń</button>
        </div>
    );
}
