export function authorization(authRoles:string[]){
    return(req, res, next)=>{
        let valid = false
        if(!req.session.user){
            res.status(401).send(`Please log in`)
            return
        }
        for(let userRole of req.session.user.role){
            if(authRoles.includes(userRole)){
                valid = true
            }
        }
        if(valid){
            next()
        }else{
            res.status(403).send(`Invalid credentials`)
        }
    }
}