// ==UserScript==
// @name           vod.cau.edu.cn for Chrome
// @namespace  http://whenov.org/
// @version        0.1
// @description  Watch videos on vod.cau.edu.cn in Chrome directly
// @match          http://vod.cau.edu.cn/index.php?mod=movie&action=view&movid=*
// @copyright     2013+, whenov
// ==/UserScript==

var script0 = document.createElement('script');
script0.type = "text/javascript"; 
script0.src = "http://www.1kjs.com/lib/widget/gbk/UNIC-GBK.js"
document.head.appendChild(script0);

var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = " \
function play(jumpurl, width, height) { \
	$.get(jumpurl, function(data){ \
		var r = data.match(/<param name=\"url\" value=\"http:\\/\\/(.*)\">/); \
		if (r === null) { \
			document.cookie = 'vodcms_uid=10000'; \
			play(jumpurl, width, height); \
			return; \
		} \
		var url = r[1]; \
		var host = url.split('/', 1)[0]; \
        if (typeof $URL == 'undefined') { \
            alert('请连接网关'); \
			return; \
        } \
		var pathname = $URL.encode(url.substring(url.indexOf('/')+1)); \
		url = 'http://' + host + '/' + pathname; \
		window.location = url; \
	}); \
} \
";
document.head.appendChild(script);