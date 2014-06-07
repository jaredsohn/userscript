// ==UserScript==
// @name        查询
// @include *
// @match *://*/*
// @version     1.1
// ==/UserScript==
//

((function() {
	var url = window.inivar;
	if (!url) {
		url = ''
	};
	if (url.search(/(^(https?:\/\/)?[^\/]+\/[^\.\?&\/]+$)/i) == -1) {
		url = ''
	};
	var x = location.host;
	var y = location.hostname.replace(/^(www|bbs)\./i, '');
	document.body.innerHTML += '<div style=\x22box-shadow:0 0 6px #666;background-color:#5398ee;background-color:#5398ee\;color:white\;opacity:0.9\;border-radius:4px\;border:3px solid #5398ee\;width:504px\;position:fixed\;Z-index:999\;top:20px\;right:20px\;\x22 onClick=\x22this.style.display=\'none\'\;\x22><center>\u60A8\u7684<a href=\x22http:\/\/www.whoer.net\/ext\x22 target=\x22_blank\x22><font color=#fffffe>\u0049\u0050<\/font><\/a>\u5730\u5740\u662f\u3000\u002d\u3000\u5355\u51fb\u6b64\u5904\u5173\u95ed\u6b64\u7a97\u53e3<\/center><iframe width=\x22500\x22 height=\x2240\x22 style=\x22background-color:white\;border-radius:2px\;border:1px solid #b6bac0\;\x22src=\x22http:\/\/www.ip.cn\/getip2.php?action=getip\x22><\/iframe><center>' + x + '\u3000\u002d\u3000<a href=\x22http:\/\/whois.chinaz.com\/'+y+'\x22 target=\x22_blank\x22><font color=#fffffe>Whois<\/font><\/a>\u3000\u002d\u3000<a href=\x22http:\/\/alexa.chinaz.com\/?domain='+y+'\x22 target=\x22_blank\x22><font color=#fffffe>Alexa<\/font><\/a>\u3000\u002d\u3000<a href=\x22http:\/\/www.aizhan.com\/siteall\/' + x + '\x22 target=\x22_blank\x22><font color=#fffffe>Site<\/font><\/a><\/center><iframe width=\x22500\x22 height=\x2240\x22 style=\x22background-color:white\;border-radius:2px\;border:1px solid #b6bac0\;\x22src=\x22http:\/\/www.ip.cn\/getip2.php?action=queryip&ip_url=' + x + '\x22><\/iframe><center>\u672C\u9875好<font color=#fffffe>\u77ED<\/font><\/a>\u7F51\u5740<\/center><iframe width=\x22500\x22 height=\x2240\x22 style=\x22background-color:white\;border-radius:2px\;border:1px solid #b6bac0\;\x22src=\x22http:\/\/is.gd\/api.php?longurl=' + encodeURIComponent(location.href) + '\x22><\/iframe><center><a href=\x22http:\/\/www.hao123.com/tianqi\x22 target=\x22_blank\x22><font color=#fffffe>\u5929\u6C14<\/font><\/a>\u9884\u62A5<\/center><iframe width=\x22500\x22 height=\x2260\x22 style=\x22background-color:white\;border-radius:2px\;border:1px solid #b6bac0\;\x22src=\x22http:\/\/m.weather.com.cn\/m\/pn11\/weather.htm\x22><\/iframe><\/div>';
	void(0)
})()
