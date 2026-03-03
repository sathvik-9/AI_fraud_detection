import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization?.split(" ")[1];
    if(!authHeader)
        return res.status(401).json({message: "No token, authorization denied"});
    try{
        const decoded = jwt.verify(authHeader, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(401).json({message: "Token is not valid"});
    }
}