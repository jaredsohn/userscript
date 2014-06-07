// ==UserScript==
// @name        dreamviews.com : dream journal categories enhancer
// @namespace   tukkek
// @include     http://www.dreamviews.com/blogs/categories/*/*
// @description    Focus screen on content and opens comments on same page
// @version     1
// ==/UserScript==
function getByClass(name){
  return document.getElementsByClassName(name);
}
GM_addStyle('.featurepost_img {display:none;} iframe{width:100%;display:none;');
document.body.innerHTML=document.getElementById('content_container').innerHTML;
document.body.style.background='LightGray';
var es = getByClass('blogbit'); 
for (e in es) {
  if (es[e].style!=null) es[e].style.margin='0'; //tried same technique with getbytagname(h4), doesn t work
}
var as = getByClass('comments');
var cs = getByClass('postcontainer');
for (a in as) {
  cs[a].innerHTML+="<a	 onclick='document.getElementById(\"iframe"+a+"\").style.display=\"block\";'>Open</a><iframe id='iframe"+a+"' src='"+as[a].href+"'/>";
}
