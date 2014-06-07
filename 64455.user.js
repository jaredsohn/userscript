// ==UserScript==
// @name          Im@gination*Forums Scrooged Skin
// @namespace     http://userstyles.org
// @description	  Im@gination*Forums
// @author        HaArD
// @homepage      http://userscripts.org/scripts/show/64455/
// @include       http://www.imforums.com/forums/*
// ==/UserScript==

// Darkman turned off the new Vbulletin 4.0 XMas theme before this version was finished.
// I'll continue working on it when the 2010 X-Mas blight begins......

(function() {

var css = "html {	background:#000000 url(http://img705.imageshack.us/img705/9421/humbug.png) repeat 0 0;} .above_body {	background:#550705 url(http://img137.imageshack.us/img137/1171/humbughdr.png) repeat-x;} .body_wrapper, .postdetails, .userinfo, .postbody, .forumrow, .threads {    background-color: #A5A2A5 !important;} .posthead, .forumhead, .threadlisthead {    background-color: #550705 !important;}";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
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


var logo = document.evaluate("//img[contains(@src, 'styles/xmas/xmas_logo.png')]", document, null, 9, null).singleNodeValue;
if(logo) {
logo.src = "http://img263.imageshack.us/img263/3229/humbuglogo.png";
}

var allImgs,thisImg, pathstr;
allImgs = document.evaluate('//img[@src]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = new RegExp('images/XcaliburChristmas','gi');
var replace = 'rogue';
for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('images/XcaliburChristmas/statusicon/forum_old.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://img693.imageshack.us/img693/3545/scroogeold42.jpg';
  	}
	var srcMatch = src.match('images/XcaliburChristmas/statusicon/forum_new.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://img695.imageshack.us/img695/1453/scroogenew42.jpg';
  	}
  thisImg.src = thisImg.src.replace(searchRE, replace);
}
   

})();
//http://img263.imageshack.us/img263/3229/humbuglogo.png
//http://img705.imageshack.us/img705/9421/humbug.png
//http://img137.imageshack.us/img137/1171/humbughdr.png
//http://img693.imageshack.us/img693/3545/scroogeold42.jpg
//http://img192.imageshack.us/img192/2072/scroogeoldlock42.jpg
//http://img693.imageshack.us/img693/3545/scroogenew42.jpg
//http://img231.imageshack.us/img231/5914/scroogenewlock42.jpg
