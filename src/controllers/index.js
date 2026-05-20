const showHomePage = async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
};

//Export controller function
export { showHomePage };