const MaterialItem = require('../models/materialModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllMaterialItems = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(MaterialItem.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const materialItems = await features.query;

  //Send response
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: materialItems.length,
    data: { materialItems },
  });
});
exports.getAllMaterialItemsBySupplier = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    MaterialItem.find({ supplierId: { $eq: req.params.id } }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const materialItems = await features.query;

  //Send response
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    results: materialItems.length,
    data: { materialItems },
  });
});

exports.getMaterialById = catchAsync(async (req, res, next) => {
  const materialItem = await MaterialItem.findById(req.params.id);
  if (!materialItem) {
    return next(new AppError('No material item found with that ID', 400));
  }

  res.status(200).json({
    status: 'success',
    data: { materialItem },
  });
});

exports.createMaterialItem = catchAsync(async (req, res, next) => {
  const newMaterialItem = await MaterialItem.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { newMaterialItem },
  });
});

exports.updateMaterialItem = catchAsync(async (req, res, next) => {
  const materialItem = await MaterialItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!materialItem) {
    return next(new AppError('No material item found with that ID', 400));
  }
  res.status(200).json({ status: 'success', data: materialItem });
});

exports.deleteMaterialItem = catchAsync(async (req, res, next) => {
  const materialItem = await MaterialItem.findByIdAndDelete(req.params.id);
  if (!materialItem) {
    return next(new AppError('No material item found with that ID', 400));
  }
  res.status(200).json({ status: 'success', data: null });
});
