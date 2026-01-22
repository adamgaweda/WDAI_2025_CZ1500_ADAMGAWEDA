import { createContext, useContext, useEffect, useState } from "react";
import { fetchRecipes } from "../api";

const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        fetchRecipes().then((data) => {
            setRecipes(
                data.map((r) => ({
                    ...r,
                    rating: r.rating || 4,
                    ratingsCount: 1,
                }))
            );
        });
    }, []);

    useEffect(() => {
        if (recipes.length > 0) {
            const timer = setTimeout(() => {
                setAnimate(true);
                setTimeout(() => setAnimate(false), 500);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [recipes]);

    const removeRecipe = (id) => {
        setRecipes((prev) => prev.filter((r) => r.id !== id));
    };

    const addRating = (id, newRating) => {
        setRecipes((prev) =>
            prev.map((r) => {
                if (r.id === id) {
                    const total = r.rating * r.ratingsCount + newRating;
                    const count = r.ratingsCount + 1;
                    return {
                        ...r,
                        rating: (total / count).toFixed(1),
                        ratingsCount: count,
                    };
                }
                return r;
            })
        );
    };

    return (
        <RecipesContext.Provider
            value={{ recipes, removeRecipe, addRating, animate }}
        >
            {children}
        </RecipesContext.Provider>
    );
};

export const useRecipes = () => useContext(RecipesContext);
