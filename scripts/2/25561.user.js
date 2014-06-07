// ==UserScript==
// @name           larkicset oldalra
// @namespace      ns
// @include        http://wanderlust2.index.hu/cgi-bin/jatek.com
// ==/UserScript==

var chatbox=document.getElementById("mydiv");
addCSS(".chatbox{padding: 10px 5px 0;position: absolute; z-index: 1000 !important; left: 790px !important; top: 100px !important; width: 200px !important; height: 500px !important;  background-color: #fff !important; overflow-x: auto !important;}"); 
chatbox.className="chatbox";

function addCSS(cssString) {
	var style, head;
	head = document.getElementsByTagName('HEAD')[0]; if (!head) { return; }
	style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = cssString;
	head.appendChild(style);
}