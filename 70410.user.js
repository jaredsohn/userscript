// ==UserScript==
// @name          Facebook fixed menubar
// @namespace     http://userstyles.org
// @description	  fixed menubar_container 
// @author        EaterofOrphans
// @include       http://www.facebook.com/
// @include       http://*.facebook.com/*
// ==/UserScript==
(function () {

// Top Bar Positioning

var contentPosition = getPosition($('content'));
addStyle(' #blueBar { position:fixed !important;background-color:#3B5999;} ');
addStyle(' #pageHead { position:fixed !important;width:77.6% !important;margin-left:135px;} ');
addStyle(' #leftCol { margin-top:30px !important;} ');
addStyle(' #contentCol {padding-top:40px !important;} ');
addStyle(' #headNavOut {background-color:#637AAE;background-color:#637AAE;} ');
addStyle(' #profile_top_bar {margin-top:20px !important;} ');
addStyle(' #left_column {margin-top:20px !important;} ');
addStyle(' .UIStandardFrame_Content {margin-top:20px !important;} ');
addStyle(' .WelcomePage_MainSell { padding-top:90px;} ');
addStyle(' .UIFullPage_Container { margin:0 auto;padding:22px 12px 0;width:940px;} ');
addStyle(' #pagelet_chat_home { display:none;} ');
addStyle(' #home_sponsor_nile { display:none;} ');
addStyle(' #pageLogo a { background:url("http://static.ak.fbcdn.net/rsrc.php/z7VU4/hash/66ad7upf.png") no-repeat scroll -21px 0 #3B5999;} ');
addStyle(' #pageLogo a:hover,#pageLogo a:focus,#pageLogo a:active { background-color:#4B67A1;} ');
addStyle(' .jewelToggler { background:url("http://static.ak.fbcdn.net/rsrc.php/z7VU4/hash/66ad7upf.png") no-repeat scroll 0 0 transparent;} ');
addStyle(' #menubar_container { background-color:#3B5999;} ');


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