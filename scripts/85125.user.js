// ==UserScript==
// @name           AnimeCrazy Mod
// @namespace      www.myhelp4you.tk
// @description    Makes the animecrazy.net site easyer, removes ads for now and will later add a auto update function and other stuff to make the site nicer.
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://*.animecrazy.net/*
// @include        https://*.animecrazy.net/*
// @include        http://animecrazy.net/*
// @include        https://animecrazy.net/*
// ==/UserScript==

var $;

var css = "\
{\
	margin: 0;\
}\
html, body {\
	height: 100% !important;\
}\
.acm_wrapper {\
	min-height: 100%;\
	height: auto !important;\
	height: 100%;\
	margin: 0 auto -4em;\
}\
.acm_footer, .acm_push {\
	height: 4em;\
}\
";

(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');
    
        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;
		
   		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
	GM_Setup();
        run();
    }
}

function GM_Setup()	{
	GM_addStyle(css);
}

function run() {
//Create FooterBAr
/*var snapResults = document.evaluate("//*[@class='BGC']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(snapResults.snapshotLength>0)
	{
		var elm = snapResults.snapshotItem(0);
		var acm_wrapper = document.createElement('div');
		acm_wrapper.setAttribute('id', 'acm_wrapper');
		acm_wrapper.setAttribute('class', 'acm_wrapper');
		acm_wrapper.innerHTML = "<div id=\"BGC\" class=\"BGC\">"+elm.innerHTML+"<div id=\"acm_push\" class=\"acm_push\"></div></div>";
		elm.parentNode.insertBefore(acm_wrapper, elm);
		elm.parentNode.removeChild(elm);
	}
*/
var snapResults = document.evaluate("//*[@class='Footer']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(snapResults.snapshotLength>0)
	{
		var elm = snapResults.snapshotItem(0);
		elm.innerHTML="<div class=\"acm_footer\"><p>Copyright (c) 2008</p></div>";
	}
//Remove Ads from AnimeCrazy
snapResults = document.evaluate("//*[@class='adtop']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults.snapshotItem(i);
		elm.parentNode.removeChild(elm);
	}
snapResults = document.evaluate("//*[@class='adbox']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults.snapshotItem(i);
		elm.parentNode.removeChild(elm);
	}
snapResults = document.evaluate("//*[@class='adboxl']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults.snapshotItem(i);
		elm.parentNode.removeChild(elm);
	}
snapResults = document.evaluate("//*[@class='adside']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults.snapshotItem(i);
		elm.parentNode.removeChild(elm);
	}
//Remove Useless Stuff
snapResults = document.evaluate("//*[@class='urwatching']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(snapResults.snapshotLength>0)
	{
		var elm = snapResults.snapshotItem(0);
		elm.innerHTML="";
	}
snapResults = document.evaluate("//*[@class='lastwatching']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(snapResults.snapshotLength>0)
	{
		var elm = snapResults.snapshotItem(0);
		elm.innerHTML="";
	}
snapResults = document.evaluate("//*[@class='fansDiv']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(snapResults.snapshotLength>0)
	{
		var elm = snapResults.snapshotItem(0);
		elm.innerHTML="";
	}
}