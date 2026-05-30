import db from './db.js'

const getAllCategories = async () => {
    const query = `SELECT category_id, name 
                    FROM category
                    order by category_id;`;

    const result = await db.query(query);
    return result.rows;

};


const getCategoryDetails = async (categoryId) => {

    const query = `
    SELECT
        c.category_id,
        c.name
    FROM category c
    WHERE c.category_id = $1;`;


    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};


const getCategoriesByServiceProject = async (projectId) => {
    const query = `
    SELECT 
        c.category_id,
        c.name
    FROM category c
    INNER JOIN project_category pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1;`;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
    INSERT INTO project_category (project_id, category_id)
    VALUES ($1, $2);
    `;

    const queryParams = [projectId, categoryId];
    await db.query(query, queryParams);

}

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const query = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;

    const queryParams = [projectId];
    await db.query(query, queryParams);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
}



export { getAllCategories, getCategoryDetails, getCategoriesByServiceProject, updateCategoryAssignments };
