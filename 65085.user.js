// ==UserScript==
// @name           Page width limiter
// @namespace      http://userscripts.org/users/124130
// @description    Restrict page width to a certain percentage.
// @include        http://forums.somethingawful.com/*
// ==/UserScript==

var rules = [];

//	============================================================
//	EDIT THIS STUFF IF YOU WANT
//	============================================================
//	Hello! You can specify the width you want here:
	const WIDTH = 75;
	
//	Is that a percentage? Set this to false if you want to
//	specify the width in pixels instead:
	const PERCENT = true;	
	
//	Set this to true if you want the content to be centered:
	const CENTERED = true;
	
//	If you know the elements you want to resize, you can
//	specify them here:
	rules[0] = "http://forums.somethingawful.com:#content";
//	============================================================

const URL = window.location.href;
var css = "";
var unit = "px";
var margins = "";

if(PERCENT)
	unit = "%";
	
if(CENTERED)
	margins = "margin-left: auto; margin-right:auto;";

const CSS_PROPERTIES = " { width: " + WIDTH + unit + "; " + margins + " } ";

for(var i in rules)
{	
	const index	= rules[i].lastIndexOf(":");
	const SITE	= rules[i].substr(0, index);
	const regexp	= new RegExp("^" + SITE);
	if(URL.match(regexp) != null)
	{
		css += rules[i].substr(index+1) + CSS_PROPERTIES;
	}
}

if(css == "")
	css = "body" + CSS_PROPERTIES;

if (typeof GM_addStyle != "undefined")
	GM_addStyle(css);
else if (typeof PRO_addStyle != "undefined")
	PRO_addStyle(css);
else if (typeof addStyle != "undefined")
	addStyle(css);
else
{
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0)
	{
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}