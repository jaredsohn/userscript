// ==UserScript==
// @name           DiggBar+Delicious
// @namespace      http://delicious.com/
// @description    Delicious integration with DiggBar
// @include        http://digg.com/*
// ==/UserScript==

var share = getElementsByClassName('t-share');

if (share[0]) {
  var btn=document.createElement("a");
  btn.className="t-delicious";
  btn.innerHTML='<img src="http://static.delicious.com/static/img/delicious16.gif" height="16" width="16" />';
  btn.addEventListener("click", postBookmark, false);
  share[0].appendChild(btn);
  
}

function getElementsByClassName(classname, node) {

  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for(var i=0,j=els.length; i<j; i++)
  if(re.test(els[i].className))a.push(els[i]);
  return a;

}


function postBookmark(event){    
  var title = document.title;
  var url=document.getElementById('diggiFrame').src;
    
  window.open('http://delicious.com/save?v=5&amp;noui&amp;jump=close&amp;url='+encodeURIComponent(url)+'&amp;title='+encodeURIComponent(title), 'delicious','toolbar=no,width=550,height=550');
}
