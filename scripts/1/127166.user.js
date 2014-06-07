// ==UserScript==
// @name           115
// @namespace      dzl
// @include        http://192.168.1.169/ctop/login/mainmenu.jsp
// ==/UserScript==

var data = {
	"i": {
		"enabled": true,
		"time": ["09:00~09:30", 15],
		"lock": false
	},
	"o": {
		"enabled": true,
		"time": ["21:00~21:30", 15],
		"lock": false
	},
	"option": {
		"retry": 3
	},
	"status": {
		"number": 0,
		"string": ["|", "/", "-", "\\"]
	},
	"rt": false,
	"log": {
		"last": {
			"io": null,
			"time": null,
			"retry": null
		}
	}
};

var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement, GM_JQ = document.createElement('script');
		
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;
		
		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

var signRequest = function(io, retry){
	if (retry < data.option.retry) {
		$.get("http://192.168.1.169/ctop/login/checklogin.jsp?mode=" + io, function(d){
			if (d.indexOf("考勤成功") == -1) {
				retry++;
				signRequest(io, retry);
			}
			else {
				var date = new Date();
				var d = date.getDay();
				var h = date.getHours();
				var m = date.getMinutes();
				
				data.rt = false;
				
				data.log.last.io = io;
				data.log.last.time = "{d:" + d + ",t:'" + h + ":" + m + "'}";
				data.log.last.retry = retry;
			}
		})
	}
}

var sign = function(io){
	var rm = io == "in" ? data.i.time[1] : data.o.time[1];
	data.rt = Math.floor(Math.random() * rm);
	
	data.log.last.io = null;
	data.log.last.time = null;
	data.log.last.retry = null;
	
	window.setTimeout(function(){
		signRequest(io, 0);
	}, 1000 * 60 * data.rt);
}

var status = function(io){
	var date = new Date();
	var d = date.getDay();
	var h = date.getHours();
	var m = date.getMinutes();
	
	var status = data.status.string[data.status.number];
	
	if (data.status.number < data.status.string.length - 1) {
		data.status.number++;
	}
	else {
		data.status.number = 0;
	}
	
	var s = "[" + status + "] week:" + d + " time:" + h + ":" + m + " sign:" + io;
	
	if (data.rt != false) {
		s += " rTime:" + data.rt;
	}
	
	if (data.log.last.io != null && data.log.last.time != null && data.log.last.retry != null) {
		s += " last:{io:" + data.log.last.io + ",time:" + data.log.last.time + ",retry:" + data.log.last.retry + "}";
	}
	
	return s;
}

var checkIO = function(){
	var date = new Date();
	var d = date.getDay();
	var h = date.getHours();
	var m = date.getMinutes();
	
	if (d > 0 && d < 6) {
		var iTime = data.i.time[0].split("~");
		iTime[0] = "1" + iTime[0].replace(":", "");
		iTime[1] = "1" + iTime[1].replace(":", "");
		var oTime = data.o.time[0].split("~");
		oTime[0] = "1" + oTime[0].replace(":", "");
		oTime[1] = "1" + oTime[1].replace(":", "");
		
		var nTime = "1" + (h < 10 ? "0" : "") + h + (m < 10 ? "0" : "") + m;
		
		if (nTime > iTime[0] && nTime < iTime[1]) {
			return "in";
		}
		else 
			if (nTime > oTime[0] && nTime < oTime[1]) {
				return "out";
			}
	}
	
	return false;
	
}

var checkTime = function(){
	var io = checkIO();
	document.title = status(io);
	if (io == "in" && data.i.lock == false && data.i.enabled == true) {
		data.i.lock = true;
		sign(io);
	}
	else 
		if (io == "out" && data.o.lock == false && data.o.enabled == true) {
			data.o.lock = true;
			sign(io);
		}
		else 
			if (io == false) {
				data.i.lock = false;
				data.o.lock = false;
			}
}

// All your GM code must be inside this function
function letsJQuery(){
	//	alert("自动签到加载成功，请注意页面标题栏，观察脚本是否运行正常。");
	window.setInterval(checkTime, 1000);
}
