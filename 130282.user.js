// ==UserScript==
// @name 清水河畔——修复Chrome下Ajax相关问题
// @description 修复Chrome浏览器中与pw_ajax.js有关的问题。
// @match http://bbs.stuhome.net/*
// @match http://bbs.auxten.com/*
// @match http://bbs.uestc6.edu.cn/*
// @match http://bbs.tangdg.info/*
// @match http://bbs.qshpan.com/*
// @match http://bbs.germanyt.com/*
// ==/UserScript==

var patch = "XMLhttp&&XMLhttp.prototype.runscript&&(XMLhttp.prototype.runscript=(function(h){if(h.indexOf('<script')==-1)return h;h=h.replace(/<script(.*?)>([^\\x00]*?)<\\/script>/ig,function($1,$2,$3){var i=p=c='';if($2.match(/\\s*id\\=\"([\\w\\_]+?)\"/i)){i=RegExp.$1;}if($2.match(/\\s*src\\=\"(.+?)\"/i)){p=RegExp.$1;}else{c=$3;}loadjs(p,c,i);return '';});return h;}))&&XMLhttp.prototype.load&&(XMLhttp.prototype.load=(function(){if (is_ie){ajax.request.responseText=(typeof ajax.request.iframe.contentWindow.document.XMLDocument!='undefined')?ajax.request.iframe.contentWindow.document.XMLDocument.text:null;ajax.request.iframe.detachEvent('onload',ajax.load);}else {ajax.request.responseText=ajax.request.iframe.contentWindow.document.documentElement.textContent;ajax.request.iframe.removeEventListener('load',ajax.load,true);}ajax.recall();}));";
if(document.documentElement.tagName.toLowerCase() == "html")
{
	var script = document.createElement("script");
	script.appendChild(document.createTextNode(patch));
	document.body.appendChild(script);
}
