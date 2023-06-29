import jwt from 'jsonwebtoken'
import auth_config from '../../config/auth.js'

export default (request, response, next)=>{
    const auth_token = request.headers.authorization

    if(!auth_token){
        return response.status(401).json({erro: "token not provided"})
    }

    const token= auth_token.split(' ')[1]

    
    try{
        jwt.verify(token, auth_config.secret, function(err, decoded){
            if(err){
                throw new Error()
            }

            request.user_id = decoded.id
            request.user_name = decoded.name
            
            return next()

        })
    }catch(err){
        return response.status(401).json({error: "token is invalid"})
    }
 
}    




