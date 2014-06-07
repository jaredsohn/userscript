// ==UserScript==
// @name           Hatena Bookmark Simple View
// @namespace      http://rono23.blogspot.com
// @include        http://b.hatena.ne.jp/entry/*
// ==/UserScript==

(function(){
  var cssNode = document.createElement('link');
  cssNode.type = 'text/css';
  cssNode.rel = 'stylesheet';
  cssNode.href = 'http://www.rono23.org/css/hatenabookmark.css';
  cssNode.media = 'screen';
  cssNode.title = 'dynamicLoadedSheet';
  document.getElementsByTagName("head")[0].appendChild(cssNode);
    
  location.href = "javascript:void(Ten.Selector.getElementsBySelector('ul#bookmarked_user > li').filter(function(e) { return !e.getElementsByClassName('comment').item(0).innerHTML.length }).forEach(function(e) { e.style.display = 'none' }))";

  var li = document.createElement('li');  
  var a = document.createElement('a');
  a.href = location.href.replace(/entry\//, 'entry?url=');
  a.innerHTML = "全部見る";
  li.appendChild(a);
  document.getElementById("entry-info").appendChild(li);

})();