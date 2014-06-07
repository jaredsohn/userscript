// ==UserScript==
// @name           refresh_status
// @namespace      wutj.info
// @include        http://*.renren.com/*
// @include        http://renren.com/*
// ==/UserScript==

function main()
{
	var Links = document.getElementsByTagName("A");

	for (var idx=0; idx<Links.length; idx++) {
		var a = Links[idx];
		if (!a.getAttribute("onclick")) continue;
		if (a.getAttribute("refresh_added")) continue;
		if (a.getAttribute("onclick").indexOf("getReplyOfTheDoing") <0) continue;
		if (a.getAttribute("onclick").indexOf("delReplyEditor") >=0) continue;
		if (a.href.indexOf("#nogo") <0) continue;
		
		var params = a.getAttribute("onclick");
		params = params.split("'");
		var a1 = params[1];
		var a2 = params[3];
		var a3 = params[5];
		var a4 = params[7];
		
		var newa = document.createElement("a");
		a.parentNode.appendChild(newa);
		newa.href="#nogo";
		var jsline = "delReplyEditor('"+a1+"','"+a4+"');";
		jsline += a.getAttribute("onclick");
		newa.setAttribute("onclick", jsline);
		newa.innerHTML="&nbsp;<span>刷新回复</span>";
		
		a.setAttribute("refresh_added", 1);
	}
}

var timer = window.setInterval(main, 500);
var flag = 0;

// dont allow it to finish...
window.addEventListener("mousemove", function() {
	if (flag == 1) {
		flag = 2;
		main();
		timer = window.setTimeout(function() {
			flag = 1;
		}, 1000);
	}
}, false);

window.addEventListener("load", function() {
	if (timer) window.clearInterval(timer);
	flag = 1;
}, false);
