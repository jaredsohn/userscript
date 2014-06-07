
// ==UserScript==
// @name          winoCookies
// @description	  Instal & edit Cookies
// @By			  Ibrahim Bidi
// @namespace     http://www.wino.ws
// @namespace     javascript@hotmail.co.uk
// @include       *
// ==/UserScript==
(function() {
var test = 'function DeleteCookie () {var name = document.getElementById("alert_w").value;var exp = new Date();exp.setTime (exp.getTime() - 1); var cval = getcookie_w (name);  document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();} function setcookie_w(name, value, expires, path, domain, secure){document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : "; expires=" +expires.toGMTString()) + ((path == null) ? "" : "; path=" + path) +((domain == null) ? "" : "; domain=" + domain) + ((secure == null) ? "" : "; secure");}function getcookie_w(name,value) {var search = name + "=";if (document.cookie.length > 0) {offset=document.cookie.indexOf(search);if(offset != -1){offset += search.length; end = document.cookie.indexOf(";", offset);if(end==-1)end = document.cookie.length;return unescape(document.cookie.substring(offset, end))}}}var now=new Date();now.setTime(now.getTime()/* + 31 * 24 * 60 * 60 * 1000*/);function setcookies(){var name_w=document.getElementById("name_w").value;var value_w=document.getElementById("value_w").value;setcookie_w(name_w,value_w)}function alertcookie(){alert(getcookie_w(document.getElementById("alert_w").value))}function fullcookie (){alert(document.cookie)}';

var scr=document.createElement("script");
    scr.innerHTML = test;   
   document.body.appendChild(scr)
		var htmls = '<div align="center"><TABLE border="2" bordercolor="369" bgcolor="#CCCCFF"><TR><TD><div style="color:#000000;cursor:pointer" onclick="setcookies()">installcookie</div><input id="name_w" /><BR><input id="value_w" /><hr><div style="color:#000000;cursor:pointer" onclick="alertcookie()">alert set value</div><input id="alert_w"><hr><div style="color:#000000;cursor:pointer" onclick="fullcookie()">alert full cookie</div><hr><div style="color:#000000;cursor:pointer" onclick="DeleteCookie()">DelletCookie</div></TD></TR></TABLE></div>';
document.body.innerHTML += htmls
	
})();