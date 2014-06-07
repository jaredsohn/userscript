// ==UserScript==
// @name	Source Viewer
// @namespace	http://bit.ly/14VCzbr
// @description	View Source Code of any homepage
// @include	http://*/*
// @include	https://*/*
// @match	https://dl.dropbox.com/sh/2qdhmz4jgq2lrrx/*/*
// @version	5.3
// @updateURL	https://userscripts.org/scripts/source/167703.meta.js
// @downloadURL	https://userscripts.org/scripts/source/167703.user.js
// @icon	http://www.chip.de/ii/8/8/3/8/0/6/0/99e7dc2dba159b09.jpg
// @icon64	https://dl.dropbox.com/sh/2qdhmz4jgq2lrrx/di9vjnUPUb/icon64x64.jpg
// @author	Joshiii98
// @grant   GM_addStyle
// @copyright	2013+ , Joshiii98
// ==/UserScript==

GM_addStyle("#viewthesource{border: solid 1px black;position: fixed;right: 0;left: 0;bottom: 0px;background-color: #9E9E9E;z-index: 9999;height: 33px;width: 130px;margin: auto;}")

// ==Profile==
	unsafeWindow.viewthesource = function(){
    window.location="view-source:"+window.location
}
// ==============

// ==Body==
body = document.body;
if(body != null) {
	div2 = document.createElement("div");
	div2.setAttribute('id','viewthesource');
	div2.innerHTML = "<center><img alt='Hide' src='http://file1scriptz.funpic.de/pic/hide_button.png' onclick='javascript:hide()'></center>\n<a href='javascript:viewthesource()' onclick='javascript:viewthesource()'>Click to view source!</a> "
	body.appendChild(div2);
}
// ==============

// ==Hide/Show==
	unsafeWindow.hide = function(){
	var a = new Date();
	a = new Date(a.getTime() +1000*60*60*24*365);
	document.cookie = 'sourcefunction=hide; path=/; expires='+a.toGMTString()+';';
}
	if (document.cookie.indexOf("sourcefunction=hide") >= 0) {
    GM_addStyle("#viewthesource{border: solid 1px black;position: fixed;right: 0;left: 0;bottom: 0px;background-color: #9E9E9E;z-index: 9999;height: 15px;width: 45px;margin: auto;}")
    document.getElementById("viewthesource").innerHTML = "<center><img alt='Show' src='http://file1scriptz.funpic.de/pic/show_button.png' onclick='javascript:show()'></center>";
}
	unsafeWindow.show = function(){
    document.cookie = 'sourcefunction=hide; path=/; expires=Thu, 01-Jan-70 00:00:01 GMT;';
}
// ==============