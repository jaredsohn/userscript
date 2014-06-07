// ==UserScript==
// @name           Twitter Comma Encoder
// @namespace      http://twitter.g.hatena.ne.jp/	
// @description    Replaces "," with "%2C" suitably for broken Twitter
// @author	   _tad_
// @version	   0.1
// @include        http://twitter.com/*
// ==/UserScript==

(function () {
    var HTTPURL = /https?:\/\/[-_\.!~\*\(\)\w\d\/;\?:\@&=\+\$,%#]+/g
    var stat = document.getElementById('status')
    function replace_comma(_) {
	var str = stat.value
	var url = str.match(HTTPURL)
	if (url == null)
	    return false
	for (var i = 0; i < url.length; i++) {
	    var eurl = url[i].replace(',', '%2C')
	    str = str.replace(url[i], eurl)
	}
	stat.value = str
	return false
    }
    stat.addEventListener('blur', replace_comma, true)
})()
