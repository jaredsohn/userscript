// ==UserScript==
// @name          Scheduleworld Todo
// @namespace     http://userstyles.org
// @description	  Scheduleworld Todo
// @author        Nathan
// @homepage      http://userstyles.org/styles/1236xx
// @include       http://www.scheduleworld.com/tg/cal/day.jsp*
// ==/UserScript==

if (document.title != "Welcome to ScheduleWorld") {
unsafeWindow.confirm = function(){return(true);}
var css = 'div + span,.handle,input[type="submit"],span.smalltext,span[id^="lastspan"] *{display:none;}.view{background:transparent !important;white-space:nowrap;}#listExamples li{width:auto}#listExamples li:hover{background:#ffe !important;}span[id^="lastspan"]{display:inline;margin-left:-9999px}span[id^="lastspan"] a{text-decoration:none;color:#000;opacity:0.3;font-variant:small-caps;display:block;position:absolute;top:0;right:0;padding:0.15em 0.5em 0.35em 0.6em;}span[id^="lastspan"] a:hover{color:#b03;opacity:0.8;} form {color:#eee;}td[valign="bottom"]{background:#eee;text-align:center}input[type="text"]{color:#000;background:#fff !important;width:93%;border:0;padding:3px;top:0;left:0;margin-bottom:0.9em}ul.boxy li{cursor:n-resize !important;padding:.1em .3em !important;background:#fff !important;border:0!important;border-bottom:1px solid #ddd !important;}body{overflow:hidden;max-width:600px;}#listExamples{position:absolute;z-index:999;top:2em;left:50%;margin-left:-200px;height:99%;width:400px}center{margin:-999% 0 0 -999%;}';
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node);
	}
}
document.forms[2].elements[0].focus();
} else {

var css = 'table[width="94%"],table[width="95%"]{margin-left:-999%;}td[width="75%"],table[id="webview_table"] tr:first-child,#ga-hr,#ga-noid,#ga-easy,.fpwd{display:none;}table[id="webview_table"]{position:absolute;top:0;left:0;}';
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node);
	}
}

}