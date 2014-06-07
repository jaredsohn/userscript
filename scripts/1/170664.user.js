// ==UserScript==
// @name         donkey4u.com 显示下载链接
// @namespace    http://jixun.org/
// @version      1.0
// @description  enter something useful
// @include      *://donkey4u.com/detail/*
// @copyright    2012+, Jixun
// ==/UserScript==

addEventListener ('DOMContentLoaded', function () {
  var eImg = document.querySelectorAll ('div img'),
      imgRef = eImg[eImg.length-1],
      aLink = document.createElement ('a'),
      eBr = document.createElement ('br');
  var lInfo = document.body.innerHTML.match(/文件名: (.+?)(\s+|)<br([\s\S]+?)\((\s+|)(\d+)([\s\S]+?)Hash:(\s+|)([a-f0-9]+)/im);
  
  aLink.textContent = '下载档案';
  aLink.href = 'ed2k://|file|' + 
    encodeURIComponent (lInfo [1]) +
    '|' + lInfo [5] +
    '|' + lInfo [8] +
    '|/';
  imgRef.parentNode.insertBefore(aLink, imgRef.nextSibling);
  aLink.parentNode.insertBefore(eBr, aLink);
  
}, false);