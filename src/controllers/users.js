import bcrypt from 'bcrypt';
import { createUser } from '../models/users.js';
import { authenticateUser } from '../models/users.js';


const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        // Redirect to the home page after successful registration
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

//Show the login Form
const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};


//Process the login Form
const processLoginForm = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await authenticateUser(email, password);

        //Check if user was returned 
        if (user) {
            req.session.user = user;
            req.flash('success', 'Login was successful');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            res.redirect('/');
        } else {
            req.flash('error', 'Login failed');
            res.redirect('/login');
        }
    } catch (error) {
        console.error("Server error during login:", error);
        req.flash('error', 'An unexpected error occurred during login. Please try again.');
        res.redirect('/login');
    }

};


const processLogout = async (req, res) => {
    // 1. Set the flash message BEFORE destroying the session
    req.flash('success', 'Logout successful!');

    // 2. Save the session to ensure the flash message is persisted
    req.session.save((err) => {
        if (err) {
            console.error("Error saving session before logout:", err);
        }

        // 3. Destroy the session completely on the server side
        req.session.destroy((destroyErr) => {
            if (destroyErr) {
                console.error("Error destroying session:", destroyErr);
                return res.redirect('/');
            }

            // 4. Clear the session cookie from the user's browser
            res.clearCookie('connect.sid');

            // 5. Cleanly redirect the user back to the login page
            return res.redirect('/login');
        });
    });
};



export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout
};