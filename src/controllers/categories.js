//import model needed
import { getAllCategories, getCategoryDetails, createCategory } from '../models/categories.js';
import { getProjectsByCategory, getProjectDetails } from '../models/projects.js';
import { getCategoriesByServiceProject } from '../models/categories.js';
import { updateCategoryAssignments, updateCategory } from '../models/categories.js';
import { body, validationResult } from 'express-validator';


// Define validation and sanitization rules for category form
// Define validation rules for category form
const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters'),
];





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


const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/new-category');
    }

    const { name } = req.body;

    const categoryId = await createCategory(name);
    req.flash('success', 'Category added successfully!');
    res.redirect(`/category/${categoryId}`);
};


const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const title = 'Edit Category';

    res.render('edit-category', { title, categoryDetails });
};

const processEditCategoryForm = async (req, res) => {

    //Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit category form
        return res.redirect('/edit-category/' + req.params.id);
    }

    const categoryId = req.params.id;
    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully!');
    res.redirect(`/category/${categoryId}`);

};





//Export controller function
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};