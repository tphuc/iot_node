const jwt =  require('jsonwebtoken')
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } =  require('../config')

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, JWT_ACCESS_SECRET, {
    expiresIn: '30d',
  });
}

function generateRefreshToken(user, jti) {
  return jwt.sign({
    userId: user.id,
    jti
  }, JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });
}

function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
};
