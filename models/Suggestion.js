const mongoose = require('mongoose')

const SuggestionSchema = new mongoose.Schema({
    title: {type: String, lowercase: true, unique: true, required: true},
    name: { type: String ,lowercase: true, required: true },
    suggestion: { type: String, lowercase: true, required: true },
    likes: { type: Number, default: 0 },
    anonymous: {type: Boolean},
    timestamp: { type: Date, default: Date.now },


})


module.exports = mongoose.model('suggestion', SuggestionSchema);