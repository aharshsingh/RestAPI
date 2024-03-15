import jwt from 'jsonwebtoken';
import JWT_SECRET from '../config'

class JwtService{

    //creating JWT 
    static sign(payload, expiry = '60s', secret = JWT_SECRET){    
        return jwt.sign(payload, secret, { expiresIn: expiry});
    }
}

export default JwtService;