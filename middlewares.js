module.exports={
    //Authentication middleware
    restricted: function(req,res,next){
        if (req.session.user)
            next();
        else 
            res.redirect('/login');
    }
}
