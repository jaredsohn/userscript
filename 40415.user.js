// ==UserScript==
// @name           fix prog
// @description    fixes all of FrozenVoid!FrOzEn2BUo's posts on /prog/
// @namespace      http://dis.4chan.org/prog/
// @include        http://dis.4chan.org/*
// @version        1.1
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
  var postername = posts[i].getElementsByTagName('span')[3];
  var postertrip = posts[i].getElementsByTagName('span')[4];
  if(/^!FrOzEn2BUo/.test(postertrip.innerHTML))
   posts[i].parentNode.removeChild(posts[i]);
 }
})();