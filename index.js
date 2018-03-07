var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Diacritics = require('diacritic');
var request = require('request');
var cheerio = require('cheerio');

//Model
var Home = require('./model/home')
var VCS = require('./model/vcs')

var app = express();
//Connet moogodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://hlong96:Hoanglong96@ds251588.mlab.com:51588/lm360news'
  , { useMongoClient: true });
//

//Set port 
app.set('port', (process.env.PORT || 5050));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
  //intervalObj
});

//crawl tin trang chủ
var urlLM360 = 'http://lienminh360.vn/'
request(urlLM360, function (err, response, body) {
  if (!err && response.statusCode == 200) {
    var $ = cheerio.load(body)

    //TOP
    var imageXuHuong = $('#bxone .block_wrap a img').attr('src')
    var titleXuHuong = $('#bxone .block_wrap .info h3').text()
    var typeXuHuong = $('#bxone .block_wrap .info span').text()

    var imageLichThiDau = $('#bxtwo .block_wrap a img').attr('src')
    var titleLichThiDau = $('#bxtwo .block_wrap .info h3').text()
    var typeLichThiDau = $('#bxtwo .block_wrap .info span').text()

    var imageHaiHuoc = $('#bxthree .block_wrap a img').attr('src')
    var titleHaiHuoc = $('#bxthree .block_wrap .info h3').text()
    var typeHaiHuoc = $('#bxthree .block_wrap .info span').text()

    var imageHighLight = $('#bxfour .block_wrap a img').attr('src')
    var titleHighLight = $('#bxfour .block_wrap .info h3').text()
    var typeHighLight = $('#bxfour .block_wrap .info span').text()

    var arrXuHuong =[{imageXuHuong,titleXuHuong,typeXuHuong}]
    var arrLichThiDau = [{imageLichThiDau,titleLichThiDau,typeLichThiDau}]
    var arrHaiHuoc = [{imageHaiHuoc,titleHaiHuoc,typeHaiHuoc}]
    var arrHighLight = [{imageHighLight,titleHighLight,typeHighLight}]
    
    //VCS

    var arrVCSImgae = new Array()
    var arrVCSTitle = new Array()
    var arrVCSDesc = new Array()

    var vcs = $('.itemGpl .single-article figure a img').each(function(i,elem){
      var vcsImage = $(this).attr('src')
      arrVCSImgae.push(vcsImage)
    })

    var vcs1 = $('.itemGpl .single-article .article-content h3 a').each(function(i,elem){
      var vcsTitle = $(this).text()
      arrVCSTitle.push(vcsTitle)
    })

    var vcs2 = $('.itemGpl .single-article .article-content p').each(function(i,elem){
      var vcsDesc = $(this).text()
      arrVCSDesc.push(vcsDesc)
    })

    //Tingame child
    var arrZoneTinGame = new Array()
    var tingamechild = $('.blockrows .primary .linktabs a').each(function(i,elem){
        if(i<6){
          var zone = $(this).text()
          arrZoneTinGame.push(zone)
        }
    })
    //Tin game

    var arrTingameTop1Image = new Array()
    var arrTingameTop1Title = new Array()
    var arrTingameTop1Desc = new Array()
    var arrTingameOther = new Array()

    var tingame = $('.blockrows .primary .first-post figure a img').each(function(i,elem){
      var tingameImage = $(this).attr('src')
      arrTingameTop1Image.push(tingameImage)
    })


    var tingame1 = $('.blockrows .primary .first-post .article-content h3').each(function(i,elem){
      var tingameTitle = $(this).text()
      arrTingameTop1Title.push(tingameTitle)
    })

    var tingame2 = $('.blockrows .primary .first-post .article-content p').each(function(i,elem){
      var tingameDesc = $(this).text()
      arrTingameTop1Desc.push(tingameDesc)
    })

    var tingame3 = $('.blockrows .primary .first-post .listsubnews').each(function(i,elem){
      var tingameOther = $(this).text()
      arrTingameOther.push(tingameOther)
    })

    //console.log(arrTingameOther[0])

    //Tin hot

    var arrTinHotImage = new Array()
    var arrTinHotTitle = new Array()

    var tinhot = $('.secondary #recent-posts-hot-2 .inner .vertical_posts figure a img').each(function(i,elem){
      var tinhotImage = $(this).attr('src')
      arrTinHotImage.push(tinhotImage)
    })

    var tinhot1 = $('.secondary #recent-posts-hot-2 .inner .vertical_posts .article-content h3').each(function(i,elem){
      var tinhotTitle = $(this).text()
      arrTinHotTitle.push(tinhotTitle)
    })

    //congdong

    var arrCongDongImage = new Array()
    var arrCongDongTitle = new Array()

    var congdong = $('.secondary #congdong-news .vertical_posts figure a img').each(function(i,elem){
      var congdongImage = $(this).attr('src')
      arrCongDongImage.push(congdongImage)
    })

    var congdong1 = $('.secondary #congdong-news .vertical_posts .article-content h3 a').each(function(i,elem){
      var congdongTitle = $(this).text()
      arrCongDongTitle.push(congdongTitle)
    })

    //obj
    var vcc = new Array()
    for(var i=0;i<arrVCSImgae.length;i++){
        var vcsObj = {  image: arrVCSImgae[i],
                        title: arrVCSTitle[i],
                        desc: arrVCSDesc[i]
                      }
        vcc.push(vcsObj)
    }

    var zoneTinGame = new Array()
    for(var i=0;i<arrZoneTinGame.length;i++){
      var zoneTinObj = {
        zone: arrZoneTinGame[i]
      }
      zoneTinGame.push(zoneTinObj)
    }

    var tinHot = new Array()
    for(var i=0;i<arrTinHotImage.length;i++){
      var tinhotObj = {
        image: arrTinHotImage[i],
        title: arrTinHotTitle[i]
      }
      tinHot.push(tinhotObj)
    }

    var congDong = new Array()
    for(var i=0;i<arrCongDongImage.length;i++){
      var congdongObj = {
          image: arrCongDongImage[i],
          title: arrCongDongTitle[i]
      }

      congDong.push(congdongObj)
    }

    var tinGame = new Array()
    for(var i=0;i<arrTingameTop1Image.length;i++){
       var tinGameObj = [{
         top1:{
           image: arrTingameTop1Image[i],
           title: arrTingameTop1Title[i],
           desc: arrTingameTop1Desc[i]
         },
         top2:{
           title:arrTingameOther[i]
         }
       }]

       tinGame.push(tinGameObj)
    }

    console.log(tinGame)

    //HOME
    var home = new Home({
      top:{
        xuhuong:{
          image: imageXuHuong,
          title: titleXuHuong,
          typeContent: typeXuHuong
        },
        lichthidau:{
          image: imageLichThiDau,
          title: titleLichThiDau,
          typeContent: typeLichThiDau
        },
        haihuoc:{
          image: imageHaiHuoc,
          title: titleHaiHuoc,
          typeContent: typeHaiHuoc
        },
        highlight:{
          image: imageHighLight,
          title: titleHighLight,
          typeContent: typeHighLight
        }
      },
      vcs:vcc,
      zoneTinGame: zoneTinGame,
      tinGame: tinGame[0],
      tinHotTrongTuan: tinHot,
      congdong: congDong
    })

    //console.log(home)

    // home.save(function(err,crHome){
    //   if(err){
    //     console.log(err)
    //   }else{
    //     console.log('success')
    //   }
    // })

  } else {
    console.log('error')
  }
})

//crawl tin bài VCS
var urlVCS = 'http://lienminh360.vn/esports/giai-trong-nuoc/'
request(urlVCS,function(err,response,body){
  if(!err && response.statusCode == 200){
    var $ = cheerio.load(body)

    var arrTitle = new Array()
    var arrDesc = new Array()
    var arrImage = new Array()
    

    var vcs = $('#newsEsports .lastest-post .article-content h3 a').each(function(i,elem){
      var vcsTitle = $(this).text()
      arrTitle.push(vcsTitle)
    })

    var vcs1 = $('#newsEsports .lastest-post .article-content p').each(function(i,elem){
      var vcsDesc = $(this).text()
      arrDesc.push(vcsDesc)
    })

    var vcs2 = $('#newsEsports .lastest-post figure a img').each(function(i,elem){
      var vcsImage = $(this).attr('src')
      arrImage.push(vcsImage)
    })

    for(var i=0;i<arrTitle.length;i++){
        var vcsa = new VCS({
          id: i+1,
          image: arrImage[i],
          title: arrTitle[i],
          desc: arrDesc[i]
        })

        // vcsa.save(function(err,vnvcs){
        //   if(err){
        //     console.log(err)
        //   }else{
        //     console.log('success')
        //   }
        // })
    }


  }else{
    console.log('err')
  }
})

//crawl tin nổi bật
var urlTinNoiBat = 'http://lienminh360.vn/'
request(urlTinNoiBat,function(err,response,body){
  if(!err && response.statusCode == 200){
    var $ = cheerio.load(body)
    var tinnoibat = $('.vertical_posts figure a img').each(function(i,elem){
      var imageTinNoiBat = $(this).attr('src')
      //console.log(imageTinNoiBat)
    })

    var tinnoibat1 = $('.vertical_posts .article-content h3').each(function(i,elem){
      var titleTinNoiBat = $(this).text()
      //console.log(titleTinNoiBat)
    })

  }else{
    console.log('err')
  }
})

//Get Home
app.get('/home', function (req, res) {
  Home.find(function (err, home) {
    if (err) {
      res.json({ success: 0, message: "Could not get data from mlab" });
    } else {
      res.send({ Home: home });
    }
  });
});

//Get vcs
app.get('/vcs',function(req,res){
  VCS.find(function(err,vcs){
    if(err){
      res.json({success: 0,message: "Could not get data from mlab"})
    }else{
      res.send({VCS: vcs})
    }
  })
})

//Get tin nổi bật
app.get('/tinnoibat',function(req,res){
  TinNoiBat.find(function(err,tinnoibat){
    if(err){
      res.json({success:0,message: "Could not get data from mlab"})
    }else{
      res.send({TinNoiBat: tinnoibat})
    }
  })
})

