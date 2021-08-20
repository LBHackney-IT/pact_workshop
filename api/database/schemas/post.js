const mongoose = require("mongoose")

const schema = mongoose.Schema({
	title: { type: String, required: true },
	author: { type: String, required: true }
}, { strict: true, versionKey: false })

module.exports = mongoose.model("Post", schema)