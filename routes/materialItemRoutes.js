const express = require('express');

const materialItemController = require('../controllers/materialItemController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, materialItemController.getAllMaterialItems)
  .post(materialItemController.createMaterialItem);
router
  .route('/:id')
  .get(materialItemController.getMaterialById)
  .patch(materialItemController.updateMaterialItem)
  .delete(
    authController.protect,
    // authController.restrictTo('supplier'),
    materialItemController.deleteMaterialItem,
  );
router
  .route('/supplier/:id')
  .get(
    authController.protect,
    materialItemController.getAllMaterialItemsBySupplier,
  );

module.exports = router;
