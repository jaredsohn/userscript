// ==UserScript==
// @name          Blognone GoExtra
// @namespace     http://fatro.net/
// @description   GoExtra
// @include       http://blognone.com/*
// @include       http://www.blognone.com/*

// ==/UserScript==


// Add Element Before Target
function addBefore(parent, target, element) {

	var gotParent, gotTarget, gotContent;

	gotParent = document.getElementById(parent);
	gotTarget = document.getElementById(target);
	gotParent.insertBefore(element, gotTarget);
}

var nav = document.getElementById("navi-menu");
addBefore("wrapper", "content", nav);

var logo = document.createElement('div'); 
logo.setAttribute('id', 'newlogo');
logo.innerHTML =
'<div id="newlogo">' +
'<a href="/" title="Blognone"><img style="padding-top:32px;" width="210" height="65" alt="Blognone" src="/sites/all/themes/blognone41/images/logo.png"></a>'+
'</div>';
addBefore("sidebar", "righttop_sidebar", logo);

// Add CSS
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(

'#newlogo {' +
'		height: 114px;' +
'		margin: 0 0 10px;' +
'		padding: 0;' +
' 	background: url(/sites/all/themes/blognone41/images/bg-header.png) repeat-x scroll 0 0 transparent;' +
'		text-align: center;' +
'		border: 0px solid #aaa;' +
'		-moz-border-radius:5px;' +
'		-webkit-border-radius:5px;' +
'		border-radius:5px;' +
'}' +

'#navi-menu {' +
' 	background: url(/sites/all/themes/blognone41/images/bg-header.png) repeat-x scroll 0 100% transparent;' +
'}' +

'#rightbottom_sidebar {' +
'		margin-top: 10px;' +
'}'
);

// Remove Element by ID
function removeId(id) {
    var gotId;
    gotId = document.getElementById(id);
    if (!gotId) { return; }
    gotId.parentNode.removeChild(gotId);
}

removeId("header");
removeId("block-block-40");

// Remove Sidebar Ad
var rtsb = document.getElementById("righttop_sidebar");
var div = rtsb.getElementsByTagName("div");
if (div.length > 1) {
	div[0].parentNode.removeChild(div[0]);
}