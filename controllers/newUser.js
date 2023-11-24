module.exports =(req,res) =>{
    res.render('register',{
        //errors: req.session.validationErrors
        errors: req.flash('validationErrors')
    })
}