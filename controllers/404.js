exports.get404Page = (req, res, next) => {
    res.render('404', {
        docTitle: '404, page not found',
        path: req.path
    });
}