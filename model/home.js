var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var homeSchema = new Schema({
    // top
    top:{
        xuhuong:{
            image: String,
            title: String,
            typeContent: String
        },
        lichthidau:{
            image: String,
            title: String,
            typeContent: String
        },
        haihuoc:{
            image: String,
            title: String,
            typeContent: String
        },
        highlight:{
            image: String,
            title: String,
            typeContent: String
        }
    },
    //VCS
    vcs:[{
        image: String,
        title: String,
        desc: String
    }],
    //Tin game Child
    zoneTinGame:[{
        zone: String
    }],
    //TinGame
    tinGame:[{
        top1:{
            image: String,
            title: String,
            desc: String
        },
        top2:[{
            title: String
        }]
    }],
    //TinHot
    tinHotTrongTuan:[{
        image: String,
        title: String
    }],
    //Congdong
    congdong:[{
        image: String,
        title: String
    }]
  }
);
var homeModel = mongoose.model("Home", homeSchema);

module.exports = homeModel;
