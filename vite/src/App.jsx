import { Routes, Route } from "react-router-dom";
import RecipeList from "./pages/RecipeList";
import RecipeDetails from "./pages/RecipeDetails";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
    );
}
