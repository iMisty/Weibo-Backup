/*
 * @Author: Miya
 * @Version: 1.0
 * @Date: 2020-09-29 22:46:32
 * @LastEditors: Miya
 * @LastEditTime: 2020-09-29 22:49:27
 * @Description: file content
 * @FilePath: /backup/analyze.js
 */
const cheerio = require('cheerio');
const fs = require('fs');

function findImg(dom, callback) {
  let $ = cheerio.load(dom);

  $('img').each(function (i, el) {
    let imgSrc = $(this).attr('src');
    callback(imgSrc, i);
  });
}

module.exports.findImg = findImg;
