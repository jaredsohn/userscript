// ==UserScript==
// @name        ASWD LYDSY Discuss
// @namespace   EnderKnight
// @include     http://www.lydsy.com*/JudgeOnline/problem.php*
// @version     1.02
// @description 大视野在线测评 讨论版连接
// ==/UserScript==

//License:GPL v3

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

var pid=getQueryString("id");
var elem=document.createElement("a");
elem.innerHTML="Discuss";
elem.href="http://www.lydsy.com:"+window.location.port+"/JudgeOnline/wttl/wttl.php?pid="+pid;
document.body.appendChild(elem);
document.body.innerHTML+="<br><br><br>" //workaround for Pentadactyl
