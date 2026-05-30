import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT 
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            sp.organization_id,
            o.name as organization_name
        FROM public.service_project sp
        JOIN public.organization o ON sp.organization_id = o.organization_id
        ORDER BY sp.date;
    `;

    const result = await db.query(query);
    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

//This function will retrive upcoming service projects from database
const getUpcomingProjects = async (number_of_projects) => {
    const currentDate = new Date().toISOString().split('T')[0];

    const query = `
    SELECT 
        p.project_id,
        p.title,
        p.description,
        p.date,
        p.location,
        p.organization_id,
        o.name
    FROM service_project p
    INNER JOIN organization o ON p.organization_id = o.organization_id
    WHERE p.date >= $1
    ORDER BY p.date ASC
    LIMIT $2;
    `;

    const queryParams = [currentDate, number_of_projects];
    const result = await db.query(query, queryParams);

    return result.rows;

};


const getProjectDetails = async (id) => {
    const query = `
    SELECT
        p.project_id,
        p.title,
        p.description,
        p.date,
        p.location,
        p.organization_id,
        o.name
    FROM service_project p
    INNER JOIN organization o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;`;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows[0];

};


const getProjectsByCategory = async (categoryId) => {
    const query = `
    SELECT
        p.project_id,
        p.title,
        p.description,
        p.location,
        p.date
    FROM service_project p
    INNER JOIN project_category pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.project_id ASC;     
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
    INSERT INTO service_project (title, description, location, date, organization_id)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    return result.rows[0].project_id;
};



// Export the model functions
export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategory, createProject };
