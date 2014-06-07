// ==UserScript==
// @name           Tumblr Big Photos
// @description    This script displays large images and hides small images on dashboard of Tumblr, also supports AutoPagerize and Pagerization. I recommend to use this script with LDRize and them.
// @namespace      http://shokai.org
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// author: Sho Hashimoto
// http://shokai.tumblr.com
// ==/UserScript==

var index = 0;

function displayBigImage(){
  var tmp = document.getElementsByTagName('a');
  for(var i = index; i < tmp.length; i++){
    var a = tmp[i]
    if(a.id.match(/big_photo/)){
      a.style.display = '';
    }
    else if(a.id.match(/small_photo/)){
      a.style.display = 'none';
    }
  }
  index = tmp.length;
}


var h = -300; // 初期の高さ

function watchHeight(){
    // ページの高さが変わっていたら処理を行う
    if((h + 300) < document.body.offsetHeight) {
      displayBigImage();
      h = document.body.offsetHeight;
    }
}

var timer = setInterval(watchHeight,2000);

displayBigImage();

