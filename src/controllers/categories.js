//import model needed
import { getAllCategories } from '../models/categories.js';

//Define controller function
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';

    console.log('Retrieved categories:', categories);

    res.render('categories', { title, categories });
};

//Export controller function
export { showCategoriesPage };