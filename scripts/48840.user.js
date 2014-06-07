// ==UserScript==
// @name           fix /lounge/
// @description    fixes all of !MILKRIBS4k's posts
// @namespace      http://dis.4chan.org/
// @include        http://dis.4chan.org/*
// @version        1.2
// ==/UserScript==

(function(){
 var posts = [];
 var myclass = new RegExp('\\bpost\\b');
 var divs = document.getElementsByTagName('div')
 for(var i = 0; i < divs.length; ++i){
  var classes = divs[i].className;
  if(myclass.test(classes)) posts.push(divs[i]);
 }
 for(var i = 0; i < posts.length; ++i){
  var postertrip = posts[i].getElementsByTagName('span')[4];
  if(/!MILKRIBS4k|!!Ujy3nuTYXdqNK7B/.test(postertrip.innerHTML))
   posts[i].parentNode.removeChild(posts[i]);
 }
})();