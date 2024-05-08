const access =(...permittedRole)=>{
    return (req, res, next) => {
        console.log(req.role);
        if(permittedRole.includes(req.role)){
            next();
        }
        else{
            res.status(200).json({msg:"Not accessible to you"})
        }
    }
}

module.exports = {
    access
}