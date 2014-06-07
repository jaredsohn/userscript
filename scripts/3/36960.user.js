// ==UserScript==
// @auther         Atushi Yamazaki
// @name           All User Change BookmarkletKun 4 iKnow
// @namespace      http://atushiyamazaki.blogspot.com/
// @description    All User Change BookmarkletKun 4 iKnow
// @include        htt*://www.iknow.co.jp/*
// @version        0.0.01 
// ==/UserScript==
var bookmarkletkun = 'd570054g';
var img = document.getElementsByTagName('img');
for (var i = 0; i < img.length; i++) {
  if (img[i].src.indexOf(/users/) != -1) img[i].src = img[i].src.replace('/users/', '/user/bookmarklet/');
  if (img[i].src.indexOf(/user_content/) != -1) img[i].src = img[i].src.replace('/user_content/', '/assets/user/bookmarklet/');

  if (img[i].src.indexOf(/user/) != -1) {
    var index = img[i].src.indexOf('/user/') +'/user/'.length;
    var str = img[i].src.substr(index, img[i].src.lastIndexOf('/') - index);
    img[i].src = img[i].src.replace(str, 'bookmarklet');

    if (img[i].src.indexOf('.png') != -1) img[i].src = img[i].src.replace('.png', '.jpg');
    if (img[i].src.indexOf('.gif') != -1) img[i].src = img[i].src.replace('.gif', '.jpg');
    if (img[i].src.indexOf('.jpeg') != -1) img[i].src = img[i].src.replace('.jpeg', '.jpg');

    index = img[i].src.lastIndexOf('/') +1;
    str = img[i].src.substr(index, img[i].src.indexOf('.jpg') - index);
    if (img[i].src.indexOf('_small.') != -1) img[i].src = img[i].src.replace(str, bookmarkletkun + '_small');
    if (img[i].src.indexOf('_medium.') != -1) img[i].src = img[i].src.replace(str, bookmarkletkun + '_medium');
    if (img[i].src.indexOf('_big.') != -1) img[i].src = img[i].src.replace(str, bookmarkletkun + '_big');
  }
}

