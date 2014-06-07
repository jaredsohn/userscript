// ==UserScript==
// @name          Blip Twitter Theme
// @namespace     Theme Twitter for Blip.fm 
// @description	  Theme Twitter for Blip.fm 
// @author        rm 
// @include       http://blip.fm/*
// ==/UserScript==

var css = " body { background: #C0DEED url('http://a3.twimg.com/a/1255384803/images/bg-clouds.png') repeat-x; } #menu {background: transparent !important; background-color: none;}#supermenu ul li a, #supermenu ul li a:link {color: #2276bb; background: transparent; background-color: none; border: none !important;}#supermenu ul li a:hover {color: #0099cc;background-color: #ffffff;} #header{background: transparent !important; background-color: none; border: none;} #slot728x90 {height: 170px;} #logo{border:none;} div.col2 div.container {background: transparent !important; background-color: none;}";
   
   
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}