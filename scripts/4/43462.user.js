// ==UserScript==
// @name Delicious.com - Top Pagination
// @namespace http://murklins.talkoncorners.net
// @description Show Prev, Next, etc pagination links at top of list as well as bottom.
// @include http://delicious.com/*
// @include http://www.delicious.com/*
// ==/UserScript==

// grab the tagscope div, if there is one -- we're going to stick the top pagination under it
var tagscopeDiv = document.getElementById("tagscope");

if (tagscopeDiv) {
	// get the pagination div, if there is one, and copy it
	var paginationDiv = document.getElementById("pagination");
	if (paginationDiv) {
		var paginationTop = paginationDiv.cloneNode(true);
		paginationTop.id = "gm_paginationtop";
		if (tagscopeDiv.nextSibling && tagscopeDiv.parentNode) {
			tagscopeDiv.parentNode.insertBefore(paginationTop, tagscopeDiv.nextSibling);
		}
	}
}

addGlobalStyle(
	'#gm_paginationtop {text-align:center;clear:both;margin:0.5em 0 1em 0;padding:0 0 0 0;}' +
	'#gm_paginationtop a{border:1px solid #999;text-decoration:none;background:white;}' +
	'#gm_paginationtop a:hover{background:#3774D0;color:white;}' +
	'#gm_paginationtop a,#pagination span{padding:.3em .5em;}' +
	'#gm_paginationtop a.pn{border:1px solid #fff;}' +
	'#gm_paginationtop a.pn b{font-weight:normal;}' +
	'#gm_paginationtop a.pn:hover{border:1px solid #999;}' +
	'#gm_paginationtop p{display: none;}'
);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}