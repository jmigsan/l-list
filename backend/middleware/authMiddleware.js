const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const admin = require('firebase-admin');

// const serviceAccount = require(process.env.PATH_TO_SERVICE_ACCOUNT_KEY);
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {  
  let idToken

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      idToken = req.headers.authorization.split(' ')[1]
        
      let decodedToken = await getAuth().verifyIdToken(idToken)
      let uid = await decodedToken.uid
      req.user = uid

      next()
     
    } catch (error) {
      res.status(401)
      throw new Error(error)
    }
  }

  if (!idToken) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }