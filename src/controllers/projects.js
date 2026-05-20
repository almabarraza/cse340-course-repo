// Import model needed
import { getAllProjects } from '../models/projects.js';

//Define the controller function
const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';

    // Log projects to console to verify it's working
    console.log('Retrieved projects:', projects);

    res.render('projects', { title, projects });
};

//Export the controller function
export { showProjectsPage };