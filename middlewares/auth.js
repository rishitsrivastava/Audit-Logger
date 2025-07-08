import { jwt } from 'jsonwebtoken';

const JWT_Secret = process.env.JWT_Secret;

export function verifyToken(req, res, next) {
    const authHeader = req.header.authorization;
    if (!authHeader)
        return res.status(401).json({ message: 'Missing token' });

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }
      
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_Secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.json(401).json({ message: 'Invalid Token' });
    }
}

export function requireRole(role) {
    return (req, res, next) => {
        if (req.user?.role != role)
            return res.status(403).json({ message: 'Forbidden' });
        next();
    }
}