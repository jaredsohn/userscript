// ==UserScript==
// @name           Tumblr - Hide Imported Posts
// @description    remove Imported Posts from Feeds of Twitter, Flickr, Last.fm and so on.
// @namespace      http://shokai.org
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/dashboard
// author: Sho Hashimoto
// http://shokai.tumblr.com
// ==/UserScript==

var index = 0;

function hideImportedPosts(){
  var tmp = document.getElementsByTagName('li');
  for(var i = index; i < tmp.length; i++){
    var post = tmp[i];
    if(post.innerHTML.match(/<div class="imported_from">/)){
      post.style.display = 'none';
    }
    index = tmp.length;
  }
}


var h = -300; // 初期の高さ

function watchHeight(){
  // ページの高さが変わっていたら処理を行う
  if((h + 300) < document.body.offsetHeight) {
    hideImportedPosts();
    h = document.body.offsetHeight;
  }
}
var timer = setInterval(watchHeight,2000);

hideImportedPosts();
