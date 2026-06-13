import { addVolunteer } from "../models/volunteers.js";
import { deleteVolunteer } from "../models/volunteers.js";

const chooseVolunteerProject = async (req, res) => {
    const projectId = req.params.id;

    //session validation
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to volunteer.');
        return res.redirect('/login');
    }

    const userId = req.session.user.user_id;
    console.log(userId);

    try {

        await addVolunteer(userId, projectId);

        req.flash('success', 'Volunteer successfuly added to this project');
        return res.redirect(`/project/${projectId}`);



    } catch (error) {
        console.error('Error adding user to as a volunteer', error);
        req.flash('error', 'An error occurred while adding yourself as a volunteer to this project. Please try again.');
        return res.redirect(`/project/${projectId}`);

    }

};


// Controller function to handle removing a volunteer from a project
const removeVolunteerProject = async (req, res) => {
    const projectId = req.params.id;


    // Session Validation
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to perform this action.');
        return res.redirect('/login');
    }

    const userId = req.session.user.user_id;

    try {
        // Execute the delete operation in the database
        await deleteVolunteer(userId, projectId);

        req.flash('success', 'You have successfully stopped volunteering for this project.');
        return res.redirect(`/project/${projectId}`); // Redirects back to the project details page

    } catch (error) {
        console.error('Error removing user as a volunteer:', error);
        req.flash('error', 'An error occurred while removing yourself from this project. Please try again.');
        return res.redirect(`/project/${projectId}`);
    }
};


export {
    chooseVolunteerProject,
    removeVolunteerProject
};