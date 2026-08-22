const isAdmin = (req, res, next) => {
    if (req.session.user.role === 'admin') {
        return next();
    }
    res.send('Access denied');
};

module.exports = isAdmin;