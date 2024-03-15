const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const materialItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, 'Material must have a name.'],
      trim: true,
      unique: true,
      minlength: [10, 'Material must have greater or equal 10 characters'],
      maxlength: [40, 'Material must have less or equal 40 characters'],
    },
    description: {
      type: String,
      required: [true, 'Material must have a description.'],
      trim: true,
    },
    materialType: {
      type: String,
      required: [true, 'A Item must have a material type.'],
      enum: {
        values: [
          'Textile',
          'Velvet',
          'Silk',
          'Linen',
          'Denim',
          'Nylon',
          'Cotton',
          'Muslin',
          'Chiffon',
        ],
        message:
          'Material type is either :  Textile, Velvet, Silk, Linen, Denim, Nylon, Cotton, Muslin, Chiffon ',
      },
    },
    slug: String,
    quantityInMeters: {
      type: Number,
      required: [true, 'Quantity is required in Meters'],
    },
    price: { type: Number, required: [true, 'Material must have a price.'] },
    discountPercentages: {
      type: Number,
      default: 0,
      min: [0, 'Discount  minimum 0%'],
      max: [50, 'Discount maximum 50%'],
    },
    supplierId: { type: String, required: [true, 'Supplier ID is required.'] },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // hide from response when we apply select query
    },
  },
  {
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
    versionKey: false,
  },
);

// DOCUMENT MIDDLEWARE : runs before .save() and .create() but not on .insertMany()
materialItemSchema.pre('save', function (next) {
  this.slug = slugify(this.itemName, { lower: true });
  next();
});

// QUERY MIDDLEWARE

materialItemSchema.pre(/^find/, function (next) {
  this.find({ secretMaterial: { $ne: true } });
  this.start = Date.now();
  next();
});
materialItemSchema.post(/^find/, function (docs, next) {
  console.log('query time : ', Date.now() - this.start);
  // console.log('DOCS', docs);
  next();
});

// AGGREGATION MIDDLEWARE

materialItemSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretMaterial: { $ne: true } } });
  console.log('THIS', this.pipeline());
  next();
});

const MaterialItem = mongoose.model('MaterialItem', materialItemSchema);

module.exports = MaterialItem;
