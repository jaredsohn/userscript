// ==UserScript==
// @name           Clean up Remember The Milk Print Views
// @namespace      http://*.rememberthemilk.com/print/*
// @include        http://*.rememberthemilk.com/print/*
// @include        http://*.rememberthemilk.com/printplanner/*
// ==/UserScript==

var css = "body{margin:0;padding:0;}br{display:none}#printheaderlogo{display:none}div div h1{margin:0}div h1{clear:both}ul{clear:both;padding-top:10px}li{padding-bottom:8px;width:23em;float:left;margin: 0 2em 0 26px;text-indent:-26px;}.box{margin-right:6px}.priolist{color: #000;font-weight:bold}.box{border:1px solid#666}#content{margin:0}";
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