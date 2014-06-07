// ==UserScript==
// @name           Tumblr - Edit link
// @namespace      ivanmendoza.net
// @description    Add an edit link for tumblr posts (very useful for colaborative blogs)
// @include        http://*.tumblr.com/post/*
// ==/UserScript==

function getLink(){
  u=document.location;
  m=new RegExp('(http:\\/\\/)((?:[a-z][a-z\\.\\d\\-]+)\\.(?:[a-z][a-z\\-]+))(?![\\w\\.])(\\/post\\/)(\\d+)',["i"]).exec(u);
  id=m[m.length-1];
  return ("http://www.tumblr.com/edit/"+id+"?redirect_to="+encodeURIComponent(u));
}
function addLink(){
  var edit_page=getLink();
  var eLink = document.createElement("a");
  eLink.setAttribute("id","edit_link");
  eLink.setAttribute("style","position:absolute;top:26px;right:2px;padding:2px 0 0;width:40px;height:18px;display:block;overflow:hidden;-moz-border-radius:3px;background:#777;color:#fff;font-size:8pt;text-decoration:none;font-weight:bold;text-align:center;line-height:12pt;");
  eLink.setAttribute("href",edit_page);
  eLink.appendChild(document.createTextNode("Edit"));
  var elBody = document.getElementsByTagName("body")[0];
  elBody.appendChild(eLink);
}
addLink();