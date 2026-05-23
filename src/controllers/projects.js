// Import model needed
import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByServiceProject } from '../models/categories.js';
const NUMBER_OF_UPCOMING_PROJECTS = 5;

//Define the controller function
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    // Log projects to console to verify it's working
    console.log('Retrieved projects:', projects);

    res.render('projects', { title, projects });
};

//Controller function to show details service project
const showProjectDetailsPage = async (req, res) => {
    const title = 'Service Project Details';
    const projectId = req.params.id;
    const categoryProject = await getCategoriesByServiceProject(projectId);
    const projectDetails = await getProjectDetails(projectId);

    res.render('project', { title, projectDetails, categoryProject })
}

//Export the controller function
export { showProjectsPage, showProjectDetailsPage };