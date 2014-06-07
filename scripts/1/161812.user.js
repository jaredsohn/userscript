// ==UserScript==
// @name        百度搜索反跳转
// @namespace   noe132
// @include     http://www.baidu.com/*
// @updateURL      https://userscripts.org/scripts/source/161812.meta.js
// @downloadURL    https://userscripts.org/scripts/source/161812.user.js
// @icon	http://tb.himg.baidu.com/sys/portrait/item/d4346e6f65313332ac06
// @version     1.2.1
// ==/UserScript==

try{

function decode(url,target){
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://noe132.duapp.com/baidu2.php?url=' + url,
		onload: function(response){
			target.href = response.responseText;
		}
	});
}


var links = document.getElementsByTagName("a");

for (x in links){
	if(links[x].href){
		if(links[x].href.indexOf("http://www.baidu.com/link?url=") == 0){
			decode(links[x].href,links[x]);
		}
	}
}


}catch(e){console.log(e);}