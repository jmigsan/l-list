const express = require("express");
const router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'backend/uploads/' })

const { getLlist, createL, updateL, deleteL, uploadContentL, getContentLKey } = require("../controllers/llistController");
const { protect } = require('../middleware/authMiddleware');

router.get("/", getLlist);
router.post("/", protect, createL);

router.put("/:id", protect, updateL);
router.delete("/:id", protect, deleteL);

router.post('/upload', [protect, upload.single('content')], uploadContentL);
router.get('/upload/:key', getContentLKey);

module.exports = router;