var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var vcsSchema = new Schema({
    id: String,
    image: String,
    title: String,
    desc: String
  }
);
var vcsModel = mongoose.model("VCS", vcsSchema);

module.exports = vcsModel;
