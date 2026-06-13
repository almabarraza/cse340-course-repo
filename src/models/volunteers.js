import db from './db.js'


// Add volunteers to projects
const addVolunteer = async (userId, projectId) => {
    const query = `
    INSERT INTO user_project(user_id, project_id)
    VALUES ($1, $2)
    RETURNING *;`

    const queryParams = [userId, projectId];

    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to add the volunteer to the project');

    }


    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Volunteer added to the project');
    }

    return result.rows[0];


};


const deleteVolunteer = async (userId, projectId) => {
    const query = `
    DELETE FROM user_project 
    WHERE user_id = $1 AND project_id = $2;`

    const queryParams = [userId, projectId];
    // Execute the query and save the result metadata
    const result = await db.query(query, queryParams);

    // Throw an error if the volunteer was not registered in the project
    if (result.rowCount === 0) {
        throw new Error('The volunteer was not registered in this project');
    }

    // Keep consistency with the add function log
    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Volunteer removed from the project');
    }
};

const showVolunteerProjects = async (userId) => {
    const query = `
    SELECT up.project_id, sp.title, up.registered_at
    FROM service_project sp
    JOIN user_project up ON up.project_id = sp.project_id
    WHERE up.user_id = $1; `

    const queryParams = [userId];
    const result = await db.query(query, queryParams);

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Projects displayed');
    }

    return result.rows;

};




export {
    addVolunteer,
    deleteVolunteer,
    showVolunteerProjects
}