export function authorization(authRoles:string[]){
    
    return(req, res, next)=>{
        let valid = false
        if(!req.session.user){
            res.status(401).send(`Please log in`)
            return
        }        
        if(authRoles.includes(req.session.user.role.role)){
            valid = true
        }
        if(valid){
            next()
        }else{
            res.status(403).send(`The incoming token has expired`)
        }
    }
}