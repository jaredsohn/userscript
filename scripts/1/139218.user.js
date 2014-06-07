// ==UserScript==
// @name          It's now
// @namespace     http://www.shanbay.com/
// @version	      1.32
// @include       http://www.shanbay.com/review/*
// ==/UserScript==

var createNotification = function(){
	var e = Date();
	var f = (Date.parse(e) - Date.parse("2012-7-30")) / 1000;
	var g = Math.floor(f / (3600 * 24));

	if(g!=0)
		return;

	var liHTML='<li style="font-size:18px;"> <img src="http://7-years-now.joelz.me/img/love_32.png" alt="love" />今天是一个特别的日子。'
				+'<a href="http://7-years-now.joelz.me/" target="_blank">为什么?</a> </li>';
	if($("#notification-container ul").length>0){
		$("#notification-container ul").append(liHTML);
	}
	else {
		$("#notification-container .notifications").append('<ul class="notification">'+liHTML+'</ul>');
		$("#notification-container").show();
	}
}

function contentEval( source ) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval( createNotification );