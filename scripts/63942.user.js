// ==UserScript==
// @name          Facebook fixed menubar
// @namespace     http://userstyles.org
// @description	  fixed menubar_container 
// @author        worldwildweb
// @include       http://www.facebook.com/
// @include       http://*.facebook.com/*
// ==/UserScript==
(function () {

// Top Bar Positioning

var contentPosition = getPosition($('content'));
addStyle(' #menubar_container { position:fixed !important; width:100% !important;} ');
addStyle(' .profile #content, .home #content, .search #content { padding-top:34px;} ');
addStyle(' #content {padding:20px 0 0;} ');
addStyle(' .WelcomePage_MainSell { padding-top:90px;} ');
addStyle(' .UIFullPage_Container { margin:0 auto;padding:22px 12px 0;width:940px;} ');

// Get element by id

function $(id,root){
	return root ? root.getElementById(id) : document.getElementById(id);
}

// Get element(s) by class name

function $$(className,root){
	if (document.getElementsByClassName) {
		return root ? root.getElementsByClassName(className) : document.getElementsByClassName(className);
	} else {
		var elms = $x('//*[contains(@class,"'+className+'")]',root);
		var buffer = new Array();
		for (var i=0; i<elms.snapshotLength; i++) { buffer.push(elms.snapshotItem(i)); }
		return buffer;
	}
}

// XPath

function $x(xpath,root){
	return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}

// Add style

function addStyle(css) {
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
	}
}

// Get an elements position

function getPosition(elm) {
	var x=0;
	var y=0;
	while (elm != null) {
		x += elm.offsetLeft;
		y += elm.offsetTop;
		elm = elm.offsetParent;
	}
	return Array(x,y);
}

}) ();