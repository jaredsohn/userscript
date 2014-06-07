// ==UserScript==
// @name          FF.NET Remove Shit
// @description   How Horrifying 
// @include       http://*.fanfiction.net/*
// ==/UserScript==
// Changelog
// 04/07/2012 Fixed image hiding on search
// 26/05/2012 Bottom background image added
// 19/03/2012 Fixed for opera

// Opera functionality
GM_addStyle=function(css){ document.documentElement.appendChild(document.createElement('style')).appendChild(document.createTextNode(css)); };
GM_openInTab=window.open;
GM_deleteValue=function(k){ return localStorage.removeItem(k); }
GM_setValue=function(k,v){ return localStorage.setItem(k,v); }
GM_getValue=function(k){ return localStorage.getItem(k); }
GM_listValues=function(){ var i=0,ii=localStorage.length,ret=[]; for(;i<ii;++i){ ret.push(localStorage.key(i)); } return ret; };
GM_xmlhttpRequest=function(obj){ return; };
  
// Shit
GM_addStyle(".z-indent { padding-left:2px !important; }");
GM_addStyle(".z-list { padding-bottom:1px; padding-top:1px; padding-left:2px; !important; }");
GM_addStyle(".z-padtop { padding-top:0px; !important; }");
GM_addStyle(".z-padtop2 { padding-top:0px; !important; }");
GM_addStyle("#zmenu {width: 95% !important;}");
GM_addStyle("#menulinks {width: 95% !important;}");

GM_addStyle("#content_wrapper {max-width:1920px !important;width: 90% !important;}");
GM_addStyle("#menulinks {max-width:1920px !important;width: 90% !important;}");
//GM_addStyle(".menulinks {width: 1% !important;}");
//GM_addStyle("div.menulinks {width: 1% !important;}");
//GM_addStyle("class.menulinks {width: 1% !important;}");

GM_addStyle("#p_footer {max-width:1920px !important;width: 90% !important;}");
//GM_addStyle(".p_footer {width: 1% !important;}");
//GM_addStyle("div.p_footer {width: 1% !important;}");
GM_addStyle(".xcontrast_outer {background-color:#333 !important;}");



//GM_addStyle("div.menulinks {width: 1920px;max-width: 1920px; !important;}");
//GM_addStyle("div.p_footer {width: 1920px;max-width: 1920px; !important;}");
//GM_addStyle("div.content_wrapper {width: 1920px;max-width: 1920px; !important;}");

var nameOfTagToMatch = "*";
var classOfTagToMatch = "lazy cimage";
var classOfTagToMatch2 = "lazy cimage";


// Do not edit below this point.

function killTagsByClass(tagType, tagClass){
	var element = document.getElementsByTagName(tagType);

	for (i=0; i<element.length; i++) {
		if (element[i].className==tagClass) {
			element[i].style.display="none";
		}
	}
}

killTagsByClass(nameOfTagToMatch,classOfTagToMatch);
killTagsByClass(nameOfTagToMatch,classOfTagToMatch2);
