const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phone: String
});

const Store = mongoose.model('Store', StoreSchema);

module.exports = { Store };
