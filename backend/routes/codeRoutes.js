const express = require('express');
const {
  getCodes,
  createCode,
  getCodeById,
  updateCode,
  deleteCode,
} = require('../controllers/codeControllers.js');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');
router.route('/').get(protect, getCodes);

router.route('/create').post(protect, createCode);

router
  .route('/:id')
  .get(getCodeById)
  .put(protect, updateCode)
  .delete(protect, deleteCode);

module.exports = router;
