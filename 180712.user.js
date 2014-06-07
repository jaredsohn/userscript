// ==UserScript==
// @name        ASWD XJOI Hack
// @namespace   EnderKnight
// @description XJOI黑科技
// @include     http://210.33.7.101/contest/problem.php*
// @include     http://www.hzxjhs*/contest/problem.php*
// @version     1.01
// ==/UserScript==

//License:GPL v3

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
var pid=getQueryString("num");
var cid=getQueryString("cid");
var elem=document.createElement("a");
elem.innerHTML="看结果";
elem.href="http://"+window.location.hostname+":"+window.location.port+
"/contest/status.php?cid="+cid+"&num="+pid;
document.body.appendChild(elem);
document.body.innerHTML+="<br><br><br>"
