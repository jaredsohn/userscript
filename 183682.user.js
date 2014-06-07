// ==UserScript==
// @name           BYR BBS ip2location
// @namespace      http://bbs.byr.cn/
// @description	   使北邮人论坛用户发贴IP地址后附加物理地址信息
// @include        http://forum.byr.edu.cn/*
// @include        http://forum.byr.cn/*
// @include        http://bbs.byr.edu.cn/*
// @include        http://bbs6.byr.edu.cn/*
// @include        http://bbs.byr.cn/*
// @include        http://bbs6.byr.cn/*
// @include        http://www.newsmth.net/*
// @version        1.7
// @author         Binux
// @author         John Wong
// ==/UserScript==

function showLoading(ip, font){
	var span = document.createElement("span");
	span.innerHTML = " [ LOADING... ]";
	span.className = ip;
	font.appendChild(span);
}

function onLoad(event) {
	var fonts = document.getElementsByTagName("font");
	for ( var i = 0,font;font = fonts[i];i++ )
	{
		var result = font.innerHTML.match(/\[FROM:\D{0,5}([0-9a-fA-F\.:]+.)\]/);
		if(result && font.lastChild.nodeName != "SPAN")
		{
			var ip = result[1].replace("*","0");
			showLoading(ip, font);
			sendRequest(ip);
			return;
		}
	}
}

function sendRequest(ip){
    setTimeout(function() {GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://pytool.sinaapp.com/geo?type=json&pos=1&ip='+ip,
    onload: function(responseDetails) {
        var response = responseDetails.responseText;
        var ret = eval('(' + response + ')')['geo']
		var ip = ret['ip']
        var loc = ret['loc']
        showAddress({'ip': ip,'loc': loc});
        }
    })}, 0);
}

function showAddress(response){
	var spans = document.getElementsByClassName(response.ip);
	for(var i=0,span;span = spans[i];i++){
		span.innerHTML = " [" + response.loc + "] ";
	}
}

onLoad();
window.addEventListener("load", onLoad, false);
window.addEventListener("AutoPagerAfterInsert", onLoad, false);
document.addEventListener("DOMNodeInserted", onLoad, false);