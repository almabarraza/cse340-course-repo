//import model needed
import { getAllCategories, getCategoryDetails } from '../models/categories.js';
import { getProjectsByCategory, getProjectDetails } from '../models/projects.js';
import { getCategoriesByServiceProject } from '../models/categories.js';
import { updateCategoryAssignments } from '../models/categories.js';

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProject(projectId);
    const title = "Assign Categories to Project";

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });

};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};



//Export controller function
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };