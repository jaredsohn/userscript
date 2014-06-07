// ==UserScript==
// @name           Nga  refresher
// @author         godeye
// @namespace      http://userscript.org
// @description    使你在NGA负载过高时不用再等待...
// @version        1.0
// @include        http://bbs.ngacn.cc/*
// ==/UserScript==

(function(){
	if (document.getElementsByTagName('title')[0].innerHTML == '\u670D\u52A1\u5668\u8D1F\u8F7D\u8FC7\u9AD8') {
		document.getElementsByTagName('body')[0].setAttribute('onload','setTimeout("window.location.reload()",1);');
	}
}());