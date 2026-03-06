import jwt from 'jsonwebtoken'


export const protect  = async (req ,resp , next) => {
    const token = req.cookies.jwt;

    if(!token)  {
       req.user = null
        return next();
    }
    try {
        const decoded  = jwt.verify(token , process.env.JWT_SECRET_KEY);
        req.user = decoded.id;  //attach user id to request
        next();
    } catch (error) {
       req.user = null
       next();
    }
}