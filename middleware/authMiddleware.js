const jwt = require('jsonwebtoken');
require('dotenv').config();

function verify(req, res, next) {
  debugger
  console.log("HI")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token || token === "null") {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token is not valid' });
  }
};

module.exports = verify;
