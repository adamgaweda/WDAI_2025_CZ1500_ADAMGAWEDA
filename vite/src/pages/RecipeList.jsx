import { useState } from "react";
import { useRecipes } from "../context/RecipesContext";
import RecipeCard from "../components/RecipeCard";

export default function RecipeList() {
    const { recipes, animate } = useRecipes();
    const [search, setSearch] = useState("");
    const [randomRecipe, setRandomRecipe] = useState(null);

    const filtered = recipes.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleRandom = () => {
        const rand = recipes[Math.floor(Math.random() * recipes.length)];
        setRandomRecipe(rand);
    };

    return (
        <div className="container">
            <h1>Recipe List</h1>

            <input
                placeholder="Search recipe..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={handleRandom}>Random recipe</button>

            {randomRecipe && (
                <p>
                    🎲 Wylosowano: <strong>{randomRecipe.name}</strong>
                </p>
            )}

            <div className={`recipes ${animate ? "animate" : ""}`}>
                {filtered.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}
