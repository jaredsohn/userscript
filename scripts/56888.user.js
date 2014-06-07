// ==UserScript==
// @name                Friendfeed old uploader
// @namespace           http://userscripts.org/scripts/show/56888
// @description         Switch friendfeed uploader to old uploader ;)
// @author		Ali Irani
// @authorWebsite	http://www.p30design.net
//@Version              1.1
// @include             *friendfeed.com*
// ==/UserScript==

var checker=setInterval(function(){
	var uEmbed = document.getElementById('fileuploader').parentNode;
	uEmbed.removeChild(uEmbed.childNodes[0]);
},100);
