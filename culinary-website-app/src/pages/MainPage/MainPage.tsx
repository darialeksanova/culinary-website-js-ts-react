import RecipePreviewComponent from 'components/RecipePreviewComponent/RecipePreviewComponent';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { loadRecipesPreviews } from 'store/recipesPreviews/actions';
import { RootState } from 'store/store';
import styles from './MainPage.module.css';

const MainPage = () => {
  const recipePreviewItems = useSelector((state: RootState) => state.recipesPreviews.recipesPreviews);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const totalRecipes = query.get('totalRecipes') || '5';
  // почему вызывается два раза?
  // console.log(totalRecipes)

  const [visibleRecipesAmount, setVisibleRecipesAmount] = useState(Number(totalRecipes));

  useEffect(() => {
    dispatch(loadRecipesPreviews());
  }, [dispatch]);

  const handleShowMoreButtonClick = () => {
    const query = new URLSearchParams(location.search);
    const totalRecipes = query.get('totalRecipes') || '5';
    const newTotalRecipes = parseInt(totalRecipes, 10) + 5;
    query.set('totalRecipes', newTotalRecipes.toString());

    navigate(`${location.pathname}?${query.toString()}`);

    setVisibleRecipesAmount(prevState => prevState + 5);
  };

  return (
    <div className={styles.mainPageContainer}>
      <h1 className={styles.mainPageTitle}>Recipes</h1>
      <ul className={styles.recipesList}>
        {recipePreviewItems.slice(0, visibleRecipesAmount).map(item => <RecipePreviewComponent key={item.id} recipePreview={item} />)}
      </ul>
      <div className={styles.mainPageActions}>
        <button className={styles.showMoreButton} onClick={handleShowMoreButtonClick}>Show more</button>
      </div>
    </div>
  );
};

export default MainPage;
