// const http = require('http');
// const fs = require('fs');
// const request = require('request');
// const path = require('path');
// const config = require('./config');
// const analyze = require('./analyze');

// function start() {
//   console.warn('start');
//   request(config.url, function (err, res, body) {
//     console.log(err);
//     console.log('start1');
//     if (!err && res) {
//       console.log('start2');
//       analyze.findImg(body, download);
//     }
//   });
// }

// function download(imgUrl, i) {
//   let ext = imgUrl + '.';

//   request({ uri: imgUrl }).pipe(
//     fs.createWriteStream(path.join(config.imgDir, i + '.' + ext), {
//       encoding: 'binary',
//     })
//   );

//   console.log(i);
// }
// start();

const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
request('http://api.kagura.design/77526951.html', function (error, response, body) {
  console.log('error:', error); // 错误优先
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   fs.writeFileSync('./qn.html',body,'utf8')
  //获取爬取网站的页面信息
  const $ = cheerio.load(body);
  let imgs = [];
  //目标网站图片链接地址数组
  // 用正则判断数组中的路径是否存在https
  var _ = /(http[s]?|ftp)/;
  $('img').each((i, e) => {
    // 遍历所有
    var src = $(e).attr('src');

    if (!_.test(src)) {
      src = src.replace(/\/{2}/, 'https://'); //因为有些图片不可下载，所以用正则判断一下
    }
    imgs.push(src);
  });
  // 下载数组里的图片
  for (let index = 0; index < imgs.length; index++) {
    if (imgs[index].indexOf('http') !== -1) {
      request(imgs[index]).pipe(fs.createWriteStream(`./img/${index}.png`)); //这里为了省事，我就直接用下标命名了；
    }
  }
});
