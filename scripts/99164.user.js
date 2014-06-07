// ==UserScript==
// @name	ORKUT- Theme By Scrapur.com
// @namespace     Orkut Theme Maker - Scrapur
// @description	Make your own theme for orkut!
// @author	Vinayendra | D3
// @homepage	http://www.scrapur.com
// @include	http://www.orkut.*/*
// ==/UserScript==


    var css = ".GvamapgK2 {background-image: url(\"http://img254.imageshack.us/img254/9980/orkutfirefoxthemebg3.png\") !important;}"; if (typeof GM_addStyle != "undefined") {	GM_addStyle(css);} else if (typeof addStyle != "undefined") {	addStyle(css);} else {	var heads = document.getElementsByTagName("head");	if (heads.length > 0) {		var node = document.createElement("style");		node.type = "text/css";		node.appendChild(document.createTextNode(css));		heads[0].appendChild(node); 	}}	
var css1 = "body {background-image: url(\"http://img254.imageshack.us/img254/9980/orkutfirefoxthemebg3.png\") !important;}"; if (typeof GM_addStyle != "undefined") {	GM_addStyle(css1);} else if (typeof addStyle != "undefined") {	addStyle(css1);} else {	var heads = document.getElementsByTagName("head");	if (heads.length > 0) {		var node = document.createElement("style");		node.type = "text/css";		node.appendChild(document.createTextNode(css1));		heads[0].appendChild(node); 	}}	
 var css2 = ".GvamapgBDC{background-image: url(\"http://img254.imageshack.us/img254/9980/orkutfirefoxthemebg3.png\") !important;}"; if (typeof GM_addStyle != "undefined") {	GM_addStyle(css2);} else if (typeof addStyle != "undefined") {	addStyle(css2);} else {	var heads = document.getElementsByTagName("head");	if (heads.length > 0) {		var node = document.createElement("style");		node.type = "text/css";		node.appendChild(document.createTextNode(css2));		heads[0].appendChild(node); 	}}