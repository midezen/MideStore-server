import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    !token && res.status(401).json("You're not authorized");

    jwt.verify(token, (err, userInfo) => {
      err && res.status(401).json("invalid token");
      req.user = userInfo;
      next();
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  try {
    verifyToken();
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(403).json("You're not allowed to do that");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const verifyTokenAndAdmin = (req, res, next) => {
  try {
    verifyToken();
    if (req.user.isAdmin === req.body.isAdmin) {
      next();
    } else {
      return res.status(403).json("You're not allowed to do that");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
