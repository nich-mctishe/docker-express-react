const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slugify = require('slugify')

let testSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  value: { type: Number, required: true }
})

testSchema.pre('save', function (next) {
  this.slug = slugify(this.name.toLowerCase())
  next()
}, {
  timestamps: true
})

module.exports = mongoose.model('TestRelationship', testSchema);
