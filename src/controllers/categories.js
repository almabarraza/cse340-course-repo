//import model needed
import { getAllCategories, getCategoryDetails } from '../models/categories.js';
import { getProjectsByCategory } from '../models/projects.js';

//Define controller function
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';

    console.log('Retrieved categories:', categories);

    res.render('categories', { title, categories });
};

//Function to call category details
const showCategoryDetailsPage = async (req, res) => {
    const title = 'Category Details';
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const projectByCategory = await getProjectsByCategory(categoryId);

    res.render('category', { title, categoryDetails, projectByCategory });
};



//Export controller function
export { showCategoriesPage, showCategoryDetailsPage };