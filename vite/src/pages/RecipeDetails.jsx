import { useParams } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";
import { useState } from "react";

export default function RecipeDetails() {
    const { recipeId } = useParams();
    const { recipes, addRating } = useRecipes();
    const [rating, setRating] = useState(5);

    const recipe = recipes.find((r) => r.id === Number(recipeId));

    if (!recipe) return <p>Recipe not found</p>;

    return (
        <div className="container">
            <h1>{recipe.name}</h1>
            <p>⭐ Średnia ocena: {recipe.rating}</p>

            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((i, idx) => (
                    <li key={idx}>{i}</li>
                ))}
            </ul>

            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>

            <h3>Dodaj ocenę</h3>
            <select value={rating} onChange={(e) => setRating(+e.target.value)}>
                {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                        {r}
                    </option>
                ))}
            </select>
            <button onClick={() => addRating(recipe.id, rating)}>
                Dodaj ocenę
            </button>
        </div>
    );
}
