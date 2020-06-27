const jwt = require('jsonwebtoken');
const { secret } = require('../configs/credentials/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ success: false, status: 401, message: "No token provided" });
  
  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).json({ success: false, status: 401, message: "Invalid token" });
  
  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ success: false, status: 401, message: "Invalid token" });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ success: false, status: 401, message: "Invalid token" });

    req.user_id = decoded.id;
      
    return next();
  });    
}