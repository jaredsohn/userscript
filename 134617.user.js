// ==UserScript==
// @name           fix unishit
// @namespace      http://dis.4chan.org/prog/
// @description    fixes the unicode shitposts
// @include        http://dis.4chan.org/*;
// ==/UserScript==

(function(){
 var posts = [];
 var myclass = new RegExp('\\bpost\\b');
 var divs = document.getElementsByTagName('div')
 var gayness = /[^\\u0000-\\u00ff]/;

 for(var i = 0; i < divs.length; ++i){
  var classes = divs[i].className;
  if(myclass.test(classes)) posts.push(divs[i]);
 }
 for(var i = 0; i < posts.length; ++i){
  var postername = posts[i].getElementsByTagName('span')[3];
  var postertrip = posts[i].getElementsByTagName('span')[4];
  var postbody   = posts[i].getElementsByTagName('blockquote')[0];
  if(gayness.test(postbody.textContent))
   posts[i].parentNode.removeChild(posts[i]);
 }
}());
