// ==UserScript==
// @name           What.cd forum user ignorer
// @namespace      http://www.google.com/search?q=brtkrbzhnv
// @description    Hides posts by silly people
// @include        http://what.cd/forums.php?action=viewthread&threadid=*
// @include        http://what.cd/forums.php?page=*
// @include        https://ssl.what.cd/forums.php?action=viewthread&threadid=*
// @include        https://ssl.what.cd/forums.php?page=*
// @include        https://ssl.what.cd/torrents.php?id=*
// @include        https://what.cd/forums.php?action=viewthread&threadid=*
// @include        https://what.cd/forums.php?page=*
// @include        https://what.cd/torrents.php?id=*
// @include        http://what.cd/torrents.php?id=*
// ==/UserScript==
// 2012-08-29 update: fix for https urls without "ssl"
// 2012-07-10 update: added buttons to torrent pages (comments) + changed button from picture to text
// 2010-06-01 update: added the https includes
k="whatcdignoreuserwithid=";
main();
function main() {
for (A=x("//TD[@class='avatar']"), i=0;a=A.snapshotItem(i++);)
  (p=a.parentNode).setAttribute("userid", (í=(h=(c=p.previousSibling.previousSibling).getElementsByTagName("a")[1].href).substring(h.indexOf('=')+1))), 
  (GM_getValue(k+í))?p.style.display="none":0, 
  (ś=c.getElementsByTagName("span")[0]).appendChild(document.createTextNode(" - ")),
  ś.appendChild(ı=document.createElement("a")).innerHTML = "[Ignore]", ı.setAttribute("href", "javascript:;"),
  
  ı.addEventListener("click",ħ(í),false);
}
function x(q){
  return document.evaluate(q, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}
function ħ(i){return function(){
  for (E=x("//tr[@userid='"+i+"']"),ı=0;e=E.snapshotItem(ı++);)
    GM_setValue(k+i, (e.style.display)=(e.style.display=="none")?(""):("none"));
  };
} 