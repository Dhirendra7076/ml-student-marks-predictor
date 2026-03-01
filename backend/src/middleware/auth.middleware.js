import jwt from 'jsonwebtoken'


export const protect  = async (req ,resp , next) => {
    const token = req.cookies.token;

    if(!token)  {
        return resp.status(400).json({message : "Unauthorized"})
    }
    try {
        const decoded  = jwt.verify(token , process.env.JWT_SECRET_KEY);
        req.user = decoded.id;  //attach user id to request
        next();
    } catch (error) {
        return resp.status(401).json({message : "Invalid token"})
    }
}